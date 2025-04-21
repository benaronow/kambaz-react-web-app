import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    height: "50px",
    width: "100%",
    background: "#e9e8ea",
    color: "black",
    gap: "10px",
  },
  pad: {
    width: "100%",
  },
  tab: {
    padding: "0px 10px",
    display: "flex",
    flexDirection: "column",
    color: "#6f7173",
    fontWeight: 600,
    justifyContent: "center",
    alignItems: "center",
    fontSize: "15px",
  },
  activeTab: {
    background: "white",
  },
  tabName: {
    whiteSpace: "nowrap",
  },
});

const TABS = [
  { line1: "General", line2: "Settings" },
  { line1: "Customize", line2: "Q&A" },
  { line1: "Manage", line2: "Folders" },
  { line1: "Manage", line2: "Enrollment" },
  { line1: "Create", line2: "Groups" },
  { line1: "Customize", line2: "Course Page" },
  { line1: "Piazza Network", line2: "Settings" },
];

export const ManageClassBar = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.pad} />
      {TABS.map((tab) => (
        <div
          className={`${classes.tab} ${
            tab.line2 === "Folders" && classes.activeTab
          }`}
        >
          <span className={classes.tabName}>{tab.line1}</span>
          <span className={classes.tabName}>{tab.line2}</span>
        </div>
      ))}
      <div className={classes.pad} />
    </div>
  );
};
