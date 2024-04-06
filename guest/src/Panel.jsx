import { Button, Container } from "react-bootstrap";

import "./Panel.css"
import { useEffect, useState } from "react";
import { regist_handler } from "./socket";

function Panel({id, name}){

    const [choice, setChoice] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [question, setQuestion] = useState({});

    useEffect(() => {
        regist_handler("show_question", question => {
            setDisabled(false);
            setQuestion(question);
            setChoice(null);
        });
    }, [])

    return <Container id="main-panel">
        <h3>Hello, {name}</h3>
        <div id="choice-wrap">
            {question.answers && question.answers.map((answer, index) => 
                <Button key={index}
                    className="choice-btn" size="lg"
                    variant="outline-primary"
                    active={(answer !== null) && (choice === index)}
                    onClick={setChoice.bind(this, index)}
                    disabled={disabled}
                >
                    {answer}
                </Button>
            )}
        </div>
        <Button variant="success" className="submit-btn" disabled={disabled}>Submit</Button>
    </Container>
}

export default Panel;