import { createContext, ReactNode, useState } from "react";
import { Post, User } from "../pazzaTypes";
import { student1 } from "../sampleData";

interface LoginContextType {
  currentUser: User | undefined;
  viewPost: (post: Post) => void;
}

const defaultLoginContext: LoginContextType = {
  currentUser: undefined,
  viewPost: () => {},
};

export const LoginContext = createContext(defaultLoginContext);

interface LoginProviderProps {
  readonly children: ReactNode;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User>(student1);

  const viewPost = (post: Post) => {
    if (!currentUser.viewedPosts.find((vPost) => vPost._id === post._id)) {
      setCurrentUser((prev) => ({
        ...prev,
        viewedPosts: [ ...prev.viewedPosts, post ],
      }));
    }
  };

  return (
    <LoginContext.Provider value={{ currentUser, viewPost }}>
      {children}
    </LoginContext.Provider>
  );
};
