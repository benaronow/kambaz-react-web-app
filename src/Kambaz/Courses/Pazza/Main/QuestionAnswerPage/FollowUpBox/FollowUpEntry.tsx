/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { FollowUp, Reply, User } from "../../../../../types";
import { useCallback, useContext, useEffect, useState } from "react";
import { PazzaContext } from "../../../PazzaProvider/PazzaContext";
import { updatePost } from "../../../postsClient";
import { ANON_IDS, getTimeAgo } from "../../../utils";
import { makeStyles } from "tss-react/mui";
import { ReplyEntry } from "./ReplyEntry";
import { SubmitBox } from "../SubmitBox";
import Editor, { ContentEditableEvent } from "react-simple-wysiwyg";

const useStyles = makeStyles()({
  input: {
    border: "solid 1px #ced5da",
    borderRadius: "5px",
    fontSize: "13px",
    padding: "5px 10px",
    marginBottom: "5px",
  },
  followUpPrompt: {
    fontSize: "13px",
    color: "#484b4d",
    margin: "10px 0px 8px",
  },
  followUpEntryContainer: {
    display: "flex",
    flexDirection: "column",
  },
  followUpEntryTop: {
    display: "flex",
    alignItems: "center",
    marginBottom: "4px",
  },
  resolvedButtons: {
    display: "flex",
    background: "#555555",
    borderRadius: "2px",
    color: "white",
    fontSize: "13px",
    fontWeight: 600,
    padding: "4px 5px",
    gap: "5px",
  },
  unresolved: {
    background: "#b23633",
  },
  followUpEntryLower: {
    display: "flex",
  },
  followUpEntryLeft: {
    marginRight: "8px",
  },
  followUpEntryRight: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  followUpInfo: {
    display: "flex",
    alignItems: "center",
  },
  followUpAuthor: {
    color: "#555555",
    fontWeight: 600,
    fontSize: "13px",
    marginRight: "4px",
  },
  followUpDate: {
    color: "#666666",
    fontWeight: 300,
    fontSize: "13px",
  },
  followUpText: {
    fontSize: "13px",
    color: "#484b4d",
  },
  instructorBadge: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "14px",
    height: "16px",
    borderRadius: "2px",
    color: "white",
    marginRight: "4px",
    fontSize: "15px",
    background: "#fbae40",
  },
  followUpHelpful: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
  },
  helpfulButton: {
    fontSize: "13px",
    color: "#3b74a1",
    background: "transparent",
    border: "none",
    whiteSpace: "nowrap",
    padding: "1px 6px 1px 0px",
  },
  helpfulDivider: {
    minWidth: "1px",
    height: "100%",
    background: "#b2c1d2",
  },
  helpful: {
    marginLeft: "5px",
    fontSize: "13px",
  },
  followUpId: {
    color: "#3b74a1",
    fontSize: "12px",
    fontWeight: 600,
    marginLeft: "3px",
  },
  contentBottom: {
    display: "flex",
    padding: "6px 0px",
    alignItems: "center",
    borderRadius: "0px 0px 4px 4px",
  },
});

interface FollowUpEntryProps {
  followUp: FollowUp;
  idx: number;
}

