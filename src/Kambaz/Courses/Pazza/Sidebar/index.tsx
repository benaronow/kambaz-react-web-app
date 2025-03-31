import { makeStyles } from "tss-react/mui";
import { getDaysAgo } from "../dateUtils";
import { Post } from "../pazzaTypes";
import { MdArrowRight, MdNoteAdd } from "react-icons/md";
import { ChangeEvent, ReactNode, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { ImCheckmark } from "react-icons/im";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { BiX } from "react-icons/bi";
import { RiArrowLeftSFill } from "react-icons/ri";
import { IoIosSettings, IoMdArrowDropdown } from "react-icons/io";
import { Tooltip } from "@mui/material";
import { PazzaContext } from "../providers/PazzaProvider/PazzaContext";
import { LoginContext } from "../providers/LoginProvider/LoginContext";

const useStyles = makeStyles()({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "calc(100vh - 175px)",
    width: "30%",
    background: "#e9e8ea",
    color: "black",
    borderRight: "solid #cbcacd",
    borderWidth: "1px",
    overflow: "scroll",
  },
  menu: {
    position: "sticky",
    top: "0",
    zIndex: 2,
    background: "#e9e8ea",
    display: "flex",
    alignItems: "center",
    height: "25px",
    minHeight: "25px",
    width: "100%",
    borderBottom: "solid #cbcacd",
    borderWidth: "1px",
  },
  collapseArrow: {
    color: "gray",
    fontSize: "24px",
    minWidth: "24px",
    "&:hover": {
      color: "#3b74a1",
      cursor: "pointer",
    },
  },
  menuText: {
    color: "gray",
    fontSize: "11px",
    marginLeft: "5px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  menuEnd: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
    whiteSpace: "nowrap",
  },
  menuSettingsGear: {
    color: "gray",
    marginLeft: "5px",
  },
  menuSettingsArrow: {
    color: "gray",
  },
  overMenuSettings: {
    color: "#3b74a1",
    "&:hover": {
      cursor: "pointer",
    },
  },
  newAndSearch: {
    position: "sticky",
    top: 25,
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "35px",
    minHeight: "35px",
    width: "100%",
    background: "#aaabab",
  },
  newPostButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "28px",
    width: "90px",
    minWidth: "90px",
    background: "#3b74a1",
    color: "white",
    borderRadius: "3px",
    border: "none",
    margin: "0px 5px 0px 5px",
    fontSize: "14px",
  },
  newPostButtonText: {
    marginTop: "2px",
    marginLeft: "2px",
  },
  searchBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "28px",
    width: "100%",
    background: "white",
    marginRight: "5px",
    borderRadius: "3px",
    border: "none",
  },
  magnifyingGlass: {
    color: "#adb5bd",
    minWidth: "20px",
    fontSize: "15px",
    margin: "0px 2px 0px 5px",
  },
  searchInput: {
    width: "100%",
    height: "28px",
    border: "none",
    outline: "none",
    fontSize: "13px",
  },
  emptyInput: {
    marginRight: "3px",
  },
  x: {
    fontSize: "20px",
    marginRight: "4px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  filters: {
    position: "sticky",
    top: 60,
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    height: "40px",
    minHeight: "40px",
    width: "100%",
    background: "#333333",
    color: "white",
    fontSize: "13px",
    paddingLeft: "5px",
  },
  filter: {
    display: "flex",
    alignItems: "center",
    padding: "0px 5px 0px 5px",
    height: "28px",
    border: "solid",
    borderColor: "white",
    borderRadius: "3px",
    marginLeft: "5px",
    "&:hover": {
      cursor: "pointer",
    },
  },
  filterName: {
    marginRight: "4px",
  },
  showActions: {
    position: "sticky",
    top: 60,
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    height: "25px",
    minHeight: "25px",
    width: "100%",
    background: "white",
    borderBottom: "solid #cbcacd",
    borderWidth: "1px",
  },
  showActionsFilters: {
    top: 100,
  },
  showActionsText: {
    color: "#3b74a1",
    fontSize: "12px",
    marginLeft: "5px",
    "&:hover": {
      cursor: "pointer",
      textDecoration: "underline",
    },
  },
  dropdown: {
    display: "flex",
    alignItems: "center",
    height: "25px",
    minHeight: "25px",
    width: "100%",
    borderBottom: "solid #cbcacd",
    borderWidth: "1px",
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
    borderBottom: "solid #cbcacd",
    borderWidth: "1px",
  },
  selectedPost: {
    background: "#fff7ce",
  },
  unansweredPost: {
    background: "#fde4e0",
  },
  postLeft: {
    display: "flex",
    flexDirection: "column",
    width: "20px",
    minWidth: "20px",
    marginRight: "3px",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
  },
  postCenter: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "5px 0px 5px 0px",
  },
  postTop: {
    display: "flex",
    height: "22px",
    alignItems: "flex-start",
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
    position: "relative",
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
  ieCheckmark: {
    position: "absolute",
    color: "#fbae40",
    fontSize: "11px",
    transform: "translateY(1px)",
  },
  optionsButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20px",
    height: "20px",
    background: "#a9bad9",
    "&:hover": {
      background: "#3b74a1",
      cursor: "pointer",
    },
  },
  openOptionsButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "20px",
    height: "20px",
    background: "#3b74a1",
    "&:hover": {
      cursor: "pointer",
    },
  },
  optionsArrow: {
    color: "white",
    fontSize: "20px",
    transform: "rotate(90deg)",
  },
  vDivider: {
    minWidth: "1px",
    width: "1px",
    height: "19px",
    background: "#adb5bd",
  },
  instructorEndorsedText: {
    color: "#098943",
    fontSize: "10px",
    fontWeight: 600,
  },
  unviewedCircle: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    height: "10px",
    width: "10px",
    borderRadius: "5px",
    background: "#3b74a1",
  },
  unresolvedText: {
    color: "#b23633",
    fontSize: "10px",
    fontWeight: 600,
  },
});

