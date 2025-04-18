/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles } from "tss-react/mui";
import { PostBox } from "./PostBox";
import { InstructorAnswerBox } from "./InstructorAnswerBox";
import { StudentAnswerBox } from "./StudentAnswerBox";
import { FollowUpBox } from "./FollowUpBox";
import { useContext } from "react";
import { PazzaContext } from "../../PazzaProvider/PazzaContext";
import { AskQuestionBox } from "./AskQuestionBox";
import { Sidebar } from "./Sidebar";
import { Tooltip } from "@mui/material";
import { RiArrowRightSFill } from "react-icons/ri";
import { useSelector } from "react-redux";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    width: "100%",
    height: "calc(100vh - 175px)",
  },
  questionContainer: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 175px)",
    width: "100%",
  },
  header: {
    display: "flex",
    height: "25px",
    width: "100%",
    background: "#e9e8ea",
    borderBottom: "solid 1px #cbcacd",
  },
  contentContainer: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 200px)",
    width: "100%",
    background: "#eaedf2",
    overflow: "scroll",
    padding: "8px",
    gap: "8px",
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

export const QuestionAnswerPage = () => {
  const { classes } = useStyles();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const {
    post,
    asking,
    showSidebar,
    flipShowSidebar,
    showActions,
    flipShowActions,
    mouseOverPost,
    setMouseOverPostField,
    setAllMouseOverPost,
  } = useContext(PazzaContext);

  return (
    <div className={classes.container}>
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
      {asking ? (
        <AskQuestionBox />
      ) : (
        <div className={classes.questionContainer}>
          <div className={classes.header} />
          <div className={classes.contentContainer}>
            <PostBox />
            {post?.type === "QUESTION" &&
              (post.studentAnswer || currentUser?.role === "STUDENT") && (
                <StudentAnswerBox />
              )}
            {post?.type === "QUESTION" &&
              (post.instructorAnswer ||
                currentUser?.role === "FACULTY" ||
                currentUser?.role === "TA") && <InstructorAnswerBox />}
            <FollowUpBox />
          </div>
        </div>
      )}
    </div>
  );
};
