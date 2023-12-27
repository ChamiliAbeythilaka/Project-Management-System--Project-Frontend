import React, { useState } from "react";
import "./Home.css";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

import Table from "react-bootstrap/Table";

export default function Home() {
  const [show, setShow] = useState(false);

  return (
    <div className="Home">
      <div className="Homeglass">
        <div className="conHom">
          <br />
          <h5>Assigned Task</h5>
          <br />

          {/* HomeTable  */}

          <div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Task</th>
                  <th>Employees</th>
                  <th>Dedline</th>
                  <th>DaysLeft</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Project 01</td>
                  <td>Task 0101</td>
                  <td>A.B.C.Perera</td>
                  <td>12/12/2022</td>
                  <td>2</td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
              

        <div className="alert">
          {/* Alert Icon */}
          <>
            <Alert className="alert" show={show} variant="success">
              <Alert.Heading>Notification</Alert.Heading>
              <p>You have been assigned to a new project.</p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => setShow(false)}
                  variant="outline-success"
                >
                  Ok
                </Button>
              </div>
            </Alert>

            {!show && (
              <button className="notification" onClick={() => setShow(true)}>
                <span class="material-icons">notifications</span>
                <span className="button-badge">2</span>
              </button>
            )}
          </>
        </div>
      </div>
    </div>
  );
}
