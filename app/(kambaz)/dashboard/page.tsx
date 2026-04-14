/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setCourses } from "../courses/reducer";
import { setEnrollments, addEnrollment, removeEnrollment } from "./reducer";
import { RootState } from "../store";
import * as courseClient from "../courses/client";
import * as enrollmentClient from "./client";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer,
  );
  const dispatch = useDispatch();

  const [enrolling, setEnrolling] = useState(false);
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  console.log("currentUser role:", currentUser?.role);
  console.log("isFaculty:", isFaculty);

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (e: any) => e.user === currentUser?._id && e.course === courseId,
    );

  const fetchCourses = async () => {
    try {
      if (enrolling) {
        const allCourses = await courseClient.findAllCourses();
        dispatch(setCourses(allCourses));
      } else {
        const myCourses = await courseClient.findMyCourses();
        dispatch(setCourses(myCourses));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchEnrollments = async () => {
    try {
      const myCourses = await courseClient.findMyCourses();
      dispatch(
        setEnrollments(
          myCourses.map((c: any) => ({
            user: currentUser?._id,
            course: c._id,
          })),
        ),
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchEnrollments();
  }, [currentUser, enrolling]);

  const onAddNewCourse = async () => {
    const newCourse = await courseClient.createCourse(course);
    dispatch(setCourses([...courses, newCourse]));
  };

  const onDeleteCourse = async (courseId: string) => {
    await courseClient.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((c: any) => c._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    await courseClient.updateCourse(course);
    dispatch(
      setCourses(courses.map((c: any) => (c._id === course._id ? course : c))),
    );
  };

  const onEnroll = async (courseId: string) => {
    if (!currentUser) return;
    await enrollmentClient.enrollInCourse(currentUser._id, courseId);
    dispatch(addEnrollment({ user: currentUser._id, course: courseId }));
    await fetchCourses();
  };

  const onUnenroll = async (courseId: string) => {
    if (!currentUser) return;
    await enrollmentClient.unenrollFromCourse(currentUser._id, courseId);
    dispatch(removeEnrollment({ userId: currentUser._id, courseId }));
    await fetchCourses();
  };

  const handleCourseClick = (e: any, courseId: string) => {
    if (!isFaculty && !isEnrolled(courseId)) {
      e.preventDefault();
    }
  };

  return (
    <div id="wd-dashboard">
      <div className="d-flex align-items-center">
        <h1 id="wd-dashboard-title" className="flex-grow-1">
          Dashboard
        </h1>
        <Button
          variant={enrolling ? "primary" : "outline-primary"}
          onClick={() => setEnrolling(!enrolling)}
        >
          Enrollments
        </Button>
      </div>
      <hr />
      {isFaculty && (
        <>
          <h5>
            New Course
            <button
              onClick={onAddNewCourse}
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse}
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
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((c: any) => {
            const enrolled = isEnrolled(c._id);
            return (
              <Col
                key={c._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={`/courses/${c._id}/home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                    onClick={(e) => handleCourseClick(e, c._id)}
                  >
                    <CardImg
                      src="/images/reactjs.jpg"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <CardBody>
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {c.name}
                      </CardTitle>
                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {c.description}
                      </CardText>
                      <Button
                        variant="primary"
                        className="me-2"
                        onClick={(e) => e.preventDefault()}
                      >
                        Go
                      </Button>
                      {isFaculty && (
                        <>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              onDeleteCourse(c._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setCourse(c);
                            }}
                            className="btn btn-warning me-2 float-end"
                            id="wd-edit-course-click"
                          >
                            Edit
                          </button>
                        </>
                      )}
                      {enrolling &&
                        (enrolled ? (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              onUnenroll(c._id);
                            }}
                            className="btn btn-danger float-end"
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              onEnroll(c._id);
                            }}
                            className="btn btn-success float-end"
                          >
                            Enroll
                          </button>
                        ))}
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}
