import {useState} from "react"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"

import './App.css';
import Control from "./Control";
import Guests from "./Guests"

function App() {

  const [page, setPage] = useState("control");

  const navigatePage = (key) => {
    setPage(key);
  }

  const pageMap = {
    "control": <Control />,
    "guest": <Guests />
  }

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
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
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {pageMap[page]}

    </div>
  );
}

export default App;
