import { createContext } from "react";
import { FolderType, Post } from "../../pazzaTypes";

interface PazzaContextType {
  post: Post | undefined;
  changePost: (post: Post) => void;
  filter: FolderType;
  changeFilter: (filter: FolderType) => void;
  filteredPosts: Post[];
}

const defaultPazzaContext: PazzaContextType = {
  post: undefined,
  changePost: () => {},
  filter: "",
  changeFilter: () => {},
  filteredPosts: [],
};

export const PazzaContext = createContext(defaultPazzaContext);
