import { Button, Container } from "react-bootstrap";

import "./Panel.css"
import { useEffect, useState } from "react";
import { regist_handler, submit_answer } from "./socket";

function Panel({id, name}){

    const [choice, setChoice] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [question, setQuestion] = useState({});
    const [speaker, setSpeaker] = useState(false);
    const [score, setScore] = useState(null);

    useEffect(() => {
        regist_handler("show_question", question => {
            setDisabled(false);
            setQuestion(question);
            setChoice(null);
        });
        regist_handler("set_speaker", (speaker_id) => {
            setSpeaker(speaker_id !== null && speaker_id === id);
        });
        regist_handler("update_score", setScore);
    }, [id])

    const onSubmitAnswer = () => {
        submit_answer(choice);
        setDisabled(true);
    }

    return <Container id="main-panel">
        <h3>Hello, {name}</h3>
        <h3>Score: {score !== null && score}</h3>
        <div id="choice-wrap">
            {speaker && <h2>You're speaker!</h2>}
            {!speaker && question.answers && question.answers.map((answer, index) => 
                <Button key={index}
                    className={`choice-btn${
                        ((answer !== null) && (choice === index)) ? " choice-active" : ""
                    }`}
                    size="lg"
                    variant="outline-primary"
                    onClick={setChoice.bind(this, index)}
                    disabled={disabled}
                >
                    {answer}
                </Button>
            )}
        </div>
        {!speaker &&
            <Button variant="success" className="submit-btn" disabled={disabled} onClick={onSubmitAnswer}>
                Submit
            </Button>
        }
    </Container>
}

export default Panel;