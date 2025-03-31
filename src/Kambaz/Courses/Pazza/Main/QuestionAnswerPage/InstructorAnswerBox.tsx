import { useContext } from "react";
import { makeStyles } from "tss-react/mui";
import { PazzaContext } from "../../providers/PazzaProvider";
import { getTimeAgo } from "../../utils";
import { LoginContext } from "../../providers/LoginProvider";

const useStyles = makeStyles()({
  contentBox: {
    display: "flex",
    flexDirection: "column",
    background: "white",
    borderRadius: "5px",
    width: "100%",
    border: "solid 1px #cbcacd",
    boxShadow: "0px 0px 5px lightgray",
  },
  contentTop: {
    display: "flex",
    alignItems: "center",
    padding: "4px",
  },
  iBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#fbae40",
    height: "25px",
    width: "25px",
    borderRadius: "3px",
    color: "white",
    fontSize: "20px",
    fontWeight: 900,
    marginRight: "5px",
  },
  answerName: {
    color: "#484a4d",
    fontSize: "14px",
    fontWeight: 600,
    marginLeft: "3px",
  },
  answerDesc: {
    marginLeft: "4px",
    fontStyle: "italic",
    fontSize: "11px",
    color: "#676767",
  },
  contentCenter: {
    display: "flex",
    flexDirection: "column",
    padding: "12px",
  },
  contentBottom: {
    display: "flex",
    background: "#f3f3f3",
    padding: "6px 15px",
    alignItems: "center",
    borderRadius: "0px 0px 4px 4px",
  },
  contentDivider: {
    width: "100%",
    height: "1px",
    background: "#dfe2e6",
  },
  instructorAnswer: {
    fontSize: "13px",
    color: "#484b4d",
  },
  editButton: {
    padding: "4px 9px",
    borderRadius: "3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    background: "#3b74a1",
    border: "none",
    fontSize: "12px",
    marginRight: "6px",
  },
  thanksButton: {
    fontSize: "13px",
    color: "#3b74a1",
    background: "transparent",
    border: "none",
    whiteSpace: "nowrap",
    padding: "1px 6px 1px 0px",
  },
  thanksDivider: {
    minWidth: "1px",
    height: "100%",
    background: "#b2c1d2",
  },
  thanks: {
    marginLeft: "5px",
    fontSize: "13px",
  },
  answerSpace: {
    width: "100%",
  },
  answerTime: {
    fontSize: "11px",
    color: "#676767",
    whiteSpace: "nowrap",
  },
  input: {
    border: "1px #ced5da",
    borderRadius: "5px",
    fontSize: "13px",
    padding: "5px 10px",
  },
  endorser: {
    marginTop: "30px",
    color: "#098943",
    fontSize: "13px",
    fontWeight: 900,
  },
  endorserContainer: {
    display: "flex",
    justifyContent: "center",
  },
});

export const InstructorAnswerBox = () => {
  const { classes } = useStyles();
  const { currentUser } = useContext(LoginContext);
  const { post } = useContext(PazzaContext);

  return (
    <div className={classes.contentBox}>
      <div className={classes.contentTop}>
        <div className={classes.iBox}>
          <span>i</span>
        </div>
        <span>
          <span className={classes.answerName}>the instructors' answer,</span>
          <span className={classes.answerDesc}>
            where instructors collectively construct a single answer
          </span>
        </span>
      </div>
      <div className={classes.contentDivider} />
      <div className={classes.contentCenter}>
        {post?.instructorAnswer ? (
          <>
            <span className={classes.instructorAnswer}>
              {post?.instructorAnswer?.text}
            </span>
            {post.instructorAnswer.endorser && (
              <div className={classes.endorserContainer}>
                <span
                  className={classes.endorser}
                >{`~ An instructor (${post.endorser?.name}) endorsed this answer ~`}</span>
              </div>
            )}
          </>
        ) : (
          <input
            className={classes.input}
            placeholder="Click to start off the wiki answer"
          />
        )}
      </div>
      {post?.instructorAnswer && (
        <>
          <div className={classes.contentDivider} />
          <div className={classes.contentBottom}>
            {currentUser?.type === "instructor" && (
              <button className={classes.editButton}>Edit</button>
            )}
            <button className={classes.thanksButton}>thanks!</button>
            <div className={classes.thanksDivider} />
            <span className={classes.thanks}>
              {post?.instructorAnswer?.thanks.length}
            </span>
            <div className={classes.answerSpace} />
            <span className={classes.answerTime}>{`${
              post?.instructorAnswer
                ? `Updated ${getTimeAgo(post?.instructorAnswer.date)} by ${
                    post?.instructorAnswer.author.name
                  }`
                : ""
            }`}</span>
          </div>
        </>
      )}
    </div>
  );
};
