import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { RiFileEditLine } from "react-icons/ri";
import { LessonControlButtons } from "../Modules/LessonControlButtons";

interface AssignmentItemProps {
  number: number;
  start: number;
  end: number;
}

export const AssignmentItem = ({ number, start, end }: AssignmentItemProps) => {
  return (
    <ListGroup.Item className="wd-assignment-list-item-container p-0 ps-0">
      <div className="wd-assignment-list-item">
        <BsGripVertical className="me-2 fs-2" />
        <a
          href="#/Kambaz/Courses/1234/Assignments/123"
          className="wd-assignment-link"
        >
          <RiFileEditLine className="wd-edit-icon fs-2" />
        </a>
        <div className="wd-flex-col-container mt-3 mb-3">
          <span>
            <b>A{number}</b>
          </span>
          <span className="fs-6">
            <span className="text-danger">Multiple Modules </span>
            <span className="text-secondary">
              | <b>Not available until</b> May {start} at 12:00am |
            </span>
          </span>
          <span className="fs-6 text-secondary">
            <b>Due</b> May {end} at 11:59pm | 100 pts
          </span>
        </div>
        <div className="wd-lesson-control me-3">
          <LessonControlButtons />
        </div>
      </div>
    </ListGroup.Item>
  );
};
