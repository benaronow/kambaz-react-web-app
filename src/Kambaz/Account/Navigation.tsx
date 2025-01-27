import { Link, useLocation } from "react-router-dom";

export const AccountNavigation = () => {
  const location = useLocation();

  const getColor = (pathname: string) => {
    return location.pathname.includes(`Kambaz/Account/${pathname}`)
      ? "active"
      : "text-danger";
  };

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        to="/Kambaz/Account/Signin"
        id="wd-signin-link"
        className={`list-group-item border border-0 ${getColor("Signin")}`}
      >
        Signin
      </Link>
      <Link
        to="/Kambaz/Account/Signup"
        id="wd-signup-link"
        className={`list-group-item border border-0 ${getColor("Signup")}`}
      >
        Signup
      </Link>
      <Link
        to="/Kambaz/Account/Profile"
        id="wd-profile-link"
        className={`list-group-item border border-0 ${getColor("Profile")}`}
      >
        Profile
      </Link>
    </div>
  );
};
