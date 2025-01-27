import { ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { AssignmentItem } from "./AssignmentItem";
import { BiPlus, BiSolidDownArrow } from "react-icons/bi";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaMagnifyingGlass } from "react-icons/fa6";

export const Assignments = () => {
  const dates = [
    [6, 13],
    [13, 20],
    [20, 27],
  ];
  return (
    <div id="wd-assignments" className="ms-5 me-5">
      <div className="wd-assignments-action-bar mb-5">
        <div className="wd-search-container">
          <div className="wd-assignments-search rounded">
            <FaMagnifyingGlass className="mx-2" />
            <input
              placeholder="Search..."
              id="wd-search-assignment"
              className="wd-assignments-search-input me-2 border border-0"
            />
          </div>
        </div>
        <button
          id="wd-add-assignment-group"
          className="wd-assignments-action me-1 px-3 rounded"
        >
          <BiPlus className="fs-4" />
          <span className="me-1">Group</span>
        </button>
        <button
          id="wd-add-assignment"
          className="wd-assignments-action px-3 rounded bg-danger text-light"
        >
          <BiPlus className="fs-4" />
          <span className="me-1">Assignment</span>
        </button>
      </div>
      <ListGroup className="rounded-0" id="wd-assignment-list">
        <ListGroup.Item className="p-0 mb-5 fs-5">
          <div className="wd-assignments-title p-3 ps-2">
            <BsGripVertical className="me-2 fs-3" />
            <BiSolidDownArrow className="me-2 fs-6" />
            <span className="wd-title-text">
              <b>ASSIGNMENTS </b>
            </span>
            <div className="wd-title-extra float-end">
              <span className="wd-title-extra-percent border border-1 border-dark fs-5">
                40% of total
              </span>
              <button className="wd-add-button">
                <BiPlus className="fs-4" />
              </button>
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>
          <ListGroup className="wd-assignments rounded-0 border-start border-success border-5">
            {dates.map((date, idx) => (
              <AssignmentItem
                key={idx}
                number={idx + 1}
                start={date[0]}
                end={date[1]}
              />
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};
