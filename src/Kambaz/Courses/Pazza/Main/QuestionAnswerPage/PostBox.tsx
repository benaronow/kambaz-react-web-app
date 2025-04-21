/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { PazzaContext } from "../../PazzaProvider/PazzaContext";
import { makeStyles } from "tss-react/mui";
import { MdOutlineQuestionMark } from "react-icons/md";
import { ANON_IDS, getTimeAgo } from "../../utils";
import { useSelector } from "react-redux";
import { updatePost } from "../../postsClient";
import { SubmitBox } from "./SubmitBox";
import { EditPostBox } from "./EditPostBox";
import { Folder, Post, PostType, User } from "../../../../types";
import { ContentEditableEvent } from "react-simple-wysiwyg";

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
    minWidth: "25px",
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
    minWidth: "25px",
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
    whiteSpace: "nowrap",
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
  pinButton: {
    padding: "4px 9px",
    borderRadius: "3px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    background: "#fbae40",
    border: "none",
    fontSize: "12px",
    marginRight: "6px",
  },
  unPin: {
    color: "#212529",
    background: "#f7f9fb",
    border: "solid 1px #ced5da",
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
    marginRight: "5px",
  },
  topSpace: {
    width: "100%",
  },
  views: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "0px 5px",
    background: "#484a4d",
    height: "25px",
    borderRadius: "3px",
    color: "white",
    fontSize: "16px",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
});

