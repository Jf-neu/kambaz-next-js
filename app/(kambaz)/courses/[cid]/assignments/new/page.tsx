"use client";

import { useState } from "react";
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addAssignment } from "../reducer";
import { useParams, useRouter } from "next/navigation";
import * as client from "../client";

export default function AssignmentEditor() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { cid } = useParams();

  const [assignment, setAssignment] = useState({
    title: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
    course: cid,
  });

  const saveAssignment = async () => {
    const newAssignment = await client.createAssignmentForCourse(
      cid as string,
      assignment,
    );
    dispatch(addAssignment(newAssignment));
    router.push(`/courses/${cid}/assignments`);
  };

  const cancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignment-editor" className="p-4">
      <FormGroup className="mb-3">
        <FormLabel>Name</FormLabel>
        <FormControl
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Description</FormLabel>
        <FormControl
          as="textarea"
          rows={3}
          value={assignment.description}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Points</FormLabel>
        <FormControl
          type="number"
          value={assignment.points}
          onChange={(e) =>
            setAssignment({ ...assignment, points: Number(e.target.value) })
          }
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Due Date</FormLabel>
        <FormControl
          type="date"
          value={assignment.dueDate}
          onChange={(e) =>
            setAssignment({ ...assignment, dueDate: e.target.value })
          }
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Available From</FormLabel>
        <FormControl
          type="date"
          value={assignment.availableFrom}
          onChange={(e) =>
            setAssignment({ ...assignment, availableFrom: e.target.value })
          }
        />
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel>Available Until</FormLabel>
        <FormControl
          type="date"
          value={assignment.availableUntil}
          onChange={(e) =>
            setAssignment({ ...assignment, availableUntil: e.target.value })
          }
        />
      </FormGroup>

      <Button variant="secondary" className="me-2" onClick={cancel}>
        Cancel
      </Button>

      <Button variant="danger" onClick={saveAssignment}>
        Save
      </Button>
    </div>
  );
}
