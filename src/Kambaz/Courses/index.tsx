import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { CourseNavigation } from "./Navigation";
import { Modules } from "./Modules";
import { Home } from "./Home";
import { Assignments } from "./Assignments";
import { AssignmentEditor } from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa6";
import { PeopleTable } from "./People/Table";
import { useEffect, useState } from "react";
import { DeleteModal } from "./DeleteModal";
import * as coursesClient from "./client";
import { Pazza } from "./Pazza";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Courses = ({ courses }: { courses: any[] }) => {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();

  const [courseUsers, setCourseUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await coursesClient.findUsersForCourse(cid ?? "");
      setCourseUsers(users);
    };

    fetchUsers();
  }, [cid]);
  console.log(courseUsers);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteAssignmentId, setDeleteAssignmentId] = useState("");

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Pazza/*" element={<Pazza />} />
            <Route
              path="Assignments"
              element={
                <Assignments
                  setDeleteAssignmentId={setDeleteAssignmentId}
                  setDeleteModalOpen={setDeleteModalOpen}
                />
              }
            />
            <Route path="Assignments/new" element={<AssignmentEditor />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route
              path="People"
              element={<PeopleTable users={courseUsers} />}
            />
          </Routes>
        </div>
      </div>
      {deleteModalOpen && (
        <DeleteModal
          assignmentId={deleteAssignmentId}
          setDeleteModalOpen={setDeleteModalOpen}
        />
      )}
    </div>
  );
};
