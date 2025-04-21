/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { PazzaContext } from "../../PazzaProvider/PazzaContext";
import { ANON_IDS, getTimeAgo } from "../../utils";
import { useSelector } from "react-redux";
import { updatePost } from "../../postsClient";
import { Post, User } from "../../../../types";
import { SubmitBox } from "./SubmitBox";
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

export const InstructorAnswerBox = () => {
  const { classes } = useStyles();
  const { currentUser, allUsers } = useSelector(
    (state: any) => state.accountReducer
  );
  const { post, setPost, allPosts, setAllPosts } = useContext(PazzaContext);
  const [editing, setEditing] = useState(false);
  const [instructorAnswerText, setInstructorAnswerText] = useState("");
  const [anonId, setAnonId] = useState("");
  const changeAnonId = (set: boolean) => {
    setAnonId(set ? ANON_IDS[Math.floor(Math.random() * 10)] : "");
  };

  useEffect(() => {
    setEditing(false);
    setInstructorAnswerText("");
    setAnonId("");
  }, [post]);

  const voteAnswer = async () => {
    if (post?.instructorAnswer) {
      const votes = post.instructorAnswer.thanks.includes(currentUser._id)
        ? post.instructorAnswer.thanks.filter(
            (like) => like !== currentUser._id
          )
        : [...post.instructorAnswer.thanks, currentUser._id];
      updatePost({
        ...post,
        instructorAnswer: { ...post.instructorAnswer, thanks: votes },
      });
      setPost({
        ...post,
        instructorAnswer: { ...post.instructorAnswer, thanks: votes },
      });
    }
  };

  const editInstructorAnswer = (e: ContentEditableEvent) => {
    setInstructorAnswerText(e.target.value);
  };

  const endorseInstructorAnswer = () => {
    if (post?.instructorAnswer) {
      const newAnswer = {
        ...post.instructorAnswer,
        endorser: post.instructorAnswer.endorser ? undefined : currentUser,
      };

      const newPost: Post = {
        ...post,
        instructorAnswer: newAnswer,
      };
      setPost(newPost);
      updatePost(newPost);
    }
  };

  const submitInstructorAnswer = () => {
    const newAnswer = {
      text: instructorAnswerText,
      author: anonId
        ? allUsers.find((user: User) => user._id === anonId)
        : currentUser,
      date: new Date(),
      thanks: post?.instructorAnswer?.thanks || [],
    };

    if (post) {
      const newPost: Post = {
        ...post,
        instructorAnswer: newAnswer,
      };
      updatePost(newPost);
      setPost(newPost);

      const unPopPost = allPosts.find((p) => p._id === post?._id);
      if (unPopPost) {
        const newAllPosts = [
          ...allPosts.filter((p) => p._id !== post._id),
          {
            ...unPopPost,
            instructorAnswer: newAnswer,
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
        {post?.instructorAnswer && !editing ? (
          <>
            <span className={classes.instructorAnswer}>
              {post?.instructorAnswer?.text}
            </span>
            {post.instructorAnswer.endorser && (
              <div className={classes.endorserContainer}>
                <span
                  className={classes.endorser}
                >{`~ An instructor (${post.instructorAnswer.endorser?.firstName}
                  ${post.instructorAnswer.endorser?.lastName}) endorsed this answer ~`}</span>
              </div>
            )}
          </>
        ) : (
          <>
            {editing ? (
              <Editor
                value={instructorAnswerText}
                onChange={editInstructorAnswer}
              />
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
      {(post?.instructorAnswer || editing) && (
        <>
          <div className={classes.contentDivider} />
          <div className={classes.contentBottom}>
            {editing ? (
              <SubmitBox
                anonId={anonId}
                changeAnonId={changeAnonId}
                onSubmit={submitInstructorAnswer}
                cancel={() => setEditing(false)}
              />
            ) : (
              <>
                {currentUser.role !== "STUDENT" && (
                  <button
                    className={`${classes.endorseButton} ${
                      post?.instructorAnswer?.endorser && classes.unendorse
                    }`}
                    onClick={endorseInstructorAnswer}
                  >
                    {post?.instructorAnswer?.endorser ? "Unendorse" : "Endorse"}
                  </button>
                )}
                {(currentUser?.role === "FACULTY" ||
                  currentUser?.role === "TA") && (
                  <button
                    className={classes.editButton}
                    onClick={() => {
                      setEditing(true);
                      setInstructorAnswerText(
                        post?.instructorAnswer?.text || ""
                      );
                    }}
                  >
                    Edit
                  </button>
                )}
                <button className={classes.thanksButton} onClick={voteAnswer}>
                  thanks!
                </button>
                <div className={classes.thanksDivider} />
                <span className={classes.thanks}>
                  {post?.instructorAnswer?.thanks.length}
                </span>
                <div className={classes.answerSpace} />
                <span className={classes.answerTime}>{`${
                  post?.instructorAnswer
                    ? `Updated ${getTimeAgo(post?.instructorAnswer.date)} by ${
                        post.instructorAnswer.author.firstName
                      } ${post.instructorAnswer.author.lastName}`
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
