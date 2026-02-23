/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Button,
  FormControl,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GoTriangleDown } from "react-icons/go";
import { LuClipboardPenLine } from "react-icons/lu";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import LessonControlButtons from "../modules/lesson-control-buttons";
import { IoEllipsisVertical } from "react-icons/io5";
import Link from "next/link";
import * as db from "../../../database";
import { useParams } from "next/navigation";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
  return (
    <div id="wd-assignments">
      <div
        id="wd-assignments-controls"
        className="d-flex align-items-center mb-3"
      >
        <InputGroup id="wd-search-assignment" className="flex-grow-1 me-3">
          <InputGroupText>
            <FaMagnifyingGlass />
          </InputGroupText>
          <FormControl placeholder="Search..." />
        </InputGroup>

        <div className="ms-auto d-flex flex-nowrap">
          <Button
            variant="secondary"
            size="lg"
            className="me-2"
            style={{ width: "140px" }}
          >
            <FaPlus className="me-2" />
            Group
          </Button>

          <Button variant="danger" size="lg" style={{ width: "200px" }}>
            <FaPlus className="me-2" />
            Assignment
          </Button>
        </div>
      </div>
      <br />

      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <GoTriangleDown className="me-2" />
            <span className="fw-bold">ASSIGNMENTS</span>
            <div className="float-end">
              40% of Total
              <BsPlus className="ms-2 fs-4" />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ListGroup className="wd-lessons rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <ListGroup
                  className="wd-lessons rounded-0"
                  key={assignment._id}
                >
                  <ListGroupItem className="wd-lesson p-3 d-flex align-items-start">
                    <div className="me-3 d-flex align-items-center">
                      <BsGripVertical className="fs-3 me-2" />
                      <LuClipboardPenLine className="text-success" />
                    </div>

                    <div className="flex-grow-1">
                      <Link
                        href={`/courses/${cid}/assignments/${assignment._id}`}
                        className="text-decoration-none text-dark"
                      >
                        <div className="fw-bold">{assignment.title}</div>
                      </Link>

                      <span className="text-danger small">
                        Multiple Modules{" "}
                      </span>

                      <span className="text-muted small">
                        | <span className="fw-bold">Not available until</span>{" "}
                        Jan 10 at 12:00 AM | <br />
                        <span className="fw-bold">Due</span> Jan 25 at 11:59 PM
                        | 309 pts
                      </span>
                    </div>
                    <LessonControlButtons />
                  </ListGroupItem>
                </ListGroup>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
