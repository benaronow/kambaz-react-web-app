import { createContext, ReactNode, useState } from "react";
import { FolderType, Post } from "../pazzaTypes";
import { note1 } from "../sampleData";

interface PazzaContextType {
  post: Post | undefined;
  changePost: (post: Post) => void;
  filter: FolderType;
  changeFilter: (filter: FolderType) => void;
}

const defaultPazzaContext: PazzaContextType = {
  post: undefined,
  changePost: () => {},
  filter: "",
  changeFilter: () => {},
};

export const PazzaContext = createContext(defaultPazzaContext);

interface PazzaProviderProps {
  readonly children: ReactNode;
}

export const PazzaProvider = ({ children }: PazzaProviderProps) => {
  const [post, setPost] = useState<Post>(note1);
  const changePost = (post: Post) => {
    setPost(post);
  };

  const [filter, setFilter] = useState<FolderType>("");
  const changeFilter = (filter: FolderType) => {
    setFilter(filter);
  };

  return (
    <PazzaContext.Provider value={{ post, changePost, filter, changeFilter }}>
      {children}
    </PazzaContext.Provider>
  );
};
