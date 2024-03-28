import { Button, Form } from "react-bootstrap";

import "./Login.css"
import { useState } from "react";
import { login } from "./socket";

function Login({onLogin, onLogout}){

    const [username, setUsername] = useState("");
    const [error, setError] = useState(null);
    const ticket_id = window.location.href.split("/").pop()
    const onLoginSubmit = (e) => {
        e.preventDefault()
        if(username !== ""){
            login(ticket_id, username, onLogin, onLogout)
            .catch((err) => {
                setError(err.message);
            })
        }
    }

    return <Form id="login-form" noValidate onSubmit={onLoginSubmit}>
        <Form.Group className="mb-3" >
            <Form.Label>Ticket ID</Form.Label>
            <Form.Control type="text" value={ticket_id} readOnly disabled
                isInvalid={error !== null}
            />
            <Form.Control.Feedback type="invalid">
                {error}
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