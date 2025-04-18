import { ReactNode, useEffect, useMemo, useState } from "react";
import { FolderType, Post } from "../../../types";
import { PazzaContext } from "./PazzaContext";
import { findAllPosts } from "../postsClient";

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

  const [post, setPost] = useState<Post>();
  const changePost = (post: Post) => {
    setPost(post);
  };

  const [asking, setAsking] = useState<boolean>(false);
  const toggleAsking = () => {
    setAsking((prev) => !prev);
  };

  const [filter, setFilter] = useState<FolderType>("");
  const changeFilter = (filter: FolderType) => {
    setFilter(filter);
  };

  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const posts = await findAllPosts();
    setAllPosts(posts);
    setPost(posts[0]);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return filter
      ? allPosts.filter((post) => post.folder === filter)
      : allPosts;
  }, [allPosts, filter]);

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
        allPosts,
        changePost,
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
