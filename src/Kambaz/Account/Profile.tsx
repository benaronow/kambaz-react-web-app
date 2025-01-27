import { FormControl, FormSelect } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Profile = () => {
  return (
    <div id="wd-profile-screen">
      <h1>Profile</h1>
      <FormControl
        id="wd-username"
        placeholder="username"
        defaultValue="alice"
        className="mb-2"
      />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        defaultValue="123"
        className="mb-2"
      />
      <FormControl
        id="wd-firstname"
        placeholder="First Name"
        defaultValue="Alice"
        className="mb-2"
      />
      <FormControl
        id="wd-lastname"
        placeholder="Last Name"
        defaultValue="Wonderland"
        className="mb-2"
      />
      <FormControl
        id="wd-dob"
        type="date"
        defaultValue="2000-01-01"
        className="mb-2"
      />
      <FormControl
        id="wd-email"
        type="email"
        defaultValue="alice@wonderland"
        className="mb-2"
      />
      <FormSelect id="wd-role" className="mb-2">
        <option selected value="USER">
          User
        </option>
        <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option>
        <option value="STUDENT">Student</option>
      </FormSelect>
      <Link
        id="wd-signout-btn"
        to="/Kambaz/Account/Signin"
        className="btn btn-danger w-100 mb-2"
      >
        Sign out
      </Link>
    </div>
  );
};
