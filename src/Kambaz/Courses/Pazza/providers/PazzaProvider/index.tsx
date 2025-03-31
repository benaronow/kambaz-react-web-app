import { ReactNode, useEffect, useMemo, useState } from "react";
import { FolderType, Post } from "../../pazzaTypes";
import { note1, allPosts } from "../../sampleData";
import { PazzaContext } from "./PazzaContext";

interface PazzaProviderProps {
  readonly children: ReactNode;
}

export const PazzaProvider = ({ children }: PazzaProviderProps) => {
  const [post, setPost] = useState<Post>();
  const changePost = (post: Post) => {
    setPost(post);
  };

  const [filter, setFilter] = useState<FolderType>("");
  const changeFilter = (filter: FolderType) => {
    setFilter(filter);
  };

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    setPost(note1);
    setPosts(allPosts);
  }, []);

  const filteredPosts = useMemo(() => {
    return filter ? posts.filter((post) => post.folder === filter) : posts;
  }, [posts, filter]);

  return (
    <PazzaContext.Provider
      value={{ post, changePost, filter, changeFilter, filteredPosts }}
    >
      {children}
    </PazzaContext.Provider>
  );
};
