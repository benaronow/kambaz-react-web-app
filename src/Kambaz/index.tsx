/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes, Route, Navigate } from "react-router";
import { Account } from "./Account";
import { Dashboard } from "./Dashboard";
import { KambazNavigation } from "./Navigation";
import { Courses } from "./Courses";
import "./styles.css";
import { ProtectedRoute } from "./Account/ProtectedRoute";
import { useSelector } from "react-redux";
import Session from "./Account/Session";

export const Kambaz = () => {
  const { courses } = useSelector((state: any) => state.coursesReducer);

  return (
    <div id="wd-kambaz">
      <Session>
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </Session>
    </div>
  );
};
