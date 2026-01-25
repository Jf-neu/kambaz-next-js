export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">
        <h2>Assignment Name</h2>
      </label>
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea
        id="wd-description"
        cols={50}
        rows={10}
        defaultValue={`The assignment is available online Submit a link to the landing page of`}
      ></textarea>
      <br />
      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assignment-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-select-one-genre" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECT">PROJECT</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-grade-display">Display Grade as</label>
            </td>
            <td>
              <select id="wd-select-one-genre" defaultValue="PERCENTAGE">
                <option value="PERCENTAGE">percentage</option>
                <option value="LETTER">letter</option>
                <option value="FLOAT">float</option>
                <option value="FRACTION">fraction</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-grade-display">Submission Type</label>
            </td>
            <td>
              <select id="wd-select-one-genre" defaultValue="ONLINE">
                <option value="ONLINE">online</option>
                <option value="OFFLINE">in-person</option>
              </select>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top"></td>
            <td>
              <label>Online Entry Options:</label>
              <br />
              <input
                type="checkbox"
                name="check-entry"
                id="wd-chkbox-text-entry"
              />
              <label htmlFor="wd-chkbox-text-entry">Text Entry</label>
              <br />

              <input type="checkbox" name="check-entry" id="wd-chkbox-url" />
              <label htmlFor="wd-chkbox-url">Website URL</label>
              <br />

              <input
                type="checkbox"
                name="check-entry"
                id="wd-chkbox-recording"
              />
              <label htmlFor="wd-chkbox-recording">Media Recording</label>
              <br />

              <input
                type="checkbox"
                name="check-entry"
                id="wd-chkbox-annotation"
              />
              <label htmlFor="wd-chkbox-annotation">Student Annotation</label>
              <br />

              <input type="checkbox" name="check-entry" id="wd-chkbox-file" />
              <label htmlFor="wd-chkbox-file">File Uploads</label>
            </td>
          </tr>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign">Assign</label>
            </td>
            <td>
              <label htmlFor="wd-assign-range">Assign to</label> <br />
              <input defaultValue="Everyone" id="wd-assign-range" /> <br />
              <label htmlFor="wd-assign-date">Due</label> <br />
              <input
                type="date"
                defaultValue="2026-01-31"
                id="wd-assign-date"
              />
              <br />
              <label htmlFor="wd-assign-avail-from">Available from</label>
              <input
                type="date"
                defaultValue="2026-01-25"
                id="wd-assign-avail-from"
              />
              <label htmlFor="wd-assign-avail-to">Until</label>
              <input
                type="date"
                defaultValue="2026-02-01"
                id="wd-assign-avail-to"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="form-actions">
        <button>Cancel</button>
        <button>Save</button>
      </div>
    </div>
  );
}