export const FollowUpEntry = ({ followUp, idx }: FollowUpEntryProps) => {
  const { classes } = useStyles();
  const { currentUser, allUsers } = useSelector(
    (state: any) => state.accountReducer
  );
  const { post, setPost, allPosts, setAllPosts } = useContext(PazzaContext);
  const [editing, setEditing] = useState(false);
  const [newReplyText, setNewReplyText] = useState("");
  const changeNewReplyText = (e: ContentEditableEvent) =>
    setNewReplyText(e.target.value);
  const [anonId, setAnonId] = useState("");
  const changeAnonId = (set: boolean) => {
    setAnonId(set ? ANON_IDS[Math.floor(Math.random() * 10)] : "");
  };

  useEffect(() => {
    setEditing(false);
    setNewReplyText("");
    setAnonId("");
  }, [post]);

  const submitReply = () => {
    if (post) {
      const newReply: Reply = {
        text: newReplyText,
        author: anonId
          ? allUsers.find((user: User) => user._id === anonId)
          : currentUser,
        date: new Date(),
        helpful: [],
      };
      const newFollowUp: FollowUp = {
        ...followUp,
        replies: [...followUp.replies, newReply],
      };
      const newPost = {
        ...post,
        followUps: [
          ...post.followUps.filter(
            (f) =>
              !(
                f.author._id === followUp.author._id && f.text === followUp.text
              )
          ),
          newFollowUp,
        ],
      };
      updatePost(newPost);
      setPost(newPost);

      setEditing(false);
    }
  };

  const resolveFollowUp = useCallback(
    (set: boolean) => {
      if (post && followUp) {
        const newFollowUp: FollowUp = {
          ...followUp,
          resolved: set,
        };
        const newPost = {
          ...post,
          followUps: [
            ...post.followUps.filter(
              (f) => !(f.author === followUp.author && f.text === followUp.text)
            ),
            newFollowUp,
          ],
        };
        updatePost(newPost);
        setPost(newPost);

        const unPopPost = allPosts.find((p) => p._id === post?._id);
        if (unPopPost) {
          const newAllPosts = [
            ...allPosts.filter((p) => p._id !== post._id),
            {
              ...unPopPost,
              followUps: [
                ...unPopPost.followUps.filter(
                  (f) =>
                    !(
                      f.author._id === followUp.author._id &&
                      f.text === followUp.text
                    )
                ),
                newFollowUp,
              ],
            },
          ];

          setAllPosts(newAllPosts);
        }
      }
    },
    [post]
  );

  const voteFollowUp = () => {
    if (post && followUp) {
      const votes = followUp.helpful.includes(currentUser._id)
        ? followUp.helpful.filter((like) => like !== currentUser._id)
        : [...followUp.helpful, currentUser._id];
      const newPost = {
        ...post,
        followUps: [
          ...post.followUps.filter(
            (f) =>
              !(
                f.author._id === followUp.author._id && f.text === followUp.text
              )
          ),
          {
            ...followUp,
            helpful: votes,
          },
        ].sort((a, b) => (a.date > b.date ? 1 : -1)),
      };
      updatePost(newPost);
      setPost(newPost);
    }
  };

  return (
    <div className={classes.followUpEntryContainer}>
      <div className={classes.followUpEntryTop}>
        <div
          className={`${classes.resolvedButtons} ${
            !followUp.resolved && classes.unresolved
          }`}
        >
          <input
            type="radio"
            name={`${post?._id}_f${idx + 1}resolved`}
            radioGroup={`${post?._id}_f${idx + 1}`}
            checked={followUp.resolved}
            onChange={() => resolveFollowUp(true)}
          />
          <span>Resolved</span>
          <input
            type="radio"
            name={`${post?._id}_f${idx + 1}unresolved`}
            radioGroup={`${post?._id}_f${idx + 1}`}
            checked={!followUp.resolved}
            onChange={() => resolveFollowUp(false)}
          />
          <span>Unresolved</span>
        </div>
        <span className={classes.followUpId}>{`@${post?._id}_f${
          idx + 1
        }`}</span>
      </div>
      <div className={classes.followUpEntryLower}>
        <div className={classes.followUpEntryLeft}>
          <img height={30} width={30} src={`${followUp.author.profilePic}`} />
        </div>
        <div className={classes.followUpEntryRight}>
          <div className={classes.followUpInfo}>
            {(followUp.author.role === "FACULTY" ||
              followUp.author.role === "TA") && (
              <div className={classes.instructorBadge}>i</div>
            )}
            <span className={classes.followUpAuthor}>
              {`${followUp.author.firstName} ${followUp.author.lastName}`}
            </span>
            <span className={classes.followUpDate}>
              {getTimeAgo(followUp.date)}
            </span>
          </div>
          <span className={classes.followUpText}>{followUp.text}</span>
          <div className={classes.followUpHelpful}>
            <button className={classes.helpfulButton} onClick={voteFollowUp}>
              helpful!
            </button>
            <div className={classes.helpfulDivider} />
            <span className={classes.helpful}>{followUp.helpful.length}</span>
          </div>
          {followUp.replies?.map((reply, ridx) => (
            <ReplyEntry reply={reply} followUp={followUp} key={ridx} />
          ))}
          {editing ? (
            <Editor value={newReplyText} onChange={changeNewReplyText} />
          ) : (
            <input
              className={classes.input}
              placeholder="Reply to this followup discussion"
              onFocus={() => setEditing(true)}
            />
          )}

          {editing && (
            <div className={classes.contentBottom}>
              <SubmitBox
                anonId={anonId}
                changeAnonId={changeAnonId}
                onSubmit={submitReply}
                cancel={() => setEditing(false)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
