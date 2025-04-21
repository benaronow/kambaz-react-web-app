import { useContext } from "react";
import { FaFolder } from "react-icons/fa6";
import { makeStyles } from "tss-react/mui";
import { PazzaContext } from "../../PazzaProvider/PazzaContext";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    height: "25px",
    width: "100%",
    background: "#e9e8ea",
    color: "gray",
    fontSize: "13px",
    fontWeight: 300,
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "solid #cbcacd",
    borderWidth: "1px",
  },
  grayFolder: {
    color: "gray",
  },
  blueFolder: {
    color: "#6991b5",
  },
  folderTitle: {
    "&:hover": {
      cursor: "pointer",
    },
  },
  firstFolder: {
    marginLeft: "10px",
  },
  vDivider: {
    width: "1px",
    height: "24px",
    background: "#adb5bd",
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
  const { sortedFolders, changeFilter } = useContext(PazzaContext);

  return (
    <div className={classes.container}>
      <div className={classes.edge}></div>
      <div className={classes.folderAndTitle}>
        <FaFolder className={classes.grayFolder} />
        <span className={`${classes.folderTitle} ${classes.firstFolder}`}>
          LIVE Q&A
        </span>
      </div>
      <div className={classes.vDivider}></div>
      <div className={classes.folderAndTitle}>
        <FaFolder className={classes.grayFolder} />
        <span className={`${classes.folderTitle} ${classes.firstFolder}`}>
          Drafts
        </span>
      </div>
      <div className={classes.vDivider}></div>
      {sortedFolders.map((f, idx) => (
        <>
          {idx === 0 ? (
            <div className={classes.folderAndTitle}>
              <FaFolder className={classes.blueFolder} />
              <span
                className={`${classes.folderTitle} ${classes.firstFolder}`}
                onClick={() => changeFilter(f.name)}
              >
                {f.name}
              </span>
            </div>
          ) : (
            <span
              key={idx}
              className={classes.folderTitle}
              onClick={() => changeFilter(f.name)}
            >
              {f.name}
            </span>
          )}
        </>
      ))}
      <div className={classes.edge}></div>
    </div>
  );
};
