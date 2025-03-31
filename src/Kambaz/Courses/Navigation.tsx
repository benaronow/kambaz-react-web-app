import { Link, useLocation, useParams } from "react-router-dom";

export const CourseNavigation = () => {
  const location = useLocation();
  const { cid } = useParams();
  const links = [
    "Home",
    "Modules",
    "Pazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  const getColor = (pathname: string) => {
    return location.pathname.includes(`Kambaz/Courses/${cid}/${pathname}`)
      ? "active"
      : "text-danger";
  };

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          to={`/Kambaz/Courses/${cid}/${link}`}
          id={`wd-course-${link.toLowerCase()}-link`}
          className={`list-group-item border border-0 ${getColor(link)}`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
};
