import { makeStyles } from "tss-react/mui";
import { Header } from "./Header";
import { Main } from "./Main";
import { useState } from "react";
import { PazzaProvider } from "./PazzaProvider";

const useStyles = makeStyles()({
  container: {
    position: "relative",
    height: "calc(100vh - 100px)",
    overflow: "hidden",
    transform: "translateY(-17px)",
    minWidth: "760px",
  },
});

export const Pazza = () => {
  const { classes } = useStyles();

  const [showSidebar, setShowSidebar] = useState(true);
  const flipShowSidebar = () => setShowSidebar((prev) => !prev);
  const [showActions, setShowActions] = useState(false);
  const flipShowActions = () => setShowActions((prev) => !prev);

  const [mouseOverPost, setMouseOverPost] = useState<{
    [key: string]: { [key: string]: boolean };
  }>({});

  const setAllMouseOverPost = (flip: "on" | "off") => {
    for (const key in mouseOverPost) {
      if (flip === "off" && !mouseOverPost[key]["over"]) {
        setMouseOverPost((prev) => {
          return {
            ...prev,
            [key]: { show: showActions, over: false, open: false },
          };
        });
      }
      if (flip === "on") {
        setMouseOverPost((prev) => {
          return {
            ...prev,
            [key]: { show: true, over: false, open: false },
          };
        });
      }
    }
  };

  return (
    <div
      className={classes.container}
      onClick={() => setAllMouseOverPost("off")}
    >
      <PazzaProvider
        value={{
          showSidebar,
          flipShowSidebar,
          showActions,
          flipShowActions,
          mouseOverPost,
          setMouseOverPost,
          setAllMouseOverPost,
        }}
      >
        <Header />
        <Main />
      </PazzaProvider>
    </div>
  );
};
