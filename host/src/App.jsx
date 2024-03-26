import {useState} from "react"
import Navbar from "react-bootstrap/Navbar"
import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './App.css';
import Control from "./Control";

function App() {

  const [page, setPage] = useState("control");

  const navigatePage = (key) => {
    setPage(key);
  }

  const pageMap = {
    "control": <Control />,
    "guest": <Container className="content">guest</Container>
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

      {/* <Tab.Container defaultActiveKey="control">
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>
            <Navbar.Brand>Host panel</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav variant="underline" >
                <Nav.Item>
                  <Nav.Link eventKey="control">Control</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="guest">Guests</Nav.Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <Tab.Content>
          <Control/>
          <Tab.Pane eventKey="guest">Guest</Tab.Pane>
        </Tab.Content>
      </Tab.Container> */}
    </div>
  );
}

export default App;
