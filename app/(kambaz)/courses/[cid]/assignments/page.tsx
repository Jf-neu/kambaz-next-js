import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input placeholder="Search for Assignments" id="wd-search-assignment" />
      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>
      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>{" "}
      </h3>
      <ul id="wd-assignment-list">
        <li className="wd-assignment-list-item">
          <Link
            href="/courses/1234/assignments/120"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML <br />
          </Link>
          Multiple Modules | <b>Not available until</b> Jan 10 at 12:00 AM
          <br />
          <b>Due</b> Jan 25 at 11:59 PM | 309 pts
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/courses/1234/assignments/121"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP <br />
          </Link>
          Multiple Modules | <b>Not available until</b> Jan 24 at 12:00 AM
          <br />
          <b>Due</b> Feb 8 at 11:59 PM | 396 pts
        </li>
        <li className="wd-assignment-list-item">
          <Link
            href="/courses/1234/assignments/122"
            className="wd-assignment-link"
          >
            A3 - JAVASCRIPT + REACT <br />
          </Link>
          Multiple Modules | <b>Not available until</b> Jan 7 at 12:00 AM
          <br />
          <b>Due</b> Feb 22 at 11:59 PM | 198 pts
        </li>
      </ul>
    </div>
  );
}
