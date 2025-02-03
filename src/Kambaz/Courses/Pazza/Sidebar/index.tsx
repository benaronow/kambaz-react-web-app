import { makeStyles } from "tss-react/mui";
import { posts } from "../sampleData";
import { genDate, getDaysAgo } from "../dateUtils";
import { Post } from "../pazzaTypes";
import { MdArrowRight } from "react-icons/md";
import { ReactNode, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 175px)",
    width: "30%",
    background: "#e9e8ea",
    color: "black",
    borderRight: "solid lightgray",
    overflow: "scroll",
  },
  menu: {
    position: "sticky",
    top: "0",
    zIndex: 2,
    background: "#e9e8ea",
    display: "flex",
    height: "25px",
    minHeight: "25px",
    width: "100%",
    borderBottom: "solid lightgray",
  },
  newAndSearch: {
    position: "sticky",
    top: 25,
    zIndex: 2,
    display: "flex",
    height: "35px",
    minHeight: "35px",
    width: "100%",
    background: "#aaabab",
  },
  showActions: {
    position: "sticky",
    top: 60,
    zIndex: 2,
    display: "flex",
    height: "25px",
    minHeight: "25px",
    width: "100%",
    background: "white",
    borderBottom: "solid lightgray",
  },
  dropdown: {
    display: "flex",
    alignItems: "center",
    height: "25px",
    minHeight: "25px",
    width: "100%",
    borderBottom: "solid lightgray",
    "&:hover": {
      cursor: "pointer",
    },
  },
  dropdownArrow: {
    color: "gray",
    fontSize: "16px",
  },
  openDropdownArrow: {
    transform: "rotate(90deg)",
  },
  dropdownTitle: {
    color: "gray",
    fontSize: "11px",
    fontWeight: 600,
  },
  post: {
    display: "flex",
    width: "100%",
    background: "white",
    borderBottom: "solid lightgray",
    padding: "5px 0px 5px 0px",
  },
  postLeft: {
    display: "flex",
    flexDirection: "column",
    width: "20px",
    minWidth: "20px",
    marginRight: "3px",
  },
  postCenter: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  postTop: {
    display: "flex",
    height: "20px",
  },
  postTopRight: {
    display: "flex",
    alignItems: "center",
    width: "70%",
  },
  instructorBadge: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    fontSize: "11px",
    fontWeight: 600,
    color: "gray",
    background: "#e9e8ea",
    borderRadius: "3px",
    height: "18px",
    width: "42px",
    marginRight: "5px",
    padding: "0px 2px 0px 2px",
  },
  yellowSquare: {
    height: "8px",
    width: "8px",
    background: "#fbae40",
  },
  postTitle: {
    fontSize: "12px",
    fontWeight: 600,
    textOverflow: "ellipsis",
  },
  postTopLeft: {
    display: "flex",
    width: "30%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  postTime: {
    fontSize: "12px",
    color: "gray",
    whiteSpace: "nowrap",
    marginRight: "5px",
  },
  postBottom: {
    display: "flex",
  },
  postBottomRight: {
    display: "flex",
    width: "70%",
    color: "gray",
    fontSize: "12px",
  },
  postBottomLeft: {
    display: "flex",
    width: "30%",
    justifyContent: "flex-end",
    paddingTop: "2px",
  },
  postText: {
    marginTop: "-2px",
  },
  notePaper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "14px",
    height: "16px",
    background: "gray",
    padding: "3px 2px 3px 2px",
    borderRadius: "2px",
    marginRight: "5px",
  },
  noteLine: {
    width: "100%",
    height: "1px",
    background: "white",
  },
  answerBadge: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "14px",
    height: "16px",
    borderRadius: "2px",
    color: "white",
    marginRight: "5px",
    fontSize: "15px",
  },
  studentAnswerBadge: {
    background: "#8cc540",
    paddingBottom: "2px",
  },
  instructorAnswerBadge: {
    background: "#fbae40",
  },
});

