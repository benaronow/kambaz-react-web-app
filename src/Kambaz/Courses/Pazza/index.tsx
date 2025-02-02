import { makeStyles } from "tss-react/mui";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { Main } from "./Main";

const useStyles = makeStyles()({
  container: {
    border: "solid",
    borderColor: "lightgray",
    borderRadius: "10px",
    height: "calc(100vh - 100px)",
    overflow: "hidden",
  },
  mainContainer: {
    display: "flex",
    height: "calc(100vh - 175px)",
  },
});

export const Pazza = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.mainContainer}>
        <Sidebar />
        <Main />
      </div>
    </div>
  );
};
