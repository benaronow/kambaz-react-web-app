/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { PazzaContext } from "../../../PazzaProvider/PazzaContext";
import { updatePost } from "../../../postsClient";
import { ANON_IDS, getTimeAgo } from "../../../utils";
import { FollowUp, Reply, User } from "../../../../../types";
import { makeStyles } from "tss-react/mui";
import Editor, { ContentEditableEvent } from "react-simple-wysiwyg";
import { MenuItem, Select } from "@mui/material";
import { SubmitBox } from "../SubmitBox";

const useStyles = makeStyles()({
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
    whiteSpace: "nowrap",
  },
  followUpDate: {
    color: "#666666",
    fontWeight: 300,
    fontSize: "13px",
    whiteSpace: "nowrap",
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
    minWidth: "14px",
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
  replyContainer: {
    display: "flex",
    padding: "5px",
    background: "#f2f2f2",
    marginBottom: "5px",
  },
  replyHelpful: {
    display: "flex",
    alignItems: "center",
  },
  topSpace: {
    width: "100%",
  },
  dropdown: {
    height: "30px",
    transform: "translate(5px, -5px)",
    borderRadius: "0px 0px 0px 5px",
    fontSize: "12px",
    padding: "1px",
    outline: "none",
  },
  dropdownItem: {
    fontSize: "12px",
    background: "white",
  },
  contentBottom: {
    display: "flex",
    padding: "6px 0px",
    alignItems: "center",
    borderRadius: "0px 0px 4px 4px",
  },
});

interface ReplyEntryProps {
  reply: Reply;
  followUp: FollowUp;
}

export const ReplyEntry = ({ reply, followUp }: ReplyEntryProps) => {
  const { classes } = useStyles();
  const { currentUser, allUsers } = useSelector(
    (state: any) => state.accountReducer
  );
  const { post, setPost } = useContext(PazzaContext);
  const [editingOld, setEditingOld] = useState(false);
  const [oldText, setOldText] = useState("");
  const [anonId, setAnonId] = useState("");
  const changeAnonId = (set: boolean) => {
    setAnonId(set ? ANON_IDS[Math.floor(Math.random() * 10)] : "");
  };
  const changeOldText = (e: ContentEditableEvent) => setOldText(e.target.value);

  const updateReply = () => {
    if (post) {
      const newReply: Reply = {
        ...reply,
        text: oldText,
        author: anonId
          ? allUsers.find((user: User) => user._id === anonId)
          : currentUser,
        date: new Date(),
      };
      const newFollowup: FollowUp = {
        ...followUp,
        replies: [
          ...followUp.replies.filter(
            (r) => !(r.author._id === reply.author._id && r.text === reply.text)
          ),
          newReply,
        ],
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
          newFollowup,
        ],
      };

      updatePost(newPost);
      setPost(newPost);

      setEditingOld(false);
    }
  };

  const deleteReply = () => {
    if (post) {
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
            replies: [
              ...followUp.replies.filter(
                (r) =>
                  !(r.author._id === reply.author._id && r.text === reply.text)
              ),
            ],
          },
        ],
      };

      updatePost(newPost);
      setPost(newPost);
    }
  };

  const voteReply = useCallback(() => {
    if (post && reply) {
      const votes = reply.helpful.includes(currentUser._id)
        ? reply.helpful.filter((like) => like !== currentUser._id)
        : [...reply.helpful, currentUser._id];
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
            replies: [
              ...followUp.replies.filter(
                (r) =>
                  !(r.author._id === reply.author._id && r.text === reply.text)
              ),
              {
                ...reply,
                helpful: votes,
              },
            ],
          },
        ],
      };
      updatePost(newPost);
      setPost(newPost);
    }
  }, [post]);

  return (
    <div className={classes.replyContainer}>
      <div className={classes.followUpEntryLeft}>
        <img height={30} width={30} src={`${reply.author.profilePic}`} />
      </div>
      <div className={classes.followUpEntryRight}>
        <div className={classes.followUpInfo}>
          {reply.author.role !== "STUDENT" && (
            <div className={classes.instructorBadge}>i</div>
          )}
          <span className={classes.followUpAuthor}>
            {`${reply.author.firstName} ${reply.author.lastName}`}
          </span>
          <span className={classes.followUpDate}>{getTimeAgo(reply.date)}</span>
          <div className={classes.topSpace} />
          <Select
            className={classes.dropdown}
            renderValue={() => "Actions"}
            displayEmpty={true}
          >
            <MenuItem
              className={classes.dropdownItem}
              onClick={() => {
                setEditingOld(true);
                setOldText(reply.text);
              }}
            >
              Edit
            </MenuItem>
            <MenuItem className={classes.dropdownItem} onClick={deleteReply}>
              Delete
            </MenuItem>
          </Select>
        </div>
        {editingOld ? (
          <Editor value={oldText} onChange={changeOldText} />
        ) : (
          <span className={classes.followUpText}>{reply.text}</span>
        )}
        {editingOld ? (
          <div className={classes.contentBottom}>
            <SubmitBox
              anonId={anonId}
              changeAnonId={changeAnonId}
              onSubmit={updateReply}
              cancel={() => setEditingOld(false)}
            />
          </div>
        ) : (
          <div className={classes.replyHelpful}>
            <button className={classes.helpfulButton} onClick={voteReply}>
              {`${
                reply.helpful.includes(currentUser._id) ? "undo " : ""
              }helpful!`}
            </button>
            <div className={classes.helpfulDivider} />
            <span className={classes.helpful}>{reply.helpful.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};
