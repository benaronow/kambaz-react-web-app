import { useContext } from "react";
import { makeStyles } from "tss-react/mui";
import { PazzaContext } from "../../providers/PazzaProvider";
import { FollowUp, Reply } from "../../pazzaTypes";
import { getTimeAgo } from "../../utils";

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
    padding: "5px",
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
  followUpId: {
    color: "#3b74a1",
    fontSize: "12px",
    fontWeight: 600,
    marginLeft: "3px",
  },
});

export const FollowUpBox = () => {
  const { classes } = useStyles();
  const { post } = useContext(PazzaContext);

  interface ReplyEntryProps {
    reply: Reply;
  }

  const ReplyEntry = ({ reply }: ReplyEntryProps) => {
    return (
      <div className={classes.replyContainer}>
        <div className={classes.followUpEntryLeft}>
          <img height={30} width={30} src={`${reply.author.profilePic}`} />
        </div>
        <div className={classes.followUpEntryRight}>
          <div className={classes.followUpInfo}>
            {reply.author.type === "instructor" && (
              <div className={classes.instructorBadge}>i</div>
            )}
            <span className={classes.followUpAuthor}>{reply.author.name}</span>
            <span className={classes.followUpDate}>
              {getTimeAgo(reply.date)}
            </span>
          </div>
          <span className={classes.followUpText}>{reply.text}</span>
          <div className={classes.replyHelpful}>
            <button className={classes.helpfulButton}>helpful!</button>
            <div className={classes.helpfulDivider} />
            <span className={classes.helpful}>{reply.helpful.length}</span>
          </div>
        </div>
      </div>
    );
  };

  interface FollowUpEntryProps {
    followUp: FollowUp;
    idx: number;
  }

  const FollowUpEntry = ({ followUp, idx }: FollowUpEntryProps) => {
    return (
      <div className={classes.followUpEntryContainer}>
        <div className={classes.followUpEntryTop}>
          <div className={classes.resolvedButtons}>
            <input
              type="radio"
              name="resolved"
              radioGroup="followupResolved"
              checked={followUp.resolved}
            />
            <span>Resolved</span>
            <input
              type="radio"
              name="unresolved"
              radioGroup="followupResolved"
              checked={!followUp.resolved}
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
              {followUp.author.type === "instructor" && (
                <div className={classes.instructorBadge}>i</div>
              )}
              <span className={classes.followUpAuthor}>
                {followUp.author.name}
              </span>
              <span className={classes.followUpDate}>
                {getTimeAgo(followUp.date)}
              </span>
            </div>
            <span className={classes.followUpText}>{followUp.text}</span>
            <div className={classes.followUpHelpful}>
              <button className={classes.helpfulButton}>helpful!</button>
              <div className={classes.helpfulDivider} />
              <span className={classes.helpful}>{followUp.helpful.length}</span>
            </div>
            {followUp.replies.map((reply) => (
              <ReplyEntry reply={reply} />
            ))}
            <input
              className={classes.input}
              placeholder="Reply to this followup discussion"
            />
          </div>
        </div>
      </div>
    );
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
        {post?.followUps && post.followUps.length > 0 && (
          <div className={classes.followUpContainer}>
            {post?.followUps.map((followUp, idx) => (
              <FollowUpEntry followUp={followUp} idx={idx} />
            ))}
          </div>
        )}
        <span className={classes.followUpPrompt}>
          Start a new followup discussion
        </span>
        <input
          className={classes.input}
          placeholder="Compose a new followup discussion"
        />
      </div>
    </div>
  );
};
