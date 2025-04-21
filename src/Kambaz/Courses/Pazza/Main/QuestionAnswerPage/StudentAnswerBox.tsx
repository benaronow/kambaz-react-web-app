/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { PazzaContext } from "../../PazzaProvider/PazzaContext";
import { ANON_IDS, getTimeAgo } from "../../utils";
import { useSelector } from "react-redux";
import { updatePost } from "../../postsClient";
import { SubmitBox } from "./SubmitBox";
import { Post, User } from "../../../../types";
import Editor, { ContentEditableEvent } from "react-simple-wysiwyg";

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
  endorseButton: {
    padding: "4px 9px",
    borderRadius: "3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    background: "#098943",
    border: "none",
    fontSize: "12px",
    marginRight: "6px",
  },
  unendorse: {
    background: "#b42225",
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
  const { currentUser, allUsers } = useSelector(
    (state: any) => state.accountReducer
  );
  const { post, setPost, allPosts, setAllPosts } = useContext(PazzaContext);
  const [editing, setEditing] = useState(false);
  const [studentAnswerText, setStudentAnswerText] = useState("");
  const [anonId, setAnonId] = useState("");
  const changeAnonId = (set: boolean) => {
    setAnonId(set ? ANON_IDS[Math.floor(Math.random() * 10)] : "");
  };

  useEffect(() => {
    setEditing(false);
    setStudentAnswerText("");
    setAnonId("");
  }, [post]);

  const voteAnswer = async () => {
    if (post?.studentAnswer) {
      const votes = post.studentAnswer.thanks.includes(currentUser._id)
        ? post.studentAnswer.thanks.filter((like) => like !== currentUser._id)
        : [...post.studentAnswer.thanks, currentUser._id];
      updatePost({
        ...post,
        studentAnswer: { ...post.studentAnswer, thanks: votes },
      });
      setPost({
        ...post,
        studentAnswer: { ...post.studentAnswer, thanks: votes },
      });
    }
  };

  const editStudentAnswer = (e: ContentEditableEvent) => {
    setStudentAnswerText(e.target.value);
  };

  const endorseStudentAnswer = () => {
    if (post?.studentAnswer) {
      const newAnswer = {
        ...post.studentAnswer,
        endorser: post.studentAnswer.endorser ? undefined : currentUser,
      };

      const newPost: Post = {
        ...post,
        studentAnswer: newAnswer,
      };
      setPost(newPost);
      updatePost(newPost);

      const unPopPost = allPosts.find((p) => p._id === post._id);
      if (unPopPost) {
        const newAllPosts = [
          ...allPosts.filter((p) => p._id !== post._id),
          {
            ...unPopPost,
            studentAnswer: newAnswer,
          },
        ];

        setAllPosts(newAllPosts);
      }
    }
  };

  const submitStudentAnswer = () => {
    const newAnswer = {
      text: studentAnswerText,
      author: anonId
        ? allUsers.find((user: User) => user._id === anonId)
        : currentUser,
      date: new Date(),
      thanks: post?.studentAnswer?.thanks || [],
    };

    if (post) {
      const newPost: Post = {
        ...post,
        studentAnswer: newAnswer,
      };
      updatePost(newPost);
      setPost(newPost);

      const unPopPost = allPosts.find((p) => p._id === post?._id);
      if (unPopPost) {
        const newAllPosts = [
          ...allPosts.filter((p) => p._id !== post._id),
          {
            ...unPopPost,
            studentAnswer: newAnswer,
          },
        ];

        setAllPosts(newAllPosts);
      }
    }

    setEditing(false);
  };

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
        {post?.studentAnswer && !editing ? (
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
          <>
            {editing ? (
              <Editor value={studentAnswerText} onChange={editStudentAnswer} />
            ) : (
              <input
                className={classes.input}
                placeholder="Click to start off the wiki answer"
                onFocus={() => setEditing(true)}
              />
            )}
          </>
        )}
      </div>
      {(post?.studentAnswer || editing) && (
        <>
          <div className={classes.contentDivider} />
          <div className={classes.contentBottom}>
            {editing ? (
              <SubmitBox
                anonId={anonId}
                changeAnonId={changeAnonId}
                onSubmit={submitStudentAnswer}
                cancel={() => setEditing(false)}
              />
            ) : (
              <>
                {currentUser.role !== "STUDENT" && (
                  <button
                    className={`${classes.endorseButton} ${
                      post?.studentAnswer?.endorser && classes.unendorse
                    }`}
                    onClick={endorseStudentAnswer}
                  >
                    {post?.studentAnswer?.endorser ? "Unendorse" : "Endorse"}
                  </button>
                )}
                {currentUser?.role === "STUDENT" && (
                  <button
                    className={classes.editButton}
                    onClick={() => {
                      setEditing(true);
                      setStudentAnswerText(post?.studentAnswer?.text || "");
                    }}
                  >
                    Edit
                  </button>
                )}
                <button className={classes.thanksButton} onClick={voteAnswer}>
                  {`${
                    post?.studentAnswer?.thanks.includes(currentUser._id)
                      ? "undo "
                      : ""
                  }thanks!`}
                </button>
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
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};