interface SidebarProps {
  mouseOverPost: {
    [key: string]: { [key: string]: boolean };
  };
  setMouseOverPostField: (
    post: string,
    type: "init" | "show" | "over" | "open",
    flip: "on" | "off"
  ) => void;
  setAllMouseOverPost: (flip: "on" | "off") => void;
  showActions: boolean;
  flipShowActions: () => void;
  flipShowSidebar: () => void;
}

export const Sidebar = ({
  mouseOverPost,
  setMouseOverPostField,
  setAllMouseOverPost,
  showActions,
  flipShowActions,
  flipShowSidebar,
}: SidebarProps) => {
  const { classes } = useStyles();
  const { currentUser, viewPost } = useContext(LoginContext);
  const { filter, changeFilter, post, changePost, filteredPosts } =
    useContext(PazzaContext);

  const [overMenuSettings, setOverMenuSettings] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [weeks, setWeeks] = useState<number[]>([]);
  const [dropdowns, setDropdowns] = useState<{ [key: string]: boolean }>({
    "0": true,
    "1": true,
    "2": true,
    "3": true,
    "4": true,
  });

  useEffect(() => {
    const acc: number[] = [];
    [...filteredPosts].reverse().forEach((post) => {
      setMouseOverPostField(post.title, "init", "on");
      const weeksAgo = Math.floor(
        (getDaysAgo(post.date) - (new Date().getDay() + 8)) / 7
      );
      if (weeksAgo >= 0 && !acc.includes(weeksAgo) && !post.pinned) {
        acc.push(weeksAgo);
        setDropdowns((prev) => {
          return {
            ...prev,
            [`${5 + weeksAgo}`]: weeksAgo === 0,
          };
        });
      }
    });
    setWeeks(acc);
    if (post) viewPost(post);
  }, []);

  const flipDropdown = (dropdown: number) => {
    setDropdowns((prev) => {
      return { ...prev, [`${dropdown}`]: !prev[`${dropdown}`] };
    });
  };

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleShowActionsClick = () => {
    flipShowActions();
    setAllMouseOverPost("on");
  };

  const getPostDate = (post: Post) => {
    if (getDaysAgo(post.date) < 2) {
      return `${post.date.getHours() % 12 || 12}:${
        post.date.getMinutes() < 10 ? "0" : ""
      }${post.date.getMinutes()}${post.date.getHours() >= 12 ? " PM" : " AM"}`;
    } else if (
      getDaysAgo(post.date) >= 2 &&
      getDaysAgo(post.date) < new Date().getDay() + 8
    ) {
      switch (post.date.getDay()) {
        case 0:
          return "Sunday";
        case 1:
          return "Monday";
        case 2:
          return "Tuesday";
        case 3:
          return "Wednesday";
        case 4:
          return "Thursday";
        case 5:
          return "Friday";
        case 6:
          return "Saturday";
      }
    } else {
      return `${dayjs(post.date).format("M/DD/YYYY")}`;
    }
  };

  const getPostPreviews = (filteredPosts: Post[]) => {
    const posts: ReactNode[] = [];
    filteredPosts
      .sort((a, b) => b.date.getTime() - a.date.getTime())
      .map((fPost, idx) => {
        const badges = [];
        if (fPost.type === "note") {
          badges.push(
            <div className={classes.notePaper}>
              <div className={classes.noteLine} />
              <div className={classes.noteLine} />
              <div className={classes.noteLine} />
              <div className={classes.noteLine} />
            </div>
          );
        }
        if (fPost.studentAnswer) {
          badges.push(
            <div
              className={`${classes.answerBadge} ${classes.studentAnswerBadge}`}
            >
              <span>s</span>
              {fPost.studentAnswer.endorser && (
                <ImCheckmark className={classes.ieCheckmark} />
              )}
            </div>
          );
        }
        if (fPost.instructorAnswer) {
          badges.push(
            <div
              className={`${classes.answerBadge} ${classes.instructorAnswerBadge}`}
            >
              <span>i</span>
            </div>
          );
        }

        posts.push(
          <div
            key={idx}
            className={`${classes.post} ${
              post?.title === fPost.title
                ? classes.selectedPost
                : !fPost.studentAnswer &&
                  !fPost.instructorAnswer &&
                  fPost.type === "question"
                ? classes.unansweredPost
                : ""
            }`}
            onMouseEnter={() =>
              setMouseOverPostField(fPost.title, "show", "on")
            }
            onMouseLeave={() =>
              setMouseOverPostField(fPost.title, "show", "off")
            }
            onClick={() => {
              changePost(fPost);
              viewPost(fPost);
            }}
          >
            <div className={classes.postLeft}>
              <div
                onMouseEnter={() =>
                  setMouseOverPostField(fPost.title, "over", "on")
                }
                onMouseLeave={() =>
                  setMouseOverPostField(fPost.title, "over", "off")
                }
              >
                {mouseOverPost[`${fPost.title}`] &&
                mouseOverPost[`${fPost.title}`]["open"] ? (
                  <div className={classes.openOptionsButton}>
                    <MdArrowRight className={classes.optionsArrow} />
                  </div>
                ) : (
                  mouseOverPost[`${fPost.title}`] &&
                  mouseOverPost[`${fPost.title}`]["show"] && (
                    <div
                      className={classes.optionsButton}
                      onClick={() =>
                        setMouseOverPostField(fPost.title, "open", "on")
                      }
                    >
                      <MdArrowRight className={classes.optionsArrow} />
                    </div>
                  )
                )}
              </div>
              {!currentUser?.viewedPosts.find(
                (post) => post._id === fPost._id
              ) && <div className={classes.unviewedCircle} />}
            </div>
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
                  <span className={classes.postTime}>{getPostDate(fPost)}</span>
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
              {fPost.endorser && (
                <span className={classes.instructorEndorsedText}>
                  <li>{`An instructor thinks this is a good ${fPost.type}`}</li>
                </span>
              )}
              {fPost.followUps.filter((followUp) => !followUp.resolved).length >
                0 && (
                <span className={classes.unresolvedText}>
                  <li>{`${
                    fPost.followUps.filter((followUp) => !followUp.resolved)
                      .length
                  } Unresolved followup${
                    fPost.followUps.filter((followUp) => !followUp.resolved)
                      .length > 1
                      ? "s"
                      : ""
                  }`}</li>
                </span>
              )}
            </div>
          </div>
        );
      });
    return posts;
  };

  return (
    <div className={classes.container}>
      <div className={classes.menu}>
        <Tooltip title="Collapse feed" arrow placement="right">
          <div>
            <RiArrowLeftSFill
              className={classes.collapseArrow}
              onClick={flipShowSidebar}
            />
          </div>
        </Tooltip>
        <div className={classes.vDivider} />
        <span className={classes.menuText}>Updated</span>
        <span className={classes.menuText}>Unread</span>
        <span className={classes.menuText}>Unresolved</span>
        <span className={classes.menuText}>Following</span>
        <div className={classes.menuEnd}>
          <div className={classes.vDivider} />
          <div
            onMouseEnter={() => setOverMenuSettings(true)}
            onMouseLeave={() => setOverMenuSettings(false)}
          >
            <IoIosSettings
              className={`${classes.menuSettingsGear} ${
                overMenuSettings && classes.overMenuSettings
              }`}
            />
            <IoMdArrowDropdown
              className={`${classes.menuSettingsArrow} ${
                overMenuSettings && classes.overMenuSettings
              }`}
            />
          </div>
        </div>
      </div>
      <div className={classes.newAndSearch}>
        <button className={classes.newPostButton}>
          <MdNoteAdd />
          <span className={classes.newPostButtonText}>New Post</span>
        </button>
        <div className={classes.searchBar}>
          <FaMagnifyingGlass className={classes.magnifyingGlass} />
          <input
            className={`${classes.searchInput} ${
              !searchText && classes.emptyInput
            }`}
            placeholder="Search or add a post..."
            value={searchText}
            onChange={handleSearchTextChange}
          />
          {searchText && (
            <BiX className={classes.x} onClick={() => setSearchText("")} />
          )}
        </div>
      </div>
      {filter && (
        <div className={classes.filters}>
          <span>Filtering on:</span>
          <div className={classes.filter} onClick={() => changeFilter("")}>
            <span className={classes.filterName}>{filter}</span>
            <BiX />
          </div>
        </div>
      )}
      <div
        className={`${classes.showActions} ${
          filter && classes.showActionsFilters
        }`}
      >
        <span
          className={classes.showActionsText}
          onClick={handleShowActionsClick}
        >
          {showActions ? "Hide Actions" : "Show Actions"}
        </span>
      </div>
      {filteredPosts.filter((post) => post.pinned).length > 0 && (
        <div className={classes.dropdown} onClick={() => flipDropdown(0)}>
          <MdArrowRight
            className={`${classes.dropdownArrow} ${
              dropdowns["0"] ? classes.openDropdownArrow : ""
            }`}
          />
          <span className={classes.dropdownTitle}>PINNED</span>
        </div>
      )}
      {dropdowns["0"] &&
        getPostPreviews(filteredPosts.filter((post) => post.pinned))}
      {filteredPosts.filter(
        (post) => getDaysAgo(post.date) === 0 && !post.pinned
      ).length > 0 && (
        <div className={classes.dropdown} onClick={() => flipDropdown(1)}>
          <MdArrowRight
            className={`${classes.dropdownArrow} ${
              dropdowns["1"] ? classes.openDropdownArrow : ""
            }`}
          />
          <span className={classes.dropdownTitle}>TODAY</span>
        </div>
      )}
      {dropdowns["1"] &&
        getPostPreviews(
          filteredPosts.filter(
            (post) => getDaysAgo(post.date) === 0 && !post.pinned
          )
        )}
      {filteredPosts.filter(
        (post) => getDaysAgo(post.date) === 1 && !post.pinned
      ).length > 0 && (
        <div className={classes.dropdown} onClick={() => flipDropdown(2)}>
          <MdArrowRight
            className={`${classes.dropdownArrow} ${
              dropdowns["2"] ? classes.openDropdownArrow : ""
            }`}
          />
          <span className={classes.dropdownTitle}>YESTERDAY</span>
        </div>
      )}
      {dropdowns["2"] &&
        getPostPreviews(
          filteredPosts.filter(
            (post) => getDaysAgo(post.date) === 1 && !post.pinned
          )
        )}
      {filteredPosts.filter(
        (post) =>
          getDaysAgo(post.date) > 1 &&
          getDaysAgo(post.date) <= new Date().getDay() &&
          !post.pinned
      ).length > 0 && (
        <div className={classes.dropdown} onClick={() => flipDropdown(3)}>
          <MdArrowRight
            className={`${classes.dropdownArrow} ${
              dropdowns["3"] ? classes.openDropdownArrow : ""
            }`}
          />
          <span className={classes.dropdownTitle}>THIS WEEK</span>
        </div>
      )}
      {dropdowns["3"] &&
        getPostPreviews(
          filteredPosts.filter(
            (post) =>
              getDaysAgo(post.date) > 1 &&
              getDaysAgo(post.date) <= new Date().getDay() &&
              !post.pinned
          )
        )}
      {filteredPosts.filter(
        (post) =>
          getDaysAgo(post.date) > new Date().getDay() + 1 &&
          getDaysAgo(post.date) <= new Date().getDay() + 7 &&
          !post.pinned
      ).length > 0 && (
        <div className={classes.dropdown} onClick={() => flipDropdown(4)}>
          <MdArrowRight
            className={`${classes.dropdownArrow} ${
              dropdowns["4"] ? classes.openDropdownArrow : ""
            }`}
          />
          <span className={classes.dropdownTitle}>LAST WEEK</span>
        </div>
      )}
      {dropdowns["4"] &&
        getPostPreviews(
          filteredPosts.filter(
            (post) =>
              getDaysAgo(post.date) > new Date().getDay() + 1 &&
              getDaysAgo(post.date) <= new Date().getDay() + 7 &&
              !post.pinned
          )
        )}
      {weeks.reverse().map((week, idx) => (
        <div key={idx}>
          {filteredPosts.filter(
            (post) =>
              getDaysAgo(post.date) >= new Date().getDay() + 8 + week * 7 &&
              getDaysAgo(post.date) <= new Date().getDay() + 14 + week * 7 &&
              !post.pinned
          ).length > 0 && (
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
          )}
          {dropdowns[`${5 + week}`] &&
            getPostPreviews(
              filteredPosts.filter(
                (post) =>
                  getDaysAgo(post.date) >= new Date().getDay() + 8 + week * 7 &&
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
