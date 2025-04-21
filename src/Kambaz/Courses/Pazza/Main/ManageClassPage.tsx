/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent, useContext, useState } from "react";
import { makeStyles } from "tss-react/mui";
import { PazzaContext } from "../PazzaProvider/PazzaContext";
import { createFolder, deleteFolders, updateFolder } from "../foldersClient";
import { Folder } from "../../../types";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    height: "calc(100vh - 200px)",
    width: "100%",
    background: "white",
    color: "black",
    padding: "10px 30px",
    gap: "30px",
  },
  descColumn: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "250px",
    width: "35%",
    minWidth: "200px",
  },
  description: {
    padding: "10px 15px",
    border: "solid 1px #5a8aa9",
    borderRadius: "5px",
    background: "#e7eef4",
    color: "#39678e",
  },
  contentColumn: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    overflow: "scroll",
  },
  folderRow: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: "5px",
    marginBottom: "5px",
  },
  folderRowSpace: {
    width: "100%",
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: 900,
  },
  titleDivider: {
    width: "100%",
    height: "1px",
    minHeight: "1px",
    background: "black",
    marginBottom: "5px",
  },
  sectionText: {
    fontSize: "14px",
    fontWeight: 400,
  },
  smallTitle: {
    fontSize: "15px",
    fontWeight: 600,
    marginTop: "10px",
  },
  input: {
    border: "solid 1px #ced5da",
    borderRadius: "5px",
    fontSize: "13px",
    padding: "5px 10px",
    height: "30px",
  },
  addContainer: {
    display: "flex",
    gap: "5px",
    margin: "5px 0px 5px",
  },
  addButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30px",
    padding: "0px 10px",
    background: "#3b74a1",
    color: "white",
    borderRadius: "3px",
    border: "none",
    fontSize: "14px",
  },
  folderButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "30px",
    padding: "0px 10px",
    background: "#f8f9fa",
    border: "solid 1px #dbdfe3",
    borderRadius: "3px",
    fontSize: "14px",
  },
  folder: {
    background: "#cedfed",
    color: "#33648c",
    borderRadius: "5px",
    fontSize: "13px",
    fontWeight: 400,
    padding: "2px 4px",
    whiteSpace: "nowrap",
  },
  deleteButtonContainer: {
    margin: "5px 0px 10px",
  },
  deleteDivider: {
    width: "100%",
    height: "1px",
    minHeight: "2px",
    background: "#eef0f2",
    marginBottom: "10px",
  },
});

export const ManageClassPage = () => {
  const { classes } = useStyles();
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { sortedFolders, setFolders } = useContext(PazzaContext);
  const [newFolderName, setNewFolderName] = useState("");
  const changeNewFolderName = (e: ChangeEvent<HTMLInputElement>) =>
    setNewFolderName(e.target.value);
  const [editingFolder, setEditingFolder] = useState<Folder | undefined>(
    undefined
  );
  const [editedFolderName, setEditedFolderName] = useState("");
  const changeEditedFolderName = (e: ChangeEvent<HTMLInputElement>) =>
    setEditedFolderName(e.target.value);
  const [selectedFolders, setSelectedFolders] = useState<Folder[]>([]);
  const selectFolder = (folder: Folder) => {
    if (selectedFolders.some((f) => f.name === folder.name)) {
      setSelectedFolders([
        ...selectedFolders.filter((f) => f.name !== folder.name),
      ]);
    } else {
      setSelectedFolders([...selectedFolders, folder]);
    }
  };

  const addFolder = async () => {
    if (newFolderName) {
      const newFolder = await createFolder(newFolderName);
      setFolders([...sortedFolders, newFolder]);
      setNewFolderName("");
    }
  };

  const editFolder = () => {
    if (editingFolder && editedFolderName) {
      const newFolder = { ...editingFolder, name: editedFolderName };
      updateFolder(newFolder);
      setFolders([
        ...sortedFolders.filter((f) => f.name !== editingFolder.name),
        newFolder,
      ]);
      setEditedFolderName("");
      setEditingFolder(undefined);
    }
  };

  const deleteSelectedFolders = () => {
    if (selectedFolders) {
      deleteFolders(selectedFolders);
      setFolders(
        sortedFolders.filter(
          (f) => !selectedFolders.some((sf) => sf.name === f.name)
        )
      );
      setSelectedFolders([]);
    }
  };

  if (currentUser.role === "STUDENT")
    return <Navigate to={`/Kambaz/Courses/${cid}/Pazza`} />;

  return (
    <div className={classes.container}>
      <div className={classes.descColumn}>
        <div className={classes.description}>
          Create folders to keep your class organized.
        </div>
      </div>
      <div className={classes.contentColumn}>
        <span className={classes.pageTitle}>Configure Class Folders</span>
        <div className={classes.titleDivider} />
        <span className={classes.sectionText}>
          Folders allow you to keep class content organized. When students and
          instructors add a new post, they will be required to specify at least
          one folder for their post.
        </span>
        <span className={classes.smallTitle}>Create new folders:</span>
        <span className={classes.sectionText}>
          Add folders that are relevant for your class.
        </span>
        <div className={classes.addContainer}>
          <input
            className={classes.input}
            placeholder="Add a folder(s)"
            value={newFolderName}
            onChange={changeNewFolderName}
          />
          <button className={classes.addButton} onClick={addFolder}>
            Add folder
          </button>
        </div>
        <span className={classes.smallTitle}>Manage folders:</span>
        <span className={classes.sectionText}>
          Delete folders or edit folder names.
        </span>
        <div className={classes.deleteButtonContainer}>
          <button
            className={classes.folderButton}
            onClick={deleteSelectedFolders}
            disabled={selectedFolders.length === 0}
          >
            Delete selected folders
          </button>
        </div>
        <div className={classes.deleteDivider} />
        {sortedFolders.map((folder) => (
          <div className={classes.folderRow}>
            <input
              type="checkbox"
              checked={selectedFolders.some((f) => f.name === folder.name)}
              onChange={() => selectFolder(folder)}
            />
            <div className={classes.folder}>{folder.name}</div>
            <div className={classes.folderRowSpace} />
            {editingFolder?.name === folder.name ? (
              <>
                <input
                  className={classes.input}
                  placeholder="New folder name"
                  value={editedFolderName}
                  onChange={changeEditedFolderName}
                ></input>
                <button className={classes.addButton} onClick={editFolder}>
                  Submit
                </button>
                <button
                  className={classes.folderButton}
                  onClick={() => {
                    setEditedFolderName("");
                    setEditingFolder(undefined);
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button
                className={classes.folderButton}
                onClick={() => {
                  setEditingFolder(folder);
                  setEditedFolderName(folder.name);
                }}
                disabled={editingFolder?.name === folder.name}
              >
                Edit
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
