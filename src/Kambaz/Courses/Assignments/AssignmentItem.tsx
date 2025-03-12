import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { RiFileEditLine } from "react-icons/ri";
import { LessonControlButtons } from "../Modules/LessonControlButtons";
import { useParams } from "react-router";
import { MONTHMAP } from "./monthMap";
import { useSelector } from "react-redux";

export type Assignment = {
  _id: string;
  title: string;
  course: string;
  startMonth: string;
  startDay: string;
  endMonth: string;
  endDay: string;
};

interface AssignmentItemProps {
  assignment: Assignment;
}

export const AssignmentItem = ({ assignment }: AssignmentItemProps) => {
  const { cid } = useParams();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <ListGroup.Item className="wd-assignment-list-item-container p-0 ps-0">
      <div className="wd-assignment-list-item">
        <BsGripVertical className="me-2 fs-2" />
        {currentUser.role === "FACULTY" && (
          <a
            href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
            className="wd-assignment-link"
          >
            <RiFileEditLine className="wd-edit-icon fs-2" />
          </a>
        )}
        <div className="wd-flex-col-container mt-3 mb-3">
          <span>
            <b>{assignment.title}</b>
          </span>
          <span className="fs-6">
            <span className="text-danger">Multiple Modules </span>
            <span className="text-secondary">
              | <b>Not available until</b>
              {` ${
                MONTHMAP[`m${assignment.startMonth}` as keyof typeof MONTHMAP]
              } `}
              {assignment.startDay} at 12:00am |
            </span>
          </span>
          <span className="fs-6 text-secondary">
            <b>Due</b>
            {` ${
              MONTHMAP[`m${assignment.endMonth}` as keyof typeof MONTHMAP]
            } `}
            {assignment.endDay} at 11:59pm | 100 pts
          </span>
        </div>
        <div className="wd-lesson-control me-3">
          <LessonControlButtons
            isModule={false}
            moduleId=""
            deleteModule={() => {}}
            editModule={() => {}}
          />
        </div>
      </div>
    </ListGroup.Item>
  );
};
