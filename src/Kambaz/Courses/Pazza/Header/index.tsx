import { makeStyles } from "tss-react/mui";
import { NavigationBar } from "./NavigationBar";
import { Subheader } from "./Subheader";

const useStyles = makeStyles()({
  container: {
    zIndex: "3",
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
});

export const Header = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <NavigationBar />
      <Subheader />
    </div>
  );
};
