/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles } from "tss-react/mui";
import { EditPostBox } from "./EditPostBox";
import { useSelector } from "react-redux";
import { ChangeEvent, useContext, useState } from "react";
import { Folder, Post, PostType, User } from "../../../../types";
import { ANON_IDS } from "../../utils";
import { SubmitBox } from "./SubmitBox";
import { createPost, findAllPosts } from "../../postsClient";
import { PazzaContext } from "../../PazzaProvider/PazzaContext";
import { ContentEditableEvent } from "react-simple-wysiwyg";
import { useParams } from "react-router";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 175px)",
    width: "100%",
    background: "#eaedf3",
    padding: "10px 20px",
  },
  submitContainer: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const AskQuestionBox = () => {
  const { classes } = useStyles();
  const { cid } = useParams();
  console.log(cid);
  const { setPost, setAllPosts, toggleAsking } = useContext(PazzaContext);
  const { currentUser, allUsers } = useSelector(
    (state: any) => state.accountReducer
  );
  const newPost: Post = {
    text: "",
    author: currentUser,
    date: new Date(),
    pType: "QUESTION",
    title: "",
    pinned: false,
    views: [currentUser._id],
    goodNotes: [],
    followUps: [],
    for: ["ALL"],
    folders: [],
    course: "",
  };
  const [postEdits, setPostEdits] = useState(newPost);
  const [anonId, setAnonId] = useState("");
  const changeAnonId = (set: boolean) => {
    setAnonId(set ? ANON_IDS[Math.floor(Math.random() * 10)] : "");
  };
  const [errors, setErrors] = useState<string[]>([]);

  const editPost = (
    e: ChangeEvent<HTMLInputElement>,
    type: "type" | "title"
  ) => {
    if (type === "title" && errors.includes("title"))
      setErrors([...errors.filter((e) => e !== "title")]);
    setPostEdits({
      ...postEdits,
      pType: type === "type" ? (e.target.value as PostType) : postEdits.pType,
      title: type === "title" ? e.target.value || "" : postEdits?.title,
      author: anonId
        ? allUsers.find((user: User) => user._id === anonId)
        : currentUser,
      date: new Date(),
    });
  };

  const editPostText = (e: ContentEditableEvent) => {
    setPostEdits({
      ...postEdits,
      text: e.target.value || "",
    });
  };

  const editPostFolder = (folder: Folder) => {
    if (errors.includes("folders"))
      setErrors([...errors.filter((e) => e !== "folders")]);
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
  };

  const editPostFor = (postFor: string[]) => {
    setPostEdits({ ...postEdits, for: postFor });
  };

  const validatePost = (postEdits: Post) => {
    const errors = [];
    if (postEdits.folders.length === 0) errors.push("folders");
    if (!postEdits.title) errors.push("title");
    return errors;
  };

  const submitPost = async () => {
    if (postEdits) {
      const errors = validatePost(postEdits);
      if (errors.length === 0) {
        const newPost = await createPost({ ...postEdits, course: cid || "" });
        toggleAsking();
        setPost(newPost);
        const newAllPosts = await findAllPosts();
        setAllPosts(newAllPosts);
      } else {
        setErrors(errors);
      }
    }
  };

  return (
    <div className={classes.container}>
      <EditPostBox
        postEdits={postEdits}
        editPost={editPost}
        editPostText={editPostText}
        editPostFolder={editPostFolder}
        editPostFor={editPostFor}
        errors={errors}
      />
      <div className={classes.submitContainer}>
        <SubmitBox
          anonId={anonId}
          changeAnonId={changeAnonId}
          onSubmit={submitPost}
          cancel={toggleAsking}
        />
      </div>
    </div>
  );
};