export const PostBox = () => {
  const { classes } = useStyles();
  const { currentUser, allUsers } = useSelector(
    (state: any) => state.accountReducer
  );
  const { post, setPost, allPosts, setAllPosts } = useContext(PazzaContext);
  const [editing, setEditing] = useState(false);
  const [postEdits, setPostEdits] = useState(post);
  const [anonId, setAnonId] = useState("");
  const changeAnonId = (set: boolean) => {
    setAnonId(set ? ANON_IDS[Math.floor(Math.random() * 10)] : "");
  };
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => setErrors([]), [editing]);

  useEffect(() => {
    setEditing(false);
    setPostEdits(post);
    setAnonId("");
  }, [post]);

  const votePost = async () => {
    if (post) {
      const votes = post.goodNotes.includes(currentUser._id)
        ? post.goodNotes.filter((like) => like !== currentUser._id)
        : [...post.goodNotes, currentUser._id];
      updatePost({ ...post, goodNotes: votes });
      setPost({ ...post, goodNotes: votes });
    }
  };

  const editPost = useCallback(
    (e: ChangeEvent<HTMLInputElement>, type: "type" | "title") => {
      if (postEdits) {
        setPostEdits({
          ...postEdits,
          pType:
            type === "type" ? (e.target.value as PostType) : postEdits.pType,
          title: type === "title" ? e.target.value : postEdits.title,
          author: anonId
            ? allUsers.find((user: User) => user._id === anonId)
            : currentUser,
          date: new Date(),
        });
      }
    },
    [postEdits]
  );

  const editPostText = (e: ContentEditableEvent) => {
    if (postEdits) {
      setPostEdits({
        ...postEdits,
        text: e.target.value || "",
      });
    }
  };

  const editPostFolder = (folder: Folder) => {
    if (postEdits) {
      setPostEdits({
        ...postEdits,
        folders: !postEdits.folders.includes(folder)
          ? [...postEdits.folders, folder]
          : [...postEdits.folders.filter((f) => f !== folder)],
        author: anonId
          ? allUsers.find((user: User) => user._id === anonId)
          : currentUser,
        date: new Date(),
      });
    }
  };

  const editPostFor = (postFor: string[]) => {
    if (postEdits) {
      setPostEdits({ ...postEdits, for: postFor });
    }
  };

  const endorsePost = () => {
    if (post) {
      const newPost: Post = {
        ...post,
        endorser: post.endorser ? undefined : currentUser,
      };
      setPost(newPost);
      updatePost(newPost);

      const unPopPost = allPosts.find((p) => p._id === post._id);
      if (unPopPost) {
        const newAllPosts = [
          ...allPosts.filter((p) => p._id !== post._id),
          newPost,
        ];

        setAllPosts(newAllPosts);
      }
    }
  };

  const pinPost = () => {
    if (post) {
      const newPost: Post = {
        ...post,
        pinned: !post.pinned,
      };
      setPost(newPost);
      updatePost(newPost);

      const unPopPost = allPosts.find((p) => p._id === post._id);
      if (unPopPost) {
        const newAllPosts = [
          ...allPosts.filter((p) => p._id !== post._id),
          newPost,
        ];

        setAllPosts(newAllPosts);
      }
    }
  };

  const validatePost = (postEdits: Post) => {
    const errors = [];
    if (postEdits.folders.length === 0) errors.push("folders");
    if (!postEdits.title) errors.push("title");
    return errors;
  };

  const submitPost = () => {
    if (postEdits) {
      const errors = validatePost(postEdits);
      if (errors.length === 0) {
        const editedPost: Post = {
          ...postEdits,
          author: anonId
            ? allUsers.find((user: User) => user._id === anonId)
            : currentUser,
        };
        updatePost(editedPost);
        setPost(editedPost);
        setEditing(false);

        const unPopPost = allPosts.find((p) => p._id === postEdits._id);
        if (unPopPost) {
          const newAllPosts = [
            ...allPosts.filter((p) => p._id !== postEdits._id),
            postEdits,
          ];

          setAllPosts(newAllPosts);
        }
      } else {
        setErrors(errors);
      }
    }
  };

  return (
    <div className={classes.contentBox}>
      <div className={classes.contentTop}>
        {post?.pType === "QUESTION" ? (
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
            {Array.from(Array(4).keys()).map((_, idx) => (
              <div className={classes.noteLine} key={idx} />
            ))}
          </div>
        )}
        <span className={classes.postName}>{`${post?.pType.toLowerCase()} @${
          post?._id
        }`}</span>
        <div className={classes.topSpace} />
        <div className={classes.views}>
          <span>{post?.views.length} views</span>
        </div>
      </div>
      <div className={classes.contentDivider} />
      <div className={classes.contentCenter}>
        {editing ? (
          <EditPostBox
            postEdits={postEdits}
            editPost={editPost}
            editPostText={editPostText}
            editPostFolder={editPostFolder}
            editPostFor={editPostFor}
            errors={errors}
          />
        ) : (
          <>
            <span className={classes.postTitle}>{post?.title}</span>
            <span
              className={classes.postText}
              dangerouslySetInnerHTML={{ __html: post?.text || "" }}
            />
            <div className={classes.folderContainer}>
              {post?.folders?.map((folder, idx) => (
                <span className={classes.folder} key={idx}>
                  {folder.name}
                </span>
              ))}
            </div>
            {post?.endorser && post.pType === "QUESTION" && (
              <div className={classes.endorserContainer}>
                <span
                  className={classes.endorser}
                >{`~ An instructor (${post.endorser?.firstName} ${post.endorser?.lastName}) endorsed this question ~`}</span>
              </div>
            )}
          </>
        )}
      </div>
      <div className={classes.contentDivider} />
      <div className={classes.contentBottom}>
        {editing ? (
          <SubmitBox
            anonId={anonId}
            changeAnonId={changeAnonId}
            onSubmit={submitPost}
            cancel={() => setEditing(false)}
          />
        ) : (
          <>
            {currentUser.role !== "STUDENT" && (
              <button
                className={`${classes.pinButton} ${
                  post?.pinned && classes.unPin
                }`}
                onClick={pinPost}
              >
                {post?.pinned ? "Unpin" : "Pin"}
              </button>
            )}
            {currentUser.role !== "STUDENT" && post?.pType === "QUESTION" && (
              <button
                className={`${classes.endorseButton} ${
                  post?.endorser && classes.unendorse
                }`}
                onClick={endorsePost}
              >
                {post?.endorser ? "Unendorse" : "Endorse"}
              </button>
            )}
            {(post?.author._id === currentUser._id ||
              currentUser.role !== "STUDENT") && (
              <button
                className={classes.editButton}
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            )}
            <button className={classes.noteButton} onClick={votePost}>{`${
              post?.goodNotes.includes(currentUser._id) ? "undo " : ""
            }good ${post?.pType.toLowerCase()}`}</button>
            <div className={classes.noteDivider} />
            <span className={classes.goodNote}>{post?.goodNotes.length}</span>
            <div className={classes.noteSpace} />
            <span className={classes.noteTime}>{`${
              post?.date
                ? `Updated ${getTimeAgo(post.date)} by ${
                    post.author.firstName
                  } ${post.author.lastName}`
                : ""
            }`}</span>
          </>
        )}
      </div>
    </div>
  );
};
