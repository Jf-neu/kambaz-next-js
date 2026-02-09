import { ListGroup, ListGroupItem } from "react-bootstrap";
import ModulesControls from "./modules-controls";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./module-control-buttons";
import LessonControlButtons from "./lesson-control-buttons";

export default function Modules() {
  return (
    <div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      <div>
        <ModulesControls />
        <br />
        <br />
        <br />
        <br />
        <ListGroup className="rounded-0" id="wd-modules">
          <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" />
              Week 1 - Lecture 1 - Building React User Interfaces <ModuleControlButtons />

            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Introduction to the course <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Learn what is Web Development <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                READING <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Developing Full Stack Next.js Web Applications - Chapter 1 -
                Building React User Interfaces with HTML <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                SLIDES <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Introduction to Web Development <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Installing Node.js <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Creating a Next.js React Application <LessonControlButtons />

              </ListGroupItem>
            </ListGroup>
          </ListGroupItem>
          <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" />
              Week 1 - Lecture 2 - Getting Started with Assignment 1 Lab
              Exercises <ModuleControlButtons />
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Learn how to create user interfaces with HTML <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Get started on Assignment 1 Lab exercises <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Deploy the assignment to Vercel <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                READING <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Developing Full Stack Next.js Web Applications - Chapter 1 -
                Building React User Interfaces with HTML <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                SLIDES <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Introduction to HTML and the DOM <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Formatting content with Lists and Tables <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Formatting Web content with Headings and Paragraphs <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Creating Web Forms <LessonControlButtons />

              </ListGroupItem>
            </ListGroup>
          </ListGroupItem>
          <ListGroupItem className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary"> <BsGripVertical className="me-2 fs-3" />
              Week 1 - Lecture 3 - Getting Started with the Kambaz Web
              Application <ModuleControlButtons />
            </div>
            <ListGroup className="wd-lessons rounded-0">
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                LEARNING OBJECTIVES <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Learn how to create user interfaces with HTML <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Start implementing the Kambaz Web Application <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Update Vercel deployment <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                READING <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Developing Full Stack Next.js Web Applications - Chapter 1 -
                Building React User Interfaces with HTML <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                SLIDES <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Implementing the Kambaz Account Screens <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Implementing the Kambaz Dashboard Screen <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Implementing the Kambaz Courses Screen <LessonControlButtons />

              </ListGroupItem>
              <ListGroupItem className="wd-lesson p-3 ps-1"> <BsGripVertical className="me-2 fs-3" />
                Implementing the Kambaz Modules Screen <LessonControlButtons />

              </ListGroupItem>
            </ListGroup>
          </ListGroupItem>
        </ListGroup>
      </div>
    </div>
  );
}
