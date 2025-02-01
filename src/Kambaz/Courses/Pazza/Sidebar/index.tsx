import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 170px)",
    width: "25%",
    background: "lightgray",
    color: "black",
  },
});

export const Sidebar = () => {
  const { classes } = useStyles();

  return <div className={classes.container}></div>;
};
