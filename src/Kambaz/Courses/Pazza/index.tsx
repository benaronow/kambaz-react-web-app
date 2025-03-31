import { makeStyles } from "tss-react/mui";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Main } from "./Main";
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { RiArrowRightSFill } from "react-icons/ri";
import { PazzaProvider } from "./providers/PazzaProvider";
import { LoginProvider } from "./providers/LoginProvider";

const useStyles = makeStyles()({
  container: {
    position: "relative",
    height: "calc(100vh - 100px)",
    overflow: "hidden",
    transform: "translateY(-17px)",
  },
  mainContainer: {
    display: "flex",
    width: "100%",
    height: "calc(100vh - 175px)",
  },
  tooltip: {
    position: "absolute",
    top: 75,
    left: 0,
  },
  expandArrowContainer: {
    display: "flex",
    alignItems: "center",
    height: "25px",
    width: "25px",
    border: "solid",
    borderWidth: "0px 2px 2px 0px",
    borderColor: "lightgray",
    background: "#e9e8ea",
  },
  expandArrow: {
    color: "gray",
    fontSize: "24px",
    minWidth: "24px",
    "&:hover": {
      color: "#3b74a1",
      cursor: "pointer",
    },
  },
});

export const Pazza = () => {
  const { classes } = useStyles();

  const [showSidebar, setShowSidebar] = useState(true);
  const [showActions, setShowActions] = useState(false);
  const [mouseOverPost, setMouseOverPost] = useState<{
    [key: string]: { [key: string]: boolean };
  }>({});

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

  useEffect(() => {
    setAllMouseOverPost(showActions ? "on" : "off");
  }, [showActions]);

  const flipShowActions = () => setShowActions((prev) => !prev);
  const flipShowSidebar = () => setShowSidebar((prev) => !prev);

  return (
    <div
      className={classes.container}
      onClick={() => setAllMouseOverPost("off")}
    >
      <LoginProvider>
        <PazzaProvider>
          <Header />
          <div className={classes.mainContainer}>
            {showSidebar ? (
              <Sidebar
                mouseOverPost={mouseOverPost}
                setMouseOverPostField={setMouseOverPostField}
                setAllMouseOverPost={setAllMouseOverPost}
                showActions={showActions}
                flipShowActions={flipShowActions}
                flipShowSidebar={flipShowSidebar}
              />
            ) : (
              <Tooltip
                title="Expand feed"
                arrow
                placement="right"
                className={classes.tooltip}
              >
                <div className={classes.expandArrowContainer}>
                  <RiArrowRightSFill
                    className={classes.expandArrow}
                    onClick={flipShowSidebar}
                  />
                </div>
              </Tooltip>
            )}
            <Main />
          </div>
        </PazzaProvider>
      </LoginProvider>
    </div>
  );
};
