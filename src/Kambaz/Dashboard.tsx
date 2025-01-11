import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/reactjs.jpg" width={200} />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/2345/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/vite.jpg" width={200} />
            <div>
              <h5>CS2345 Vite</h5>
              <p className="wd-dashboard-course-title">Learn how to use Vite</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/3456/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/nextjs.jpg" width={200} />
            <div>
              <h5>CS3456 NextJS</h5>
              <p className="wd-dashboard-course-title">
                Learn how to use NextJS
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/4567/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/java.jpg" width={200} />
            <div>
              <h5>CS4567 Java</h5>
              <p className="wd-dashboard-course-title">
                Become a Java developer
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/5678/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/python.jpg" width={200} />
            <div>
              <h5>CS5678 Python</h5>
              <p className="wd-dashboard-course-title">
                Become a Python developer
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/6789/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/c++.jpg" width={200} />
            <div>
              <h5>CS6789 C++</h5>
              <p className="wd-dashboard-course-title">
                Become a C++ developer
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/3500/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/ood.jpg" width={200} />
            <div>
              <h5>CS3500 Object Oriented Design</h5>
              <p className="wd-dashboard-course-title">Learn OOD principles</p>
              <button>Go</button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/3000/Home"
            className="wd-dashboard-course-link"
          >
            <img src="/images/algo.jpg" width={200} />
            <div>
              <h5>CS3000 Algorithms and Data</h5>
              <p className="wd-dashboard-course-title">
                Learn the fundamentals of algorithms
              </p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
