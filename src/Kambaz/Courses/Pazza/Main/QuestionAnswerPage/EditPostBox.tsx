import { makeStyles } from "tss-react/mui";
import { Folder, Post } from "../../../../types";
import { ChangeEvent, useContext } from "react";
import { PazzaContext } from "../../PazzaProvider/PazzaContext";
import Editor, { ContentEditableEvent } from "react-simple-wysiwyg";
import "./editorClasses.css";

const useStyles = makeStyles()({
  entryRow: {
    display: "flex",
    width: "100%",
  },
  entryName: {
    padding: "10px",
    display: "flex",
    width: "30%",
    maxWidth: "120px",
    justifyContent: "flex-end",
    whiteSpace: "nowrap",
    color: "#676767",
    fontSize: "14px",
    fontWeight: 600,
  },
  entryValue: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    color: "#484b4d",
    fontSize: "14px",
    fontWeight: 400,
  },
  input: {
    border: "solid 1px #ced5da",
    borderRadius: "5px",
    fontSize: "13px",
    padding: "5px 10px",
    width: "100%",
  },
  folder: {
    background: "#cedfed",
    color: "#33648c",
    borderRadius: "5px",
    fontSize: "13px",
    fontWeight: 400,
    padding: "2px 4px",
    marginRight: "5px",
    marginBottom: "5px",
    whiteSpace: "nowrap",
    "&:hover": {
      cursor: "pointer",
    },
  },
  selectedFolder: {
    background: "#3b74a1",
    color: "white",
  },
  type: {
    marginLeft: "5px",
    marginRight: "10px",
  },
  errorText: {
    color: "#ea3323",
    fontSize: "10px",
    marginBottom: "10px",
    fontWeight: 600,
  },
});

interface EditPostBoxProps {
  postEdits: Post | undefined;
  editPost: (
    e: ChangeEvent<HTMLInputElement>,
    type: "type" | "for" | "title"
  ) => void;
  editPostText: (e: ContentEditableEvent) => void;
  editPostFolder: (folder: Folder) => void;
  errors: string[];
}

export const EditPostBox = ({
  postEdits,
  editPost,
  editPostText,
  editPostFolder,
  errors,
}: EditPostBoxProps) => {
  const { classes } = useStyles();
  const { sortedFolders } = useContext(PazzaContext);

  return (
    <>
      <div className={classes.entryRow}>
        <div className={classes.entryName}>Post Type*</div>
        <div className={classes.entryValue}>
          <input
            type="radio"
            name="question"
            value="QUESTION"
            radioGroup="postType"
            checked={postEdits?.pType === "QUESTION"}
            onChange={(e: ChangeEvent<HTMLInputElement>) => editPost(e, "type")}
          />
          <span className={classes.type}>Question</span>
          <input
            type="radio"
            name="note"
            value="NOTE"
            radioGroup="postType"
            checked={postEdits?.pType === "NOTE"}
            onChange={(e: ChangeEvent<HTMLInputElement>) => editPost(e, "type")}
          />
          <span className={classes.type}>Note</span>
        </div>
      </div>
      <div className={classes.entryRow}>
        <div className={classes.entryName}>Post To*</div>
        <div className={classes.entryValue}>
          <input
            type="radio"
            name="all"
            value="ALL"
            radioGroup="postFor"
            checked={postEdits?.for === "ALL"}
            onChange={(e: ChangeEvent<HTMLInputElement>) => editPost(e, "for")}
          />
          <span className={classes.type}>Entire Class</span>
          <input
            type="radio"
            name="instructors"
            value="INSTRUCTORS"
            radioGroup="postFor"
            checked={postEdits?.for === "INSTRUCTORS"}
            onChange={(e: ChangeEvent<HTMLInputElement>) => editPost(e, "for")}
          />
          <span className={classes.type}>Instructor(s)</span>
        </div>
      </div>
      <div className={classes.entryRow}>
        <div className={classes.entryName}>Select Folder(s)*</div>
        <div className={classes.entryValue}>
          {sortedFolders.map((folder) => (
            <div
              className={`${classes.folder} ${
                postEdits?.folders.some((f) => f.name === folder.name) &&
                classes.selectedFolder
              }`}
              onClick={() => editPostFolder(folder)}
            >
              {folder.name}
            </div>
          ))}
        </div>
      </div>
      {errors.includes("folders") && (
        <div className={classes.entryRow}>
          <div className={classes.entryName} />
          <span className={classes.errorText}>
            Post must include at least one folder
          </span>
        </div>
      )}
      <div className={classes.entryRow}>
        <div className={classes.entryName}>Summary*</div>
        <div className={classes.entryValue}>
          <input
            className={classes.input}
            placeholder="Enter a one line summary, 100 characters or less"
            value={postEdits?.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              editPost(e, "title")
            }
          />
        </div>
      </div>
      {errors.includes("title") && (
        <div className={classes.entryRow}>
          <div className={classes.entryName} />
          <span className={classes.errorText}>Post must include a summary</span>
        </div>
      )}
      <div className={classes.entryRow}>
        <div className={classes.entryName}>Details</div>
        <div className={classes.entryValue}>
          <Editor
            style={{ width: "100%" }}
            value={postEdits?.text}
            onChange={(e: ContentEditableEvent) => editPostText(e)}
          />
        </div>
      </div>
    </>
  );
};
