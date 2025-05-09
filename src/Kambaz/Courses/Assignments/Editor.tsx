/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Col,
  Form,
  FormCheck,
  FormControl,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import { useLocation, useNavigate, useParams } from "react-router";
import { Assignment } from "./AssignmentItem";
import { useDispatch, useSelector } from "react-redux";
import { ChangeEvent, useState } from "react";
import { addAssignment, updateAssignment } from "./reducer";

export const AssignmentEditor = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { cid, aid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const prevAssigment: Assignment | undefined = aid
    ? assignments?.find((assignment: Assignment) => assignment._id === aid)
    : undefined;
  const emptyAssigment: Assignment = {
    _id: "",
    title: "",
    description: "",
    points: "100",
    course: cid || "",
    group: "ASSIGNMENTS",
    startMonth: "",
    startDay: "",
    endMonth: "",
    endDay: "",
    untilMonth: "",
    untilDay: "",
  };
  const [assignment, setAssignment] = useState<Assignment>(
    prevAssigment ?? emptyAssigment
  );

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleSubmit = () => {
    dispatch(
      pathname.includes("new")
        ? addAssignment(assignment)
        : updateAssignment(assignment)
    );
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAssignment((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAssignment((prev) => ({ ...prev, description: e.target.value }));
  };

  const handlePointsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAssignment((prev) => ({ ...prev, points: e.target.value }));
  };

  const handleGroupChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setAssignment((prev) => ({ ...prev, group: e.target.value }));
  };

  const handleStartChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setAssignment((prev) => ({
      ...prev,
      startMonth: e.target.value.split("-")[1],
      startDay: e.target.value.split("-")[2],
    }));
  };

  const handleEndChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setAssignment((prev) => ({
      ...prev,
      endMonth: e.target.value.split("-")[1],
      endDay: e.target.value.split("-")[2],
    }));
  };

  const handleUntilChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setAssignment((prev) => ({
      ...prev,
      untilMonth: e.target.value.split("-")[1],
      untilDay: e.target.value.split("-")[2],
    }));
  };

  return (
    <div id="wd-assignments-editor" className="ps-2">
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
          <FormControl
            id="wd-name"
            defaultValue={assignment?.title ?? ""}
            onChange={handleTitleChange}
          />
        </FormGroup>
        <FormControl
          id="wd-description"
          as="textarea"
          rows={12}
          className="mb-3"
          onChange={handleDescriptionChange}
        >
          {assignment?.description ?? ""}
        </FormControl>
        <FormGroup as={Row} className="mb-3">
          <FormLabel
            column
            sm={4}
            htmlFor="wd-points"
            className="d-flex flex-row-reverse"
            onChange={handlePointsChange}
          >
            Points
          </FormLabel>
          <Col sm={8}>
            <FormControl
              id="wd-points"
              type="number"
              defaultValue={parseInt(assignment.points) ?? 100}
              onChange={handlePointsChange}
            />
          </Col>
        </FormGroup>
        <FormGroup as={Row} className="mb-3">
          <FormLabel
            column
            sm={4}
            htmlFor="wd-group"
            className="d-flex flex-row-reverse"
          >
            Assignment Group
          </FormLabel>
          <Col sm={8}>
            <FormSelect id="wd-group" onChange={handleGroupChange}>
              <option
                selected={assignment.group === "ASSIGNMENTS"}
                value="ASSIGNMENTS"
              >
                ASSIGNMENTS
              </option>
              <option selected={assignment.group === "QUIZZES"} value="QUIZZES">
                QUIZZES
              </option>
              <option selected={assignment.group === "EXAMS"} value="EXAMS">
                EXAMS
              </option>
              <option selected={assignment.group === "PROJECT"} value="PROJECT">
                PROJECT
              </option>
            </FormSelect>
          </Col>
        </FormGroup>
        <FormGroup as={Row} className="mb-3">
          <FormLabel
            column
            sm={4}
            htmlFor="wd-display-grade-as"
            className="d-flex flex-row-reverse"
          >
            Display Grade as
          </FormLabel>
          <Col sm={8}>
            <FormSelect id="wd-display-grade-as">
              <option selected value="PERCENTAGE">
                Percentage
              </option>
              <option value="FRACTION">Fraction</option>
            </FormSelect>
          </Col>
        </FormGroup>
        <FormGroup as={Row} className="mb-3">
          <FormLabel
            column
            sm={4}
            htmlFor="wd-submission-type"
            className="d-flex flex-row-reverse"
          >
            Submission Type
          </FormLabel>
          <Col sm={8}>
            <div className="border border-1 rounded p-3">
              <FormSelect id="wd-submission-type" className="mb-3">
                <option selected value="ONLINE">
                  Online
                </option>
                <option value="IN_PERSON">In Person</option>
              </FormSelect>
              <div></div>
              <span>
                <b>Online Entry Options</b>
              </span>
              <FormCheck
                className="my-3"
                name="check-entry"
                type="checkbox"
                id="wd-text-entry"
                label="Text Entry"
              />
              <FormCheck
                className="mb-3"
                name="check-entry"
                type="checkbox"
                defaultChecked
                id="wd-website-url"
                label="Website URL"
              />
              <FormCheck
                className="mb-3"
                name="check-entry"
                type="checkbox"
                id="wd-media-recordings"
                label="Media Recordings"
              />
              <FormCheck
                className="mb-3"
                name="check-entry"
                type="checkbox"
                id="wd-student-annotation"
                label="Student Annotation"
              />
              <FormCheck
                name="check-entry"
                type="checkbox"
                id="wd-file-upload"
                label="File Upload"
              />
            </div>
          </Col>
        </FormGroup>
        <FormGroup as={Row} className="mb-3">
          <FormLabel column sm={4} className="d-flex flex-row-reverse">
            Assign
          </FormLabel>
          <Col sm={8}>
            <div className="border border-1 rounded p-3">
              <FormGroup>
                <FormLabel htmlFor="wd-assign-to" className="mb-1">
                  <span>
                    <b>Assign to</b>
                  </span>
                </FormLabel>
                <FormControl
                  id="wd-assign-to"
                  className="mb-3"
                  defaultValue="Everyone"
                />
              </FormGroup>
              <FormGroup>
                <FormLabel htmlFor="wd-due-date" className="mb-1">
                  <span>
                    <b>Due</b>
                  </span>
                </FormLabel>
                <FormControl
                  id="wd-due-date"
                  className="mb-3"
                  type="date"
                  defaultValue={
                    assignment.endMonth &&
                    assignment.endDay &&
                    `2025-${assignment?.endMonth}-${assignment?.endDay}`
                  }
                  onChange={handleEndChange}
                />
              </FormGroup>
              <Row>
                <FormGroup as={Col} sm={6}>
                  <FormLabel htmlFor="wd-available-from" className="mb-1">
                    <span>
                      <b>Available from</b>
                    </span>
                  </FormLabel>
                  <FormControl
                    id="wd-available-from"
                    className="mb-3"
                    type="date"
                    defaultValue={
                      assignment.startMonth &&
                      assignment.startDay &&
                      `2025-${assignment?.startMonth}-${assignment?.startDay}`
                    }
                    onChange={handleStartChange}
                  />
                </FormGroup>
                <FormGroup as={Col} sm={6}>
                  <FormLabel htmlFor="wd-available-until" className="mb-1">
                    <span>
                      <b>Until</b>
                    </span>
                  </FormLabel>
                  <FormControl
                    id="wd-available-until"
                    className="mb-3"
                    type="date"
                    defaultValue={
                      assignment.untilMonth &&
                      assignment.untilDay &&
                      `2025-${assignment?.untilMonth}-${assignment?.untilDay}`
                    }
                    onChange={handleUntilChange}
                  />
                </FormGroup>
              </Row>
            </div>
          </Col>
        </FormGroup>
        <hr />
        <div className="d-flex flex-row-reverse">
          <button
            className="border border-1 rounded p-2 bg-danger text-light"
            type="submit"
          >
            <span className="mx-1">Save</span>
          </button>
          <button
            className="border border-1 rounded me-1"
            onClick={handleCancel}
          >
            <span className="mx-1">Cancel</span>
          </button>
        </div>
      </Form>
    </div>
  );
};
