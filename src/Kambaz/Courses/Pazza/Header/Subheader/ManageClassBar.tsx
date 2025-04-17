import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    height: "25px",
    width: "100%",
    background: "#e9e8ea",
    color: "black",
    borderBottom: "solid lightgray",
  },
});

export const ManageClassBar = () => {
  const { classes } = useStyles();

    return <div className={classes.container}>
      <span>MCB</span>
  </div>;
};
