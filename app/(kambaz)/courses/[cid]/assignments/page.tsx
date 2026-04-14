/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Button,
  FormControl,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FaPlus, FaMagnifyingGlass } from "react-icons/fa6";
import { GoTriangleDown } from "react-icons/go";
import { LuClipboardPenLine } from "react-icons/lu";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import { BsGripVertical, BsPlus } from "react-icons/bs";
import LessonControlButtons from "../modules/lesson-control-buttons";
import { IoEllipsisVertical } from "react-icons/io5";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { FaTrash } from "react-icons/fa";
import * as client from "./client";
import { setAssignments, deleteAssignment } from "./reducer";
import { useEffect } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const fetchAssignments = async () => {
    const data = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(data));
  };
  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const removeAssignment = async (assignmentId: string) => {
    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex align-items-center mb-3">
        <InputGroup className="flex-grow-1 me-3">
          <InputGroupText>
            <FaMagnifyingGlass />
          </InputGroupText>
          <FormControl placeholder="Search..." />
        </InputGroup>

        <div className="ms-auto d-flex flex-nowrap">
          {isFaculty && (
            <>
              <Button variant="secondary" size="lg" className="me-2">
                <FaPlus className="me-2" />
                Group
              </Button>

              <Link href={`/courses/${cid}/assignments/new`}>
                <Button variant="danger" size="lg">
                  <FaPlus className="me-2" />
                  Assignment
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      <ListGroup className="rounded-0">
        <ListGroupItem className="p-0 mb-5 fs-5 border-gray">
          <div className="p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <GoTriangleDown className="me-2" />
            <span className="fw-bold">ASSIGNMENTS</span>

            <div className="float-end">
              40% of Total
              {isFaculty && <BsPlus className="ms-2 fs-4" />}
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ListGroup className="rounded-0">
            {assignments
              .map((assignment: any) => (
                <ListGroupItem
                  key={assignment._id}
                  className="p-3 d-flex align-items-start"
                >
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

                    <span className="text-muted small">
                      <span className="fw-bold">Due</span> {assignment.dueDate}{" "}
                      | {assignment.points} pts
                    </span>
                  </div>

                  {isFaculty && (
                    <div className="float-end d-flex align-items-center">
                      <FaTrash
                        className="text-secondary fs-5 ms-2"
                        role="button"
                        onClick={async (e) => {
                          e.preventDefault();
                          if (
                            confirm(
                              "Are you sure you want to delete this assignment?",
                            )
                          ) {
                            await removeAssignment(assignment._id);
                          }
                        }}
                      />
                      <LessonControlButtons />
                    </div>
                  )}
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
