/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useLocation, useParams } from "react-router";
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
    fontSize: "14px",
    fontWeight: 600,
    marginRight: "25px",
    whiteSpace: "nowrap",
  },
  activeLink: {
    textDecoration: "underline",
  },
  courseLink: {
    marginRight: "55px",
  },
  accountButton: {
    background: "none",
    border: "none",
    marginRight: "10px",
  },
  accountBox: {
    border: "solid 1px white",
    marginRight: "8px",
  },
});

export const NavigationBar = () => {
  const { classes } = useStyles();
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const location = useLocation();

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
        <span className={`${classes.link} ${classes.courseLink}`}>{cid}</span>
        <Link
          to={`/Kambaz/Courses/${cid}/Pazza`}
          className={`${classes.link} ${
            location.pathname.includes("Home") && classes.activeLink
          }`}
        >
          <span>Q & A</span>
        </Link>
        <span className={`${classes.link}`}>Resources</span>
        <span className={`${classes.link}`}>Statistics</span>
        <Link
          to={`/Kambaz/Courses/${cid}/Pazza/ManageClass`}
          className={`${classes.link} ${
            location.pathname.includes("ManageClass") && classes.activeLink
          }`}
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
          <span>{`${currentUser?.firstName} ${currentUser?.lastName}`}</span>
        </button>
      </div>
    </div>
  );
};
