"use client"
import { Row, Col, FormControl, FormSelect } from "react-bootstrap";
import { redirect, useParams } from "next/navigation";
import * as db from "../../../../database";

export default function AssignmentEditor() {
  const { aid } = useParams();
  const assignments = db.assignments;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const assignment = assignments.find((assignment: any) => assignment._id === aid)

  if (assignment === null) {
    redirect("/not_found");
  }

  return (
    <div id="wd-assignments-editor">
      <Row>
        <Col xs={2}></Col>
        <Col xs={8}>
          <label htmlFor="wd-name" className="pb-2 pt-2">
            Assignment Name
          </label>
          <FormControl
            id="wd-name"
            placeholder="assignment name"
            defaultValue={aid}
            className="mb-4"
            style={{ maxWidth: "600px" }}
          />
          <FormControl
            id="wd-description"
            as="textarea"
            rows={10}
            style={{ maxWidth: "600px" }}
            className="mb-4"
            defaultValue={`The assignment is available online Submit a link to the landing page of`}
          />
        </Col>
        <Col xs={2}></Col>
      </Row>

      <Row>
        <Col xs={4}>
          <label htmlFor="wd-points" className="text-end w-100">
            Points
          </label>
        </Col>
        <Col xs={8}>
          <FormControl
            id="wd-points"
            defaultValue={100}
            type="number"
            className="mb-4"
            style={{ maxWidth: "380px" }}
          />
        </Col>
      </Row>

      <Row>
        <Col xs={4}>
          <label htmlFor="wd-assignment-group" className="text-end w-100">
            Assignment Group
          </label>
        </Col>
        <Col xs={8}>
          <FormSelect
            id="wd-select-one-assignment"
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
          <label htmlFor="wd-grade-display" className="text-end w-100">
            Display Grade as
          </label>
        </Col>
        <Col xs={8}>
          <FormSelect
            id="wd-select-one-grade"
            defaultValue="PERCENTAGE"
            className="mb-4"
            style={{ maxWidth: "380px" }}
          >
            <option value="PERCENTAGE">Percentage</option>
            <option value="LETTER">Letter</option>
            <option value="FLOAT">Float</option>
            <option value="FRACTION">Fraction</option>
          </FormSelect>
        </Col>
      </Row>

      <Row>
        <Col xs={4}>
          <div className="text-end w-100">Submission Type</div>
        </Col>
        <Col xs={8}>
          <FormSelect
            id="wd-select-one-submission"
            defaultValue="ONLINE"
            className="mb-4"
            style={{ maxWidth: "380px" }}
          >
            <option value="ONLINE">Online</option>
            <option value="OFFLINE">In-person</option>
          </FormSelect>
          <span className="fw-bold">Online Entry Options</span>
          <div
            className="form-check mb-4"
            id="wd-chkbox-text-entry"
            style={{ maxWidth: "380px" }}
          >
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-chkbox-text-entry"
            />
            <label className="form-check-label" htmlFor="wd-chkbox-text-entry">
              Text Entry
            </label>
          </div>
          <div
            className="form-check mb-4"
            id="wd-chkbox-url"
            style={{ maxWidth: "380px" }}
          >
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-chkbox-url"
            />
            <label className="form-check-label" htmlFor="wd-chkbox-text-entry">
              Website URL
            </label>
          </div>
          <div
            className="form-check mb-4"
            id="wd-chkbox-recording"
            style={{ maxWidth: "380px" }}
          >
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-chkbox-recording"
            />
            <label className="form-check-label" htmlFor="wd-chkbox-text-entry">
              Media Recording
            </label>
          </div>
          <div
            className="form-check mb-4"
            id="wd-chkbox-recording"
            style={{ maxWidth: "380px" }}
          >
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-chkbox-annotation"
            />
            <label className="form-check-label" htmlFor="wd-chkbox-annotation">
              Student Annotation
            </label>
          </div>
          <div
            className="form-check mb-4"
            id="wd-chkbox-recording"
            style={{ maxWidth: "380px" }}
          >
            <input
              className="form-check-input"
              type="checkbox"
              id="wd-chkbox-file"
            />
            <label className="form-check-label" htmlFor="wd-chkbox-file">
              File Uploads
            </label>
          </div>
        </Col>
      </Row>

      <Row>
        <Col xs={4}>
          <div className="text-end w-100">Assign</div>
        </Col>
        <Col xs={8}>
          <label htmlFor="wd-assign-range" className="fw-bold">
            Assign to
          </label>
          <FormControl
            id="wd-assign-range"
            defaultValue={"Everyone"}
            className="mb-4"
            style={{ maxWidth: "380px" }}
          />
          <label htmlFor="wd-assign-date" className="fw-bold">
            Due
          </label>
          <div className="form-group">
            <input
              className="form-control mb-4"
              type="datetime-local"
              defaultValue="2026-02-09T23:59"
              id="wd-assign-date"
              style={{ maxWidth: "380px" }}
            />
          </div>

          <Row>
            <Col xs={3}>
              <label htmlFor="wd-assign-avail-from" className="fw-bold">
                Available from
              </label>
              <div className="form-group">
                <input
                  className="form-control mb-4"
                  type="datetime-local"
                  defaultValue="2026-02-01T00:00"
                  id="wd-assign-avail-from"
                  style={{ maxWidth: "180px" }}
                />
              </div>
            </Col>
            <Col xs={8}>
              <label htmlFor="wd-assign-avail-to" className="fw-bold">
                Until
              </label>
              <div className="form-group">
                <input
                  className="form-control mb-4"
                  type="datetime-local"
                  defaultValue="2026-02-10T23:59"
                  id="wd-assign-avail-to"
                  style={{ maxWidth: "180px" }}
                />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
