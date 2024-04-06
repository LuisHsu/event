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
    const [reveal, setReveal] = useState(false);

    useEffect(() => {
        regist_handler("start_question", question => {
            setReveal(false);
            setDisabled(false);
            setQuestion(question);
            setChoice(null);
        });
        regist_handler("set_speaker", (speaker_id) => {
            setSpeaker(speaker_id !== null && speaker_id === id);
        });
        regist_handler("end_question", () => {
            setReveal(true);
        });
        regist_handler("update_score", setScore);
    }, [id])

    const onSubmitAnswer = () => {
        submit_answer(choice);
        setDisabled(true);
    }

    function choice_class(index){
        if(reveal){
            if(index === question.answer_index){
                return " choice-correct";
            }else if(index === choice){
                return " choice-wrong";
            }
        }else if(choice !== null && index === choice){
            return " choice-active";
        }
        return "";
    }

    return <Container id="main-panel">
        <h3>Hello, {name}</h3>
        <h3>Score: {score !== null && score}</h3>
        <div id="choice-wrap">
            {speaker && <h2>You're speaker!</h2>}
            {!speaker && question.answers && question.answers.map((answer, index) => 
                <Button key={index}
                    className={`choice-btn${choice_class(index)}`}
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