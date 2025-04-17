import { createContext } from "react";
import { Post, User } from "../../pazzaTypes";

interface LoginContextType {
  currentUser: User | undefined;
  viewPost: (post: Post) => void;
}

const defaultLoginContext: LoginContextType = {
  currentUser: undefined,
  viewPost: () => {},
};

export const LoginContext = createContext(defaultLoginContext);
