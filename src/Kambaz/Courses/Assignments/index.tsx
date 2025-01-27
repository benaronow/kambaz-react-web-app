import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { LessonControlButtons } from "../Modules/LessonControlButtons";
import { RiFileEditLine } from "react-icons/ri";
import "../../styles.css";

export const Assignments = () => {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroup.Item className="p-0 mb-5 fs-5 border-gray">
          <div className="wd-assignments-title p-3 ps-2 bg-primary">
            <BsGripVertical className="me-2 fs-3" />
            ASSIGNMENTS 40% of Total
            <button>+</button>
            <LessonControlButtons />
          </div>
          <ListGroup className="wd-assignments rounded-0">
            <ListGroup.Item
              className="wd-assignment-list-item p-3 ps-1"
              style={{ display: "flex", width: "100%" }}
            >
              <BsGripVertical className="me-2 fs-3" />
              <a
                href="#/Kambaz/Courses/1234/Assignments/123"
                className="wd-assignment-link"
                style={{ marginRight: "20px" }}
              >
                <RiFileEditLine />
              </a>
              <div className="wd-flex-col-container" style={{ width: "80%" }}>
                <span>A1</span>
                <span>
                  Multiple Modules | <b>Not available until</b> May 6 at 12:00am
                  |
                </span>
                <span>
                  <b>Due</b> May 13 at 11:59pm | 100 pts
                </span>
              </div>
              <div style={{ width: "20%" }}>
                <LessonControlButtons />
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="wd-assignment-list-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <a
                href="#/Kambaz/Courses/1234/Assignments/123"
                className="wd-assignment-link"
              >
                <RiFileEditLine />
              </a>
              <div>
                <span>A2</span>
                <br />
                <span>
                  Multiple Modules | <b>Not available until</b> May 6 at 12:00am
                  |
                </span>
                <br />
                <span>
                  <b>Due</b> May 13 at 11:59pm | 100 pts
                </span>
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
            <ListGroup.Item className="wd-assignment-list-item p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <a
                href="#/Kambaz/Courses/1234/Assignments/123"
                className="wd-assignment-link"
              >
                <RiFileEditLine />
              </a>
              <div>
                <span>A3</span>
                <br />
                <span>
                  Multiple Modules | <b>Not available until</b> May 6 at 12:00am
                  |
                </span>
                <br />
                <span>
                  <b>Due</b> May 13 at 11:59pm | 100 pts
                </span>
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </a>
          <br />
          <span>
            Multiple Modules | <b>Not available until</b> May 6 at 12:00am |
          </span>
          <br />
          <span>
            <b>Due</b> May 13 at 11:59pm | 100 pts
          </span>
        </li>
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </a>
          <br />
          <span>
            Multiple Modules | <b>Not available until</b> May 13 at 12:00am |
          </span>
          <br />
          <span>
            <b>Due</b> May 20 at 11:59pm | 100 pts
          </span>
        </li>
        <li className="wd-assignment-list-item">
          <a
            href="#/Kambaz/Courses/1234/Assignments/123"
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT + REACT
          </a>
          <br />
          <span>
            Multiple Modules | <b>Not available until</b> May 20 at 12:00am |
          </span>
          <br />
          <span>
            <b>Due</b> May 27 at 11:59pm | 100 pts
          </span>
        </li>
      </ul>
    </div>
  );
};
