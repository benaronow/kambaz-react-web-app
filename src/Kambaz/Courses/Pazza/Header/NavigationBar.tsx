import { MdAccountBox } from "react-icons/md";
import { Link } from "react-router";
import { makeStyles } from "tss-react/mui";

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
  },
  activeLink: {
    textDecoration: "undef",
  },
  courseLink: {
    marginRight: "55px",
  },
  accountBox: {
    height: "35px",
    width: "35px",
    marginRight: "5px",
  },
});

export const NavigationBar = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <Link to="/Kambaz/Courses/1234/Pazza">
          <img
            width="90px"
            height="39"
            src="/images/pazza.png"
            className={classes.logo}
          />
        </Link>
      </div>
      <div className={classes.right}>
        <Link
          to="/Kambaz/Courses/1234/Pazza"
          className={`${classes.link} ${classes.courseLink}`}
        >
          <span>CS1234</span>
        </Link>
        <Link to="/Kambaz/Courses/1234/Pazza" className={classes.link}>
          <span>Q & A</span>
        </Link>
        <Link
          to="/Kambaz/Courses/1234/Pazza/Resources"
          className={classes.link}
        >
          <span>Resources</span>
        </Link>
        <Link
          to="/Kambaz/Courses/1234/Pazza/Statistics"
          className={classes.link}
        >
          <span>Statistics</span>
        </Link>
        <Link
          to="/Kambaz/Courses/1234/Pazza/ManageClass"
          className={classes.link}
        >
          <span>Manage Class</span>
        </Link>
        <Link to="/Kambaz/Courses/1234/Pazza/Account" className={classes.link}>
          <MdAccountBox className={classes.accountBox} />
          <span>Ben Aronow</span>
        </Link>
      </div>
    </div>
  );
};
