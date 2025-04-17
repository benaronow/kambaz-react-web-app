import { useContext } from "react";
import { PazzaContext } from "../../providers/PazzaProvider/PazzaContext";
import { makeStyles } from "tss-react/mui";
import { MdOutlineQuestionMark } from "react-icons/md";
import { getTimeAgo } from "../../utils";
import { LoginContext } from "../../providers/LoginProvider/LoginContext";

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
  questionBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#484a4d",
    height: "25px",
    width: "25px",
    borderRadius: "3px",
    marginRight: "5px",
  },
  unansweredQuestionBox: {
    background: "#b42225",
  },
  questionMark: {
    color: "white",
    fontSize: "22px",
  },
  noteBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    background: "#484a4d",
    height: "25px",
    width: "25px",
    borderRadius: "3px",
    marginRight: "5px",
  },
  noteLine: {
    width: "75%",
    height: "2px",
    background: "white",
  },
  postName: {
    color: "#484a4d",
    fontSize: "14px",
    fontWeight: 600,
    marginLeft: "3px",
  },
  contentCenter: {
    display: "flex",
    flexDirection: "column",
    padding: "12px",
  },
  postTitle: {
    fontSize: "24px",
    fontWeight: 600,
    marginBottom: "5px",
    color: "#484b4d",
  },
  postText: {
    fontSize: "13px",
    color: "#484b4d",
  },
  contentBottom: {
    display: "flex",
    background: "#f3f3f3",
    padding: "6px 15px",
    alignItems: "center",
    borderRadius: "0px 0px 4px 4px",
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
  noteButton: {
    fontSize: "13px",
    color: "#3b74a1",
    background: "transparent",
    border: "none",
    whiteSpace: "nowrap",
    padding: "1px 6px 1px 0px",
  },
  noteDivider: {
    minWidth: "1px",
    height: "100%",
    background: "#b2c1d2",
  },
  goodNote: {
    marginLeft: "5px",
    fontSize: "13px",
  },
  noteSpace: {
    width: "100%",
  },
  noteTime: {
    fontSize: "11px",
    color: "#676767",
    whiteSpace: "nowrap",
  },
  contentDivider: {
    width: "100%",
    height: "1px",
    background: "#dfe2e6",
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
  folderContainer: {
    marginTop: "10px",
  },
  folder: {
    padding: "4px 9px",
    borderRadius: "3px",
    color: "#33648c",
    background: "#cedfed",
    fontSize: "12px",
  },
});

export const PostBox = () => {
  const { classes } = useStyles();
  const { currentUser } = useContext(LoginContext);
  const { post } = useContext(PazzaContext);

  return (
    <div className={classes.contentBox}>
      <div className={classes.contentTop}>
        {post?.type === "question" ? (
          <div
            className={`${classes.questionBox} ${
              !post?.instructorAnswer &&
              !post?.studentAnswer &&
              classes.unansweredQuestionBox
            }`}
          >
            <MdOutlineQuestionMark className={classes.questionMark} />
          </div>
        ) : (
          <div className={classes.noteBox}>
            {Array.from(Array(4).keys()).map(() => (
              <div className={classes.noteLine} />
            ))}
          </div>
        )}
        <span
          className={classes.postName}
        >{`${post?.type} @${post?._id}`}</span>
      </div>
      <div className={classes.contentDivider} />
      <div className={classes.contentCenter}>
        <span className={classes.postTitle}>{post?.title}</span>
        <span className={classes.postText}>{post?.text}</span>
        <div className={classes.folderContainer}>
          <span className={classes.folder}>{post?.folder}</span>
        </div>
        {post?.endorser && (
          <div className={classes.endorserContainer}>
            <span
              className={classes.endorser}
            >{`~ An instructor (${post?.endorser?.name}) endorsed this answer ~`}</span>
          </div>
        )}
      </div>
      <div className={classes.contentDivider} />
      <div className={classes.contentBottom}>
        {currentUser?.type === post?.author.type && (
          <button className={classes.editButton}>Edit</button>
        )}
        <button className={classes.noteButton}>good note</button>
        <div className={classes.noteDivider} />
        <span className={classes.goodNote}>{post?.goodNotes.length}</span>
        <div className={classes.noteSpace} />
        <span className={classes.noteTime}>{`${
          post?.date
            ? `Updated ${getTimeAgo(post.date)} by ${post?.author.name}`
            : ""
        }`}</span>
      </div>
    </div>
  );
};
