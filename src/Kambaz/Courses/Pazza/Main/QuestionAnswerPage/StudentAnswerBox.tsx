/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { makeStyles } from "tss-react/mui";
import { PazzaContext } from "../../PazzaProvider/PazzaContext";
import { getTimeAgo } from "../../utils";
import { useSelector } from "react-redux";

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
  sBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#8cc540",
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
  studentAnswer: {
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
    border: "solid 1px #ced5da",
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

export const StudentAnswerBox = () => {
  const { classes } = useStyles();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { post } = useContext(PazzaContext);

  return (
    <div className={classes.contentBox}>
      <div className={classes.contentTop}>
        <div className={classes.sBox}>
          <span>i</span>
        </div>
        <span>
          <span className={classes.answerName}>the students' answer,</span>
          <span className={classes.answerDesc}>
            where students collectively construct a single answer
          </span>
        </span>
      </div>
      <div className={classes.contentDivider} />
      <div className={classes.contentCenter}>
        {post?.studentAnswer ? (
          <>
            <span className={classes.studentAnswer}>
              {post.studentAnswer.text}
            </span>
            {post.studentAnswer.endorser && (
              <div className={classes.endorserContainer}>
                <span
                  className={classes.endorser}
                >{`~ An instructor (${post.studentAnswer.endorser?.firstName}
                ${post.studentAnswer.endorser?.lastName}) endorsed this answer ~`}</span>
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
      {post?.studentAnswer && (
        <>
          <div className={classes.contentDivider} />
          <div className={classes.contentBottom}>
            {currentUser?.type === "student" && (
              <button className={classes.editButton}>Edit</button>
            )}
            <button className={classes.thanksButton}>thanks!</button>
            <div className={classes.thanksDivider} />
            <span className={classes.thanks}>
              {post?.studentAnswer?.thanks.length}
            </span>
            <div className={classes.answerSpace} />
            <span className={classes.answerTime}>{`${
              post?.studentAnswer
                ? `Updated ${getTimeAgo(post?.studentAnswer.date)} by ${
                    post.studentAnswer.author.firstName
                  } ${post.studentAnswer.author.lastName}`
                : ""
            }`}</span>
          </div>
        </>
      )}
    </div>
  );
};
