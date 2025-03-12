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
import { useNavigate, useParams } from "react-router";
import * as db from "../../Database";
import { Assignment } from "./AssignmentItem";

export const AssignmentEditor = () => {
  const navigate = useNavigate();
  const { cid, aid } = useParams();
  const assignment: Assignment | undefined = db.assignments.find(
    (assignment) => assignment._id === aid
  );

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="ps-2">
      <Form>
        <FormGroup className="mb-3">
          <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
          <FormControl id="wd-name" defaultValue={assignment?.title} />
        </FormGroup>
        <FormControl
          id="wd-description"
          as="textarea"
          rows={12}
          className="mb-3"
        >
          {
            "The assignment is available online.\n\nSubmit a link to the landing page of your Web application running on Netlify.\n\nThe landing page should include the following:\n\n- Your full name and section\n- Links to each of the lab assigments\n- Link to the Kanbas application\n- Links to all relevant source code repositories.\n\nThe Kanbas should include a link to navigate back to the landing page."
          }
        </FormControl>
        <FormGroup as={Row} className="mb-3">
          <FormLabel
            column
            sm={4}
            htmlFor="wd-points"
            className="d-flex flex-row-reverse"
          >
            Points
          </FormLabel>
          <Col sm={8}>
            <FormControl id="wd-points" type="number" defaultValue={100} />
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
            <FormSelect id="wd-group">
              <option selected value="ASSIGNMENTS">
                ASSIGNMENTS
              </option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
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
                  defaultValue={`2024-${assignment?.endMonth}-${assignment?.endDay}`}
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
                    defaultValue={`2024-${assignment?.startMonth}-${assignment?.startDay}`}
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
