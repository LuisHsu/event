import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"

import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand>Host panel</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav variant="underline" defaultActiveKey="display">
              <Nav.Item>
                <Nav.Link eventKey="display">Display</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="poll">Poll</Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    </div>
  );
}

export default App;
