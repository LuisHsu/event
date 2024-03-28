import { Button, Form } from "react-bootstrap";

import "./Login.css"
import { useState } from "react";
import {http_server} from "./constants.mjs"

function login(id, username){
    return fetch(`${http_server}/login`, {
        method: "POST",
        mode: "cors",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({id, username})
    })
    .then(res => res.json())
}

function Login({onLogin}){

    const [username, setUsername] = useState("");
    const [is_valid, setIsValid] = useState(true);
    const ticket_id = window.location.href.split("/").pop()
    const onLoginSubmit = (e) => {
        e.preventDefault()
        if(username !== ""){
            login(ticket_id, username)
            .then(data => {
                if(data === null){
                    setIsValid(false);
                }else{
                    onLogin(data.id, data.name);
                }
            })
        }
    }

    return <Form id="login-form" noValidate onSubmit={onLoginSubmit}>
        <Form.Group className="mb-3" >
            <Form.Label>Ticket ID</Form.Label>
            <Form.Control type="text" value={ticket_id} readOnly disabled
                isInvalid={!is_valid}
            />
            <Form.Control.Feedback type="invalid">
                Invalid ticket ID
            </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" >
            <Form.Label>Display name</Form.Label>
            <Form.Control type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="input your display name"
                isInvalid={username === ""}
            />
            <Form.Control.Feedback type="invalid">
                Display name is required
            </Form.Control.Feedback>
        </Form.Group>
        <Button id="login-button" variant="primary" type="submit">Enter</Button>
    </Form>
}

export default Login;