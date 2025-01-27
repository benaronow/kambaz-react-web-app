import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/1234/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/reactjs.jpg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS1234 React JS
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Full Stack software developer
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/2345/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/vite.jpg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS2345 Vite
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Learn how to use Vite
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/3456/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/nextjs.jpg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS3456 NextJS
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Learn how to use NextJS
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/4567/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/java.jpg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS4567 Java
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Become a Java developer
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/5678/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/python.jpg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS5678 Python
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Become a Python developer
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/6789/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/c++.jpg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS6789 C++
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Become a C++ developer
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/3500/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/ood.jpg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS3500 Object Oriented Design
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Learn OOD principles
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
          <Col className="wd-dashboard-course" style={{ width: "300px" }}>
            <Card>
              <Link
                to="/Kambaz/Courses/3000/Home"
                className="wd-dashboard-course-link text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/algo.jpg"
                  width="100%"
                  height={160}
                />
                <Card.Body>
                  <Card.Title className="wd-dashboard-course-title">
                    CS3000 Algorithms and Data
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description">
                    Learn the fundamentals of algorithms
                  </Card.Text>
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
