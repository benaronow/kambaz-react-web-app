import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export const AccountNavigation = () => {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];

  const getColor = (pathname: string) => {
    return location.pathname.includes(`Kambaz/Account/${pathname}`)
      ? "active"
      : "text-danger";
  };

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => (
        <Link
          to={`/Kambaz/Account/${link}`}
          id={`wd-${link}-link`}
          className={`list-group-item border border-0 ${getColor(link)}`}
        >
          {link}
        </Link>
      ))}
    </div>
  );
};
