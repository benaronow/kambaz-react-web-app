/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router";
import { makeStyles } from "tss-react/mui";
import { useSelector } from "react-redux";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    height: "50px",
    width: "100%",
    background: "#3b74a1",
    color: "white",
    alignItems: "center",
  },
  left: {
    display: "flex",
    width: "20%",
  },
  right: {
    display: "flex",
    width: "80%",
    justifyContent: "flex-end",
  },
  logo: {
    marginTop: "4px",
    marginLeft: "10px",
  },
  link: {
    display: "flex",
    alignItems: "center",
    color: "white",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 900,
    marginRight: "25px",
    whiteSpace: "nowrap",
  },
  activeLink: {
    textDecoration: "undef",
  },
  courseLink: {
    marginRight: "55px",
  },
  accountButton: {
    background: "none",
    border: "none",
  },
  accountBox: {
    border: "solid 1px white",
    marginRight: "5px",
  },
});

export const NavigationBar = () => {
  const { classes } = useStyles();
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <Link to={`/Kambaz/Courses/${cid}/Pazza`}>
          <img
            width="90px"
            height="39"
            src="/images/pazza.png"
            className={classes.logo}
          />
        </Link>
      </div>
      <div className={classes.right}>
        <span className={`${classes.link} ${classes.courseLink}`}>CS1234</span>
        <Link to={`/Kambaz/Courses/${cid}/Pazza`} className={classes.link}>
          <span>Q & A</span>
        </Link>
        <span className={`${classes.link}`}>Resources</span>
        <span className={`${classes.link}`}>Statistics</span>
        <Link
          to={`/Kambaz/Courses/${cid}/Pazza/ManageClass`}
          className={classes.link}
        >
          <span>Manage Class</span>
        </Link>
        <button className={`${classes.link} ${classes.accountButton}`}>
          <img
            className={classes.accountBox}
            height={25}
            width={25}
            src={`${currentUser?.profilePic}`}
          />
          <span>{currentUser?.name}</span>
        </button>
      </div>
    </div>
  );
};
