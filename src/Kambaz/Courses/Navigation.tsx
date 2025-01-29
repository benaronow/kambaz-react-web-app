import { Link, useLocation } from "react-router-dom";

export const CourseNavigation = () => {
  const location = useLocation();

  const getColor = (pathname: string) => {
    return location.pathname.includes(`Kambaz/Courses/1234/${pathname}`)
      ? "active"
      : "text-danger";
  };

  return (
    <div
      id="wd-courses-navigation"
      className="wd list-group fs-5 rounded-0"
    >
      <Link
        to="/Kambaz/Courses/1234/Home"
        id="wd-course-home-link"
        className={`list-group-item border border-0 ${getColor("Home")}`}
      >
        Home
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Modules"
        id="wd-course-modules-link"
        className={`list-group-item border border-0 ${getColor("Modules")}`}
      >
        Modules
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Piazza"
        id="wd-course-piazza-link"
        className={`list-group-item border border-0 ${getColor("Piazza")}`}
      >
        Piazza
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Zoom"
        id="wd-course-zoom-link"
        className={`list-group-item border border-0 ${getColor("Zoom")}`}
      >
        Zoom
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Assignments"
        id="wd-course-quizzes-link"
        className={`list-group-item border border-0 ${getColor("Assignments")}`}
      >
        Assignments
      </Link>
      <Link
        to="/Kambaz/Courses/1234/Quizzes"
        id="wd-course-assignments-link"
        className={`list-group-item border border-0 ${getColor("Quizzes")}`}
      >
        Quizzes
      </Link>
      <Link
        to="/Kambaz/Courses/1234/People"
        id="wd-course-people-link"
        className={`list-group-item border border-0 ${getColor("People")}`}
      >
        People
      </Link>
    </div>
  );
};
