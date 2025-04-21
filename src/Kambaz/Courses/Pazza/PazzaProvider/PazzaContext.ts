import { createContext } from "react";
import { Folder, Post } from "../../../types";

interface PazzaContextType {
  post: Post | undefined;
  setPost: React.Dispatch<React.SetStateAction<Post | undefined>>;
  allPosts: Post[];
  setAllPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  changePost: (post: Post) => void;
  sortedFolders: Folder[];
  setFolders: React.Dispatch<React.SetStateAction<Folder[]>>;
  asking: boolean;
  toggleAsking: () => void;
  filter: string;
  changeFilter: (filter: string) => void;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  filteredPosts: Post[];
  showSidebar: boolean;
  flipShowSidebar: () => void;
  showActions: boolean;
  flipShowActions: () => void;
  mouseOverPost: {
    [key: string]: { [key: string]: boolean };
  };
  setMouseOverPostField: (
    post: string,
    type: "init" | "show" | "over" | "open",
    flip: "on" | "off"
  ) => void;
  setAllMouseOverPost: (flip: "on" | "off") => void;
}

const defaultPazzaContext: PazzaContextType = {
  post: undefined,
  setPost: () => {},
  allPosts: [],
  setAllPosts: () => {},
  changePost: () => {},
  sortedFolders: [],
  setFolders: () => {},
  asking: false,
  toggleAsking: () => {},
  filter: "",
  changeFilter: () => {},
  searchText: "",
  setSearchText: () => {},
  filteredPosts: [],
  showSidebar: true,
  flipShowSidebar: () => {},
  showActions: false,
  flipShowActions: () => {},
  mouseOverPost: {},
  setMouseOverPostField: () => {},
  setAllMouseOverPost: () => {},
};

export const PazzaContext = createContext(defaultPazzaContext);
