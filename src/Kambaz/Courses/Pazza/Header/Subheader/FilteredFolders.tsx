import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    height: "30px",
    width: "100%",
    background: "lightgray",
    color: "black",
  },
});

export const FilteredFolders = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <span>FF</span>
    </div>
  );
};
