/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import {
  addCourse,
  deleteCourse,
  setCourses,
  updateCourse,
} from "./Courses/reducer";

export const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses } = useSelector((state: any) => state.coursesReducer);

  const [enrolling, setEnrolling] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      dispatch(setCourses(courses.filter((c: any) => c !== null)));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses?.find((c: any) => c?._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      dispatch(setCourses(courses.filter((c: any) => c !== null)));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  const enrollUser = async (user: string, course: string) => {
    await userClient.enrollIntoCourse(user, course);
  };

  const createAndAddCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    enrollUser(currentUser._id, newCourse._id);
    dispatch(addCourse(newCourse));
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        <button
          className="btn btn-primary float-end"
          id="wd-enrollments-click"
          onClick={() => setEnrolling((prev) => !prev)}
        >
          Enrollments
        </button>
      </h1>{" "}
      <hr />
      {(currentUser.role === "FACULTY" || currentUser.role === "ADMIN") && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => {
                createAndAddCourse();
              }}
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
      <h2 id="wd-dashboard-published">{`${enrolling ? "All" : "My"} Courses (${
        courses.length
      })`}</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: any) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  to={`/Kambaz/Courses/${course?._id}/Home`}
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
                      {course?.name}{" "}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course?.description}{" "}
                    </Card.Text>
                    <Button variant="primary"> Go </Button>
                    {currentUser.role === "FACULTY" && !enrolling && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            dispatch(deleteCourse(course?._id));
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
                    {enrolling && (
                      <>
                        <button
                          onClick={(event) => {
                            event.preventDefault();
                            if (course?.enrolled) {
                              userClient.unenrollFromCourse(
                                currentUser._id,
                                course?._id
                              );
                            } else {
                              enrollUser(currentUser._id, course?._id);
                            }
                            fetchCourses();
                          }}
                          className={`btn btn-${
                            course?.enrolled ? "danger" : "success"
                          } float-end`}
                          id="wd-delete-course-click"
                        >
                          {course?.enrolled ? "Unenroll" : "Enroll"}
                        </button>
                      </>
                    )}
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};
