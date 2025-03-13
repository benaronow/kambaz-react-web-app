/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: any }) => {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  const getIsEnrolled = (cid: any) =>
    courses
      .filter((course: any) =>
        enrollments.some(
          (enrollment: any) =>
            enrollment.user === currentUser._id &&
            enrollment.course === course._id
        )
      )
      .find((c: any) => c._id === cid) !== undefined;

  const canAccess = () => {
    return cid ? getIsEnrolled(cid) : true;
  };

  if (currentUser && canAccess()) {
    return children;
  } else if (currentUser && !canAccess()) {
    return <Navigate to="/Kambaz/Dashboard" />;
  } else {
    return <Navigate to="/Kambaz/Account/Signin" />;
  }
};
