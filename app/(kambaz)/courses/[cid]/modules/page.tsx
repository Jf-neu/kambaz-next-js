export default function Modules() {
  return (
    <div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      <div id="wd-module-buttons">
        <button>Collapse All</button> <button>View Progress</button>
        <select id="wd-select-one-module-publish">
          <option selected value="0">
            Publish All
          </option>
          <option value="1">Publish Module 1</option>
          <option value="2">Publish Module 2</option>
          <option value="3">Publish Module 3</option>
        </select>
        <button>+ Module</button>
      </div>
      <ul id="wd-modules">
        <li className="wd-module">
          <div className="wd-title">
            Week 1 - Lecture 1 - Building React User Interfaces
          </div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">Introduction to the course</li>
                <li className="wd-content-item">
                  Learn what is Web Development
                </li>
              </ul>
            </li>
            <li className="wd-reading">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Developing Full Stack Next.js Web Applications - Chapter 1 -
                  Building React User Interfaces with HTML
                </li>
              </ul>
            </li>
            <li className="wd-slides">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Introduction to Web Development
                </li>
                <li className="wd-content-item">Installing Node.js</li>
                <li className="wd-content-item">
                  Creating a Next.js React Application
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">
            Week 1 - Lecture 2 - Getting Started with Assignment 1 Lab Exercises
          </div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Learn how to create user interfaces with HTML
                </li>
                <li className="wd-content-item">
                  Get started on Assignment 1 Lab exercises
                </li>
                <li className="wd-content-item">
                  Deploy the assignment to Vercel
                </li>
              </ul>
            </li>
            <li className="wd-reading">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Developing Full Stack Next.js Web Applications - Chapter 1 -
                  Building React User Interfaces with HTML
                </li>
              </ul>
            </li>
            <li className="wd-slides">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Introduction to HTML and the DOM
                </li>
                <li className="wd-content-item">
                  Formatting Web content with Headings and Paragraphs
                </li>
                <li className="wd-content-item">
                  Formatting content with Lists and Tables
                </li>
                <li className="wd-content-item">Creating Web Forms</li>
              </ul>
            </li>
          </ul>
        </li>
        <li className="wd-module">
          <div className="wd-title">
            Week 1 - Lecture 3 - Getting Started with the Kambaz Web Application
          </div>
          <ul className="wd-lessons">
            <li className="wd-lesson">
              <span className="wd-title">LEARNING OBJECTIVES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Learn how to create user interfaces with HTML
                </li>
                <li className="wd-content-item">
                  Start implementing the Kambaz Web Application
                </li>
                <li className="wd-content-item">Update Vercel deployment</li>
              </ul>
            </li>
            <li className="wd-reading">
              <span className="wd-title">READING</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Developing Full Stack Next.js Web Applications - Chapter 1 -
                  Building React User Interfaces with HTML
                </li>
              </ul>
            </li>
            <li className="wd-slides">
              <span className="wd-title">SLIDES</span>
              <ul className="wd-content">
                <li className="wd-content-item">
                  Implementing the Kambaz Account Screens
                </li>
                <li className="wd-content-item">
                  Implementing the Kambaz Dashboard Screen
                </li>
                <li className="wd-content-item">
                  Implementing the Kambaz Courses Screen
                </li>
                <li className="wd-content-item">
                  Implementing the Kambaz Modules Screen
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
}
