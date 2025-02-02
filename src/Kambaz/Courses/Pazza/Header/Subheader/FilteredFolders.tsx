import { FaFolder } from "react-icons/fa6";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    height: "25px",
    width: "100%",
    background: "#e9e8ea",
    color: "gray",
    fontSize: "14px",
    fontWeight: 300,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "solid lightgray",
  },
  grayFolder: {
    color: "gray",
  },
  blueFolder: {
    color: "#6991b5",
  },
  folderTitle: {
    marginLeft: "10px",
  },
  vDivider: {
    width: "2px",
    height: "23px",
    background: "lightgray",
  },
  edge: {
    width: "0px",
  },
  folderAndTitle: {
    display: "flex",
    alignItems: "center",
  },
});

export const FilteredFolders = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.edge}></div>
      <div className={classes.folderAndTitle}>
        <FaFolder className={classes.grayFolder} />
        <span className={classes.folderTitle}>LIVE Q&A</span>
      </div>
      <div className={classes.vDivider}></div>
      <div className={classes.folderAndTitle}>
        <FaFolder className={classes.grayFolder} />
        <span className={classes.folderTitle}>Drafts</span>
      </div>
      <div className={classes.vDivider}></div>
      <div className={classes.folderAndTitle}>
        <FaFolder className={classes.blueFolder} />
        <span className={classes.folderTitle}>hw1</span>
      </div>
      <span>hw2</span>
      <span>hw3</span>
      <span>hw4</span>
      <span>hw5</span>
      <span>hw6</span>
      <span>project</span>
      <span>exam</span>
      <span>logistics</span>
      <span>other</span>
      <span>office_hours</span>
      <div className={classes.edge}></div>
    </div>
  );
};
