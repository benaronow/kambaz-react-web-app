import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    height: "calc(100vh - 175px)",
    width: "100%",
    background: "white",
    color: "black",
  },
});

export const AskQuestionBox = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <span>Post</span>
    </div>
  );
};
