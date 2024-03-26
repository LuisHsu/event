import {useState} from "react"
import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"

import { display_url } from "./socket"
import URLTable from "./URLTable"

function Control(){

    const [url, setUrl] = useState("")
    const [url_list, setUrlList] = useState([])

    const onDisplayUrl = () => {
        display_url(url);
    }
    const onSaveUrl = () => {
        setUrlList([...url_list, url]);
    }

    return (
        <Container className="content">
            <InputGroup className="mb-3">
                <Form.Control type="text" placeholder="URL to display"
                    value={url} onChange={(e) => setUrl(e.target.value)}
                />
                <Button variant="primary" onClick={onDisplayUrl}>display</Button>
                <Button variant="secondary" onClick={onSaveUrl}>save</Button>
            </InputGroup>
            <Container><Row>
                <Col>
                    <URLTable list={url_list}/>
                </Col>
                <Col>
                    <h3>Timer &amp; Poll</h3>
                </Col>
            </Row></Container>
        </Container>
    )
}

export default Control;