import { makeStyles } from "tss-react/mui";
import { PostBox } from "./PostBox";
import { InstructorAnswerBox } from "./InstructorAnswerBox";
import { StudentAnswerBox } from "./StudentAnswerBox";
import { FollowUpBox } from "./FollowUpBox";
import { useContext } from "react";
import { PazzaContext } from "../../providers/PazzaProvider/PazzaContext";
import { LoginContext } from "../../providers/LoginProvider/LoginContext";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 175px)",
    width: "70%",
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
});

export const QuestionAnswerPage = () => {
  const { classes } = useStyles();
  const { currentUser } = useContext(LoginContext);
  const { post } = useContext(PazzaContext);

  return (
    <div className={classes.container}>
      <div className={classes.header} />
      <div className={classes.contentContainer}>
        <PostBox />
        {post?.type === "question" &&
          (post.studentAnswer || currentUser?.type === "student") && (
            <StudentAnswerBox />
          )}
        {post?.type === "question" &&
          (post.instructorAnswer || currentUser?.type === "instructor") && (
            <InstructorAnswerBox />
          )}
        <FollowUpBox />
      </div>
    </div>
  );
};
