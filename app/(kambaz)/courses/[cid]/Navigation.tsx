"use client";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";

export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams();
  const links = [
    { label: "Home", path: "/home" },
    { label: "Modules", path: "/modules" },
    { label: "Piazza", path: "/piazza" },
    { label: "Zoom", path: "/zoom" },
    { label: "Assignments", path: "/assignments" },
    { label: "Quizzes", path: "/quizzes" },
    { label: "Grades", path: "/grades" },
    { label: "People", path: "/people/table" },
  ];

  return (
    <ListGroup
      id="wd-courses-navigation"
      className="wd list-group fs-5 rounded-0"
    >
      {links.map((link) => (
        <ListGroupItem
          key={link.path}
          as={Link}
          href={`/courses/${cid}${link.path}`}
          className={`list-group-item border-0
            ${pathname.includes(link.path) ? "active" : "text-danger"}`}
        >
          {link.label}
        </ListGroupItem>
      ))}
    </ListGroup>
  );
}

