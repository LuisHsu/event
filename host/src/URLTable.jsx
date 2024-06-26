import ListGroup from "react-bootstrap/ListGroup"
import Button from "react-bootstrap/Button"
import {Cast, XLg} from "react-bootstrap-icons"

import "./URLTable.css"
import { display_url } from "./socket"

function URLTable({list, onRemove}){
    return <>
        <h4>Saved URL</h4>
        <ListGroup>
            {list.map((url, index) => <ListGroup.Item key={index} className="url-item">
                <b className="url-name">{url}</b>
                <Button variant="link" onClick={display_url.bind(this, url)}><Cast /></Button>
                <Button variant="link" onClick={onRemove.bind(this, index)}><XLg /></Button>
            </ListGroup.Item>)}
        </ListGroup>
    </>
}
export default URLTable;