import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Tab from 'react-bootstrap/Tab'
import Container from "react-bootstrap/Container"

function Control(){
    return (
        <Container className="content">
            <InputGroup className="mb-3">
            <Form.Control type="text" placeholder="URL to display" />
            <Button variant="primary">display</Button>
            <Button variant="danger">remove</Button>
            </InputGroup>
        </Container>
    )
}

export default Control;