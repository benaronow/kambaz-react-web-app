import { makeStyles } from "tss-react/mui";
import { posts } from "../sampleData";
import { genDate, getDaysAgo } from "../dateUtils";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 175px)",
    width: "25%",
    background: "#e9e8ea",
    color: "black",
    borderRight: "solid lightgray",
    overflow: "scroll",
  },
  menu: {
    display: "flex",
    height: "25px",
    minHeight: "25px",
    width: "100%",
    borderBottom: "solid lightgray",
  },
  newAndSearch: {
    display: "flex",
    height: "35px",
    minHeight: "35px",
    width: "100%",
    background: "gray",
  },
  showActions: {
    display: "flex",
    height: "25px",
    minHeight: "25px",
    width: "100%",
    background: "white",
    borderBottom: "solid lightgray",
  },
  dropdown: {
    display: "flex",
    height: "25px",
    minHeight: "25px",
    width: "100%",
    borderBottom: "solid lightgray",
  },
  post: {
    display: "flex",
    flexDirection: "column",
    height: "50px",
    minHeight: "50px",
    width: "100%",
    background: "white",
    borderBottom: "solid lightgray",
  },
});

export const Sidebar = () => {
  const { classes } = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.menu}></div>
      <div className={classes.newAndSearch}></div>
      <div className={classes.showActions}></div>
      <div className={classes.dropdown}></div>
      {posts
        .filter((post) => post.pinned)
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map((fPost) => (
          <div className={classes.post}>
            <span>{fPost.text}</span>
            <span>{fPost.date.getDay()}</span>
          </div>
        ))}
      <div className={classes.dropdown}></div>
      {posts
        .filter(
          (post) =>
            post.date.getDate() === new Date().getDate() &&
            post.date.getMonth() === post.date.getMonth() &&
            !post.pinned
        )
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map((fPost) => (
          <div className={classes.post}>
            <span>{fPost.text}</span>
            <span>{fPost.date.getDay()}</span>
          </div>
        ))}
      <div className={classes.dropdown}></div>
      {posts
        .filter(
          (post) =>
            post.date.getDate() === genDate(1).getDate() &&
            post.date.getMonth() === genDate(1).getMonth() &&
            !post.pinned
        )
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map((fPost) => (
          <div className={classes.post}>
            <span>{fPost.text}</span>
            <span>{fPost.date.getDay()}</span>
          </div>
        ))}
      <div className={classes.dropdown}></div>
      {posts
        .filter(
          (post) =>
            getDaysAgo(post.date) > 1 &&
            getDaysAgo(post.date) <= new Date().getDay() &&
            !post.pinned
        )
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map((fPost) => (
          <div className={classes.post}>
            <span>{fPost.text}</span>
            <span>{fPost.date.getDay()}</span>
          </div>
        ))}
      <div className={classes.dropdown}></div>
      {posts
        .filter(
          (post) =>
            getDaysAgo(post.date) > new Date().getDay() &&
            getDaysAgo(post.date) <= new Date().getDay() + 7 &&
            !post.pinned
        )
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map((fPost) => (
          <div className={classes.post}>
            <span>{fPost.text}</span>
            <span>{fPost.date.getDay()}</span>
          </div>
        ))}
      <div className={classes.dropdown}></div>
      {posts
        .filter(
          (post) =>
            getDaysAgo(post.date) > new Date().getDay() + 7 &&
            getDaysAgo(post.date) <= new Date().getDay() + 14 &&
            !post.pinned
        )
        .sort((a, b) => b.date.getTime() - a.date.getTime())
        .map((fPost) => (
          <div className={classes.post}>
            <span>{fPost.text}</span>
            <span>{fPost.date.getDay()}</span>
          </div>
        ))}
    </div>
  );
};
