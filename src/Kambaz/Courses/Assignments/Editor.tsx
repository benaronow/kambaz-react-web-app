export const AssignmentEditor = () => {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description" cols={40} rows={10}>
        The assignment is available online. Submit a link to the landing page of
        your Web application running on Netlify. The landing page should include
        the following: Your full name and section, links to each of the lab
        assigments, link to the Kanbas application, links to all relevant source
        code repositories. The Kanbas should include a link to navigate back to
        the landing page.
      </textarea>
      <table>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select id="wd-group">
              <option selected value="ASSIGNMENTS">
                ASSIGNMENTS
              </option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-display-grade-as">Display Grade as</label>
          </td>
          <td>
            <select id="wd-display-grade-as">
              <option value="PERCENTAGE">Percentage</option>
              <option value="FRACTION">Fraction</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-submission-type">Submission Type</label>
          </td>
          <td>
            <select id="wd-submission-type">
              <option value="ONLINE">Online</option>
              <option value="IN_PERSON">In Person</option>
            </select>
          </td>
        </tr>
        <br />
        <tr>
          <td />
          <td>
            <span>Online Entry Options</span>
            <br />
            <input type="checkbox" name="check-entry" id="wd-text-entry" />
            <label htmlFor="wd-text-entry">Text Entry</label>
            <br />
            <input type="checkbox" name="check-entry" id="wd-website-url" />
            <label htmlFor="wd-website-url">Website URL</label>
            <br />
            <input
              type="checkbox"
              name="check-entry"
              id="wd-media-recordings"
            />
            <label htmlFor="wd-media-recordings">Media Recordings</label>
            <br />
            <input
              type="checkbox"
              name="check-entry"
              id="wd-student-annotation"
            />
            <label htmlFor="wd-student-annotation">Student Annotation</label>
            <br />
            <input type="checkbox" name="check-entry" id="wd-file-upload" />
            <label htmlFor="wd-file-upload">File Upload</label>
          </td>
        </tr>
        <br />
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-assign-to">Assign</label>
          </td>
          <td>
            <label htmlFor="wd-assign-to">Assign to</label>
            <br />
            <input id="wd-assign-to" defaultValue={"Everyone"}></input>
          </td>
        </tr>
        <br />
        <tr>
          <td />
          <td>
            <label htmlFor="wd-due-date">Due</label>
            <br />
            <input
              type="date"
              defaultValue="2024-05-13"
              id="wd-due-date"
            ></input>
          </td>
        </tr>
        <br />
        <tr>
          <td />
          <td>
            <label htmlFor="wd-available-from">Available from</label>
            <br />
            <input
              type="date"
              defaultValue="2024-05-06"
              id="wd-available-from"
            ></input>
          </td>
          <td>
            <label htmlFor="wd-available-until">Until</label>
            <br />
            <input
              type="date"
              defaultValue="2024-05-20"
              id="wd-available-until"
            ></input>
          </td>
        </tr>
      </table>
      <hr />
      <div style={{ display: "flex", justifyContent: "right" }}>
        <button>Cancel</button>
        <button type="submit">Save</button>
      </div>
    </div>
  );
};
