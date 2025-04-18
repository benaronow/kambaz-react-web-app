import { createContext } from "react";
import { FolderType, Post } from "../../../types";

interface PazzaContextType {
  post: Post | undefined;
  allPosts: Post[];
  changePost: (post: Post) => void;
  asking: boolean;
  toggleAsking: () => void;
  filter: FolderType;
  changeFilter: (filter: FolderType) => void;
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
  allPosts: [],
  changePost: () => {},
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
