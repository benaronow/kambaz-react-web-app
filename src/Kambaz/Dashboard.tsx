/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  addEnrollment,
  deleteEnrollment,
  setEnrollments,
} from "./enrollmentsReducer";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import { fetchDbEnrollments } from "./enrollmentsClient";
import {
  addCourse,
  deleteCourse,
  setAllCourses,
  setCourses,
  updateCourse,
} from "./Courses/reducer";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  console.log(enrollments);
  const { allCourses } = useSelector((state: any) => state.coursesReducer);
  const [displayAllCourses, setDisplayAllCourses] = useState(false);

  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      const allCourses = await courseClient.fetchAllCourses();
      dispatch(setCourses(courses));
      dispatch(setAllCourses(allCourses));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser, enrollments]);

  const fetchEnrollments = async () => {
    const enrollments = await fetchDbEnrollments();
    dispatch(setEnrollments(enrollments));
  };
  useEffect(() => {
    fetchEnrollments();
  }, []);

  const getIsEnrolled = (course: any) =>
    enrollments.find(
      (enrollment: any) =>
        enrollment.user === currentUser._id && enrollment.course === course._id
    );

  const courses = allCourses.filter((course: any) => getIsEnrolled(course));

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button
          className="btn btn-primary float-end"
          id="wd-enrollments-click"
          onClick={() => setDisplayAllCourses((prev) => !prev)}
        >
          Enrollments
        </button>
      </h1>{" "}
      <hr />
      {currentUser.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addCourse(course))}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={() => dispatch(updateCourse(course))}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
        </>
      )}
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({(displayAllCourses ? allCourses : courses).length})
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {(displayAllCourses ? allCourses : courses).map(
            (course: any, idx: number) => (
              <Col
                key={idx}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      src="/images/reactjs.jpg"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}{" "}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}{" "}
                      </Card.Text>
                      <Button variant="primary"> Go </Button>
                      {currentUser.role === "FACULTY" && !displayAllCourses && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(deleteCourse(course._id));
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
                      {displayAllCourses && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                getIsEnrolled(course)
                                  ? deleteEnrollment(
                                      enrollments.find(
                                        (enrollment: any) =>
                                          enrollment.user === currentUser._id &&
                                          enrollment.course === course._id
                                      )
                                    )
                                  : addEnrollment({
                                      user: currentUser._id,
                                      course: course._id,
                                    })
                              );
                            }}
                            className={`btn btn-${
                              getIsEnrolled(course) ? "danger" : "success"
                            } float-end`}
                            id="wd-delete-course-click"
                          >
                            {getIsEnrolled(course) ? "Unenroll" : "Enroll"}
                          </button>
                        </>
                      )}
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            )
          )}
        </Row>
      </div>
    </div>
  );
};
