/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Row, Col, FormControl, FormSelect } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { updateAssignment } from "../reducer";
import { useState } from "react";
import * as client from "../client";

export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );

  const assignment = assignments.find((a: any) => a._id === aid);

  const [editedAssignment, setEditedAssignment] = useState({ ...assignment });

  if (!assignment) return null;

  const save = async () => {
    const updated = await client.updateAssignment(editedAssignment);
    dispatch(updateAssignment(updated));
    router.push(`/courses/${cid}/assignments`);
  };

  const cancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor">
      <Row>
        <Col xs={2}></Col>

        <Col xs={8}>
          <label className="pb-2 pt-2">Assignment Name</label>
          <FormControl
            value={editedAssignment.title}
            onChange={(e) =>
              setEditedAssignment({
                ...editedAssignment,
                title: e.target.value,
              })
            }
            className="mb-4"
            style={{ maxWidth: "600px" }}
          />

          <FormControl
            as="textarea"
            rows={10}
            value={editedAssignment.description}
            onChange={(e) =>
              setEditedAssignment({
                ...editedAssignment,
                description: e.target.value,
              })
            }
            className="mb-4"
            style={{ maxWidth: "600px" }}
          />
        </Col>

        <Col xs={2}></Col>
      </Row>

      <Row>
        <Col xs={4}>
          <label className="text-end w-100">Points</label>
        </Col>

        <Col xs={8}>
          <FormControl
            type="number"
            value={editedAssignment.points}
            onChange={(e) =>
              setEditedAssignment({
                ...editedAssignment,
                points: Number(e.target.value),
              })
            }
            className="mb-4"
            style={{ maxWidth: "380px" }}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={4}>
          <label className="text-end w-100">Assignment Group</label>
        </Col>

        <Col xs={8}>
          <FormSelect
            defaultValue="ASSIGNMENTS"
            className="mb-4"
            style={{ maxWidth: "380px" }}
          >
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </FormSelect>
        </Col>
      </Row>

      <Row>
        <Col xs={4}>
          <div className="text-end w-100">Assign</div>
        </Col>

        <Col xs={8}>
          <label className="fw-bold">Due</label>
          <input
            className="form-control mb-4"
            type="datetime-local"
            value={editedAssignment.due_date}
            onChange={(e) =>
              setEditedAssignment({
                ...editedAssignment,
                due_date: e.target.value,
              })
            }
            style={{ maxWidth: "380px" }}
          />

          <Row>
            <Col xs={3}>
              <label className="fw-bold">Available from</label>
              <input
                className="form-control mb-4"
                type="datetime-local"
                value={editedAssignment.available_date}
                onChange={(e) =>
                  setEditedAssignment({
                    ...editedAssignment,
                    available_date: e.target.value,
                  })
                }
                style={{ maxWidth: "180px" }}
              />
            </Col>

            <Col xs={8}>
              <label className="fw-bold">Until</label>
              <input
                className="form-control mb-4"
                type="datetime-local"
                value={editedAssignment.due_date}
                onChange={(e) =>
                  setEditedAssignment({
                    ...editedAssignment,
                    due_date: e.target.value,
                  })
                }
                style={{ maxWidth: "180px" }}
              />
            </Col>
          </Row>

          <Row>
            <Col xs={3}></Col>

            <Col xs={8}>
              <button className="btn btn-secondary me-2" onClick={cancel}>
                Cancel
              </button>

              <button className="btn btn-danger" onClick={save}>
                Save
              </button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
