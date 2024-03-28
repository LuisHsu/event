import { Button, Container } from "react-bootstrap";

import "./Panel.css"
import { useState } from "react";

function Panel({id, name}){

    const [choice, setChoice] = useState(null)
    const [enabled, setEnabled] = useState(false)

    return <Container id="main-panel">
        <h3>Hello, {name}</h3>
        <div id="choice-wrap">
            {["a", "b", "c", "d", "e"].map((choice, index) => <Button key={index}
                className="choice-btn" size="lg"
                variant="outline-primary"
                active={(choice !== null) && (choice === index)}
                onClick={setChoice.bind(this, index)}
                disabled={!enabled}
            >
                {choice}
            </Button>)}
        </div>
        <Button variant="success" className="submit-btn" disabled={!enabled}>Submit</Button>
    </Container>
}

export default Panel;