export const Sidebar = () => {
  const { classes } = useStyles();

  const [dropdowns, setDropdowns] = useState<{ [key: string]: boolean }>({
    "0": true,
    "1": true,
    "2": true,
    "3": true,
    "4": true,
  });

  const weeks: number[] = useMemo(() => [], []);

  useEffect(() => {
    posts.reverse().forEach((post) => {
      const weeksAgo = Math.floor((getDaysAgo(post.date) - 8) / 7);
      if (
        getDaysAgo(post.date) > new Date().getDay() + 8 &&
        !weeks.includes(weeksAgo)
      ) {
        weeks.push(weeksAgo);
        setDropdowns((prev) => {
          return {
            ...prev,
            [`${5 + weeksAgo}`]: weeksAgo === 0,
          };
        });
      }
    });
  }, [weeks]);

  const flipDropdown = (dropdown: number) => {
    setDropdowns((prev) => {
      return { ...prev, [`${dropdown}`]: !prev[`${dropdown}`] };
    });
  };

  const getPostPreviews = (filteredPosts: Post[]) => {
    const posts: ReactNode[] = [];
    filteredPosts
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .map((fPost, idx) => {
        const badges = [];
        if (fPost.type === "note")
          badges.push(
            <div className={classes.notePaper}>
              <div className={classes.noteLine} />
              <div className={classes.noteLine} />
              <div className={classes.noteLine} />
              <div className={classes.noteLine} />
            </div>
          );
        if (fPost.studentAnswer)
          badges.push(
            <div
              className={`${classes.answerBadge} ${classes.studentAnswerBadge}`}
            >
              <span>s</span>
            </div>
          );
        if (fPost.instructorAnswer)
          badges.push(
            <div
              className={`${classes.answerBadge} ${classes.instructorAnswerBadge}`}
            >
              <span>i</span>
            </div>
          );

        posts.push(
          <div key={idx} className={classes.post}>
            <div className={classes.postLeft}></div>
            <div className={classes.postCenter}>
              <div className={classes.postTop}>
                <div className={classes.postTopRight}>
                  {fPost.author.type === "instructor" && (
                    <div className={classes.instructorBadge}>
                      <div className={classes.yellowSquare} />
                      <span>Instr</span>
                    </div>
                  )}
                  <span className={classes.postTitle}>{fPost.title}</span>
                </div>
                <div className={classes.postTopLeft}>
                  <span className={classes.postTime}>{`${
                    fPost.date.getHours() % 12
                  }:${
                    fPost.date.getMinutes() < 10 ? "0" : ""
                  }${fPost.date.getMinutes()}${
                    fPost.date.getHours() >= 12 ? " PM" : " AM"
                  }`}</span>
                </div>
              </div>
              <div className={classes.postBottom}>
                <div className={classes.postBottomRight}>
                  <span className={classes.postText}>{fPost.text}</span>
                </div>
                <div className={classes.postBottomLeft}>
                  {badges.map((badge, idx) => (
                    <div key={idx}>{badge}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      });
    return posts;
  };

  return (
    <div className={classes.container}>
      <div className={classes.menu}></div>
      <div className={classes.newAndSearch}></div>
      <div className={classes.showActions}></div>
      <div className={classes.dropdown} onClick={() => flipDropdown(0)}>
        <MdArrowRight
          className={`${classes.dropdownArrow} ${
            dropdowns["0"] ? classes.openDropdownArrow : ""
          }`}
        />
        <span className={classes.dropdownTitle}>PINNED</span>
      </div>
      {dropdowns["0"] && getPostPreviews(posts.filter((post) => post.pinned))}
      <div className={classes.dropdown} onClick={() => flipDropdown(1)}>
        <MdArrowRight
          className={`${classes.dropdownArrow} ${
            dropdowns["1"] ? classes.openDropdownArrow : ""
          }`}
        />
        <span className={classes.dropdownTitle}>TODAY</span>
      </div>
      {dropdowns["1"] &&
        getPostPreviews(
          posts.filter(
            (post) =>
              post.date.getDate() === new Date().getDate() &&
              post.date.getMonth() === post.date.getMonth() &&
              !post.pinned
          )
        )}
      <div className={classes.dropdown} onClick={() => flipDropdown(2)}>
        <MdArrowRight
          className={`${classes.dropdownArrow} ${
            dropdowns["2"] ? classes.openDropdownArrow : ""
          }`}
        />
        <span className={classes.dropdownTitle}>YESTERDAY</span>
      </div>
      {dropdowns["2"] &&
        getPostPreviews(
          posts.filter(
            (post) =>
              post.date.getDate() === genDate(1).getDate() &&
              post.date.getMonth() === genDate(1).getMonth() &&
              !post.pinned
          )
        )}
      <div className={classes.dropdown} onClick={() => flipDropdown(3)}>
        <MdArrowRight
          className={`${classes.dropdownArrow} ${
            dropdowns["3"] ? classes.openDropdownArrow : ""
          }`}
        />
        <span className={classes.dropdownTitle}>THIS WEEK</span>
      </div>
      {dropdowns["3"] &&
        getPostPreviews(
          posts.filter(
            (post) =>
              getDaysAgo(post.date) > 1 &&
              getDaysAgo(post.date) <= new Date().getDay() &&
              !post.pinned
          )
        )}
      <div className={classes.dropdown} onClick={() => flipDropdown(4)}>
        <MdArrowRight
          className={`${classes.dropdownArrow} ${
            dropdowns["4"] ? classes.openDropdownArrow : ""
          }`}
        />
        <span className={classes.dropdownTitle}>LAST WEEK</span>
      </div>
      {dropdowns["4"] &&
        getPostPreviews(
          posts.filter(
            (post) =>
              getDaysAgo(post.date) > new Date().getDay() + 1 &&
              getDaysAgo(post.date) <= new Date().getDay() + 7 &&
              !post.pinned
          )
        )}
      {weeks.reverse().map((week, idx) => (
        <div key={idx}>
          <div
            className={classes.dropdown}
            onClick={() => flipDropdown(5 + week)}
          >
            <MdArrowRight
              className={`${classes.dropdownArrow} ${
                dropdowns[`${5 + week}`] ? classes.openDropdownArrow : ""
              }`}
            />
            <span className={classes.dropdownTitle}>
              {`${dayjs()
                .subtract(new Date().getDay() + 14 + week * 7, "day")
                .format("M/DD")} - ${dayjs()
                .subtract(new Date().getDay() + 8 + week * 7, "day")
                .format("M/DD")}`}
            </span>
          </div>
          {dropdowns[`${5 + week}`] &&
            getPostPreviews(
              posts.filter(
                (post) =>
                  getDaysAgo(post.date) > new Date().getDay() + 8 + week * 7 &&
                  getDaysAgo(post.date) <=
                    new Date().getDay() + 14 + week * 7 &&
                  !post.pinned
              )
            )}
        </div>
      ))}
    </div>
  );
};
