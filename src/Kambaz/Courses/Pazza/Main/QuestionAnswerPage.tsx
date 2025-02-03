import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    height: "calc(100vh - 175px)",
    width: "70%",
    background: "white",
    color: "black",
  },
});

export const QuestionAnswerPage = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <span>QAP</span>
    </div>
  );
};
