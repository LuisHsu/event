import {useState} from "react"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"

import './App.css';
import Control from "./Control";
import Guests from "./Guests"
import Question from "./Question.jsx";

function App() {

  const [page, setPage] = useState("control");

  const navigatePage = (key) => {
    setPage(key);
  }

  const pageMap = {
    "control": <Control />,
    "guest": <Guests />,
    "question": <Question />
  }

  return (
    <div className="App">
      <Navbar id="navbar" bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Host panel</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="underline" activeKey={page}>
              <Nav.Item>
                <Nav.Link eventKey="control" onClick={navigatePage.bind(this, "control")}>Control</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="guest" onClick={navigatePage.bind(this, "guest")}>Guests</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="question" onClick={navigatePage.bind(this, "question")}>Questions</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {pageMap[page]}

    </div>
  );
}

export default App;
