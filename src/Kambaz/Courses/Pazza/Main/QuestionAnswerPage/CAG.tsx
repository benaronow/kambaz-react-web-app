/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext, useMemo } from "react";
import { makeStyles } from "tss-react/mui";
import { PazzaContext } from "../../PazzaProvider/PazzaContext";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa6";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: "15px 40px",
    background: "#eaedf3",
    width: "100%",
  },
  title: {
    color: "#808080",
    fontWeight: 900,
    fontSize: "20px",
    margin: "0px 0px 5px 12px",
  },
  glance: {
    display: "flex",
    padding: "12px",
    background: "white",
    borderRadius: "5px",
    border: "solid 1px #cbcacd",
    boxShadow: "0px 0px 5px lightgray",
  },
  bigStats: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  bigStat: {
    display: "flex",
  },
  statusBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "25px",
    height: "25px",
    background: "#b23633",
    borderRadius: "3px",
    fontSize: "20px",
    color: "white",
    fontWeight: 600,
    marginRight: "5px",
  },
  goodStatus: {
    background: "#82c443",
  },
  statusText: {
    fontSize: "14px",
    fontWeight: 600,
    whiteSpace: "nowrap",
  },
  glanceSpace: {
    width: "100%",
  },
  smallStatValues: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginRight: "10px",
    whiteSpace: "nowrap",
    fontSize: "13px",
    color: "#484b4d",
    fontWeight: 600,
  },
  smallStatNames: {
    display: "flex",
    flexDirection: "column",
    whiteSpace: "nowrap",
    fontSize: "13px",
    color: "#484b4d",
    fontWeight: 400,
  },
});

export const CAG = () => {
  const { classes } = useStyles();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { allPosts } = useContext(PazzaContext);

  const unreadPosts = useMemo(
    () =>
      allPosts.reduce(
        (acc, cur) => acc + (cur.views.includes(currentUser._id) ? 0 : 1),
        0
      ),
    [allPosts]
  );
  const unansweredQuestions = useMemo(
    () =>
      allPosts.reduce(
        (acc, cur) => acc + (cur.instructorAnswer || cur.studentAnswer ? 0 : 1),
        0
      ),
    [allPosts]
  );
  const unansweredFollowups = useMemo(
    () =>
      allPosts.reduce(
        (acc, cur) =>
          acc +
          cur.followUps.reduce(
            (acc, cur) => acc + (cur.replies.length > 0 ? 0 : 1),
            0
          ),
        0
      ),
    [allPosts]
  );

  const bigStats = [
    { name: "unread posts", value: unreadPosts },
    { name: "unanswered questions", value: unansweredQuestions },
    { name: "unanswered followups", value: unansweredFollowups },
  ];

  const instructorsResponses = useMemo(
    () =>
      allPosts.reduce((acc, cur) => acc + (cur.instructorAnswer ? 1 : 0), 0),
    [allPosts]
  );

  const studentsResponses = useMemo(
    () => allPosts.reduce((acc, cur) => acc + (cur.studentAnswer ? 1 : 0), 0),
    [allPosts]
  );

  const totalFollowupContributions = useMemo(
    () =>
      allPosts.reduce(
        (acc, cur) =>
          acc +
          cur.followUps.reduce((acc, cur) => acc + cur.replies.length + 1, 0),
        0
      ),
    [allPosts]
  );

  const smallStats = [
    {
      name: "active instructor license",
      value: "license status",
    },
    { name: "total posts", value: allPosts.length },
    {
      name: "total contributions",
      value:
        allPosts.length +
        instructorsResponses +
        studentsResponses +
        totalFollowupContributions,
    },
    { name: "instructors' responses", value: instructorsResponses },
    { name: "students' responses", value: studentsResponses },
  ];

  return (
    <div className={classes.container}>
      <span className={classes.title}>Class at a Glance</span>
      <div className={classes.glance}>
        <div className={classes.bigStats}>
          {bigStats.map((stat) => (
            <div className={classes.bigStat}>
              <div
                className={`${classes.statusBox} ${
                  stat.value === 0 && classes.goodStatus
                }`}
              >
                {stat.value === 0 ? <FaCheck /> : "!"}
              </div>
              <span className={classes.statusText}>{`${
                stat.value === 0 ? "no" : stat.value
              } ${stat.name}`}</span>
            </div>
          ))}
        </div>
        <div className={classes.glanceSpace} />
        <div className={classes.smallStatValues}>
          {smallStats.map((stat) => (
            <span>{stat.value}</span>
          ))}
        </div>
        <div className={classes.smallStatNames}>
          {smallStats.map((stat) => (
            <span>{stat.name}</span>
          ))}
        </div>
      </div>
    </div>
  );
};
