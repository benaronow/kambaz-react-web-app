/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useMemo, useState } from "react";
import { Folder, Post } from "../../../types";
import { PazzaContext } from "./PazzaContext";
import { findAllPosts, findPostById } from "../postsClient";
import { useSelector } from "react-redux";
import { findAllFolders } from "../foldersClient";
import { getDaysAgo } from "../utils";

interface PazzaProviderProps {
  value: {
    showSidebar: boolean;
    flipShowSidebar: () => void;
    showActions: boolean;
    flipShowActions: () => void;
    mouseOverPost: {
      [key: string]: { [key: string]: boolean };
    };
    setMouseOverPost: React.Dispatch<
      React.SetStateAction<{
        [key: string]: {
          [key: string]: boolean;
        };
      }>
    >;
    setAllMouseOverPost: (flip: "on" | "off") => void;
  };
  readonly children: ReactNode;
}

export const PazzaProvider = ({ value, children }: PazzaProviderProps) => {
  const {
    showSidebar,
    flipShowSidebar,
    showActions,
    flipShowActions,
    mouseOverPost,
    setMouseOverPost,
    setAllMouseOverPost,
  } = value;

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const [post, setPost] = useState<Post>();
  const changePost = async (post: Post) => {
    const curPost = await findPostById(post._id || "");
    setPost(curPost);
  };

  const [asking, setAsking] = useState<boolean>(false);
  const toggleAsking = () => {
    setAsking((prev) => !prev);
  };

  const [filter, setFilter] = useState("");
  const changeFilter = (filter: string) => {
    setFilter(filter);
  };

  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const posts = await findAllPosts();
    setAllPosts(posts);
  };

  const [folders, setFolders] = useState<Folder[]>([]);
  const sortedFolders = useMemo(
    () => folders.sort((a, b) => a.number - b.number),
    [folders]
  );

  useEffect(() => {
    if (post) changePost(post);
  }, [folders]);

  const fetchFolders = async () => {
    const folders = await findAllFolders();
    setFolders(folders);
  };

  useEffect(() => {
    fetchPosts();
    fetchFolders();
  }, []);

  const filteredPosts = useMemo(() => {
    return (
      filter
        ? allPosts.filter((post) => post.folders.some((f) => f.name === filter))
        : allPosts
    ).filter(
      (post) =>
        post.for === "ALL" ||
        (post.for === "INSTRUCTORS" && currentUser.role !== "STUDENT")
    );
  }, [allPosts, filter]);

  const [weeks, setWeeks] = useState<number[]>([]);

  const [dropdowns, setDropdowns] = useState<{ [key: string]: boolean }>({
    "0": true,
    "1": true,
    "2": true,
    "3": true,
    "4": true,
  });
  useEffect(() => {
    const acc: number[] = [];
    filteredPosts.forEach((post) => {
      setMouseOverPostField(post.title, "init", "on");
      const weeksAgo = Math.floor(
        (getDaysAgo(post.date) - (new Date().getDay() + 8)) / 7
      );
      if (weeksAgo >= 0 && !acc.includes(weeksAgo) && !post.pinned) {
        acc.push(weeksAgo);
        setDropdowns((prev) => {
          return {
            ...prev,
            [`${5 + weeksAgo}`]: weeksAgo === 0,
          };
        });
      }
    });
    setWeeks(acc.sort((a, b) => a - b));
  }, [filteredPosts]);

  const setMouseOverPostField = (
    post: string,
    type: "init" | "show" | "over" | "open",
    flip: "on" | "off"
  ) => {
    setMouseOverPost((prev) => {
      return {
        ...prev,
        [`${post}`]:
          type === "init"
            ? { show: false, over: false, open: false }
            : {
                ...prev[`${post}`],
                [`${type}`]:
                  type === "show"
                    ? flip === "on" || showActions
                    : flip === "on",
              },
      };
    });
  };

  useEffect(() => {
    setAllMouseOverPost(showActions ? "on" : "off");
  }, [showActions]);

  return (
    <PazzaContext.Provider
      value={{
        post,
        setPost,
        allPosts,
        setAllPosts,
        changePost,
        sortedFolders,
        setFolders,
        weeks,
        dropdowns,
        setDropdowns,
        asking,
        toggleAsking,
        filter,
        changeFilter,
        filteredPosts,
        showSidebar,
        flipShowSidebar,
        showActions,
        flipShowActions,
        mouseOverPost,
        setMouseOverPostField,
        setAllMouseOverPost,
      }}
    >
      {children}
    </PazzaContext.Provider>
  );
};
