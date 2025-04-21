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
  weeks: number[];
  dropdowns: { [key: string]: boolean };
  setDropdowns: React.Dispatch<
    React.SetStateAction<{
      [key: string]: boolean;
    }>
  >;
  asking: boolean;
  toggleAsking: () => void;
  filter: string;
  changeFilter: (filter: string) => void;
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
  weeks: [],
  dropdowns: {},
  setDropdowns: () => {},
  asking: false,
  toggleAsking: () => {},
  filter: "",
  changeFilter: () => {},
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
