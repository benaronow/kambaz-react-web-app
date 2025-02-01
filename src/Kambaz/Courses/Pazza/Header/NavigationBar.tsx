import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    height: "70px",
    width: "100%",
    background: "blue",
    color: "white",
  },
});

export const NavigationBar = () => {
  const { classes } = useStyles();

  return <div className={classes.container}></div>;
};