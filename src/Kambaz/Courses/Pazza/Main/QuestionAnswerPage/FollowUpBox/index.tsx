/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useEffect, useMemo, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { PazzaContext } from "../../../PazzaProvider/PazzaContext";
import { FollowUpEntry } from "./FollowUpEntry";
import { ANON_IDS } from "../../../utils";
import { SubmitBox } from "../SubmitBox";
import { FollowUp, User } from "../../../../../types";
import { useSelector } from "react-redux";
import { updatePost } from "../../../postsClient";
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
  noteBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    background: "#484a4d",
    height: "25px",
    width: "25px",
    borderRadius: "3px",
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
    padding: "0px 12px 12px",
  },
  contentDivider: {
    width: "100%",
    height: "1px",
    background: "#dfe2e6",
  },
  followUpName: {
    color: "#484a4d",
    fontSize: "14px",
    fontWeight: 600,
    marginLeft: "3px",
  },
  followUpDesc: {
    marginLeft: "4px",
    fontStyle: "italic",
    fontSize: "11px",
    color: "#676767",
  },
  followUpContainer: {
    display: "flex",
    flexDirection: "column",
    background: "#f6f7f6",
    padding: "5px 5px 0px",
  },
  input: {
    border: "solid 1px #ced5da",
    borderRadius: "5px",
    fontSize: "13px",
    padding: "5px 10px",
  },
  followUpPrompt: {
    fontSize: "13px",
    color: "#484b4d",
    margin: "10px 0px 8px",
  },
  contentBottom: {
    display: "flex",
    padding: "6px 0px",
    alignItems: "center",
    borderRadius: "0px 0px 4px 4px",
  },
});

export const FollowUpBox = () => {
  const { classes } = useStyles();
  const { currentUser, allUsers } = useSelector(
    (state: any) => state.accountReducer
  );
  const { post, setPost, allPosts, setAllPosts } = useContext(PazzaContext);
  const followUps = useMemo(
    () =>
      post?.followUps.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      ),
    [post]
  );
  const [editing, setEditing] = useState(false);
  const [newFollowUpText, setNewFollowUpText] = useState("");
  const changeNewFollowUpText = (e: ContentEditableEvent) =>
    setNewFollowUpText(e.target.value);
  const [anonId, setAnonId] = useState("");
  const changeAnonId = (set: boolean) => {
    setAnonId(set ? ANON_IDS[Math.floor(Math.random() * 10)] : "");
  };

  useEffect(() => {
    setEditing(false);
    setNewFollowUpText("");
    setAnonId("");
  }, [post]);

  const submitFollowUp = () => {
    if (post) {
      const newFollowUp: FollowUp = {
        text: newFollowUpText,
        author: anonId
          ? allUsers.find((user: User) => user._id === anonId)
          : currentUser,
        date: new Date(),
        replies: [],
        resolved: false,
        helpful: [],
      };
      const newPost = {
        ...post,
        followUps: [...post.followUps, newFollowUp],
      };
      updatePost(newPost);
      setPost(newPost);

      const unPopPost = allPosts.find((p) => p._id === post?._id);
      if (unPopPost) {
        const newAllPosts = [
          ...allPosts.filter((p) => p._id !== post._id),
          {
            ...unPopPost,
            followUps: [...unPopPost.followUps, newFollowUp],
          },
        ];

        setAllPosts(newAllPosts);
      }

      setEditing(false);
    }
  };

  return (
    <div className={classes.contentBox}>
      <div className={classes.contentTop}>
        <span className={classes.followUpName}>followup discussions</span>
        <span className={classes.followUpDesc}>
          for lingering questions and comments
        </span>
      </div>
      <div className={classes.contentDivider} />
      <div className={classes.contentCenter}>
        {followUps && followUps.length > 0 && (
          <div className={classes.followUpContainer}>
            {followUps.map((followUp, idx) => (
              <FollowUpEntry followUp={followUp} idx={idx} key={idx} />
            ))}
          </div>
        )}
        <span className={classes.followUpPrompt}>
          Start a new followup discussion
        </span>
        {editing ? (
          <Editor value={newFollowUpText} onChange={changeNewFollowUpText} />
        ) : (
          <input
            className={classes.input}
            placeholder="Compose a new followup discussion"
            onFocus={() => setEditing(true)}
          />
        )}

        {editing && (
          <div className={classes.contentBottom}>
            <SubmitBox
              anonId={anonId}
              changeAnonId={changeAnonId}
              onSubmit={submitFollowUp}
              cancel={() => setEditing(false)}
            />
          </div>
        )}
      </div>
    </div>
  );
};
