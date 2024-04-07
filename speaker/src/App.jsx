import { Alert, Button, Container } from "react-bootstrap";
import { useEffect, useState } from "react";

import "./App.css"
import { regist_handler } from "./socket";

function App(){

    const [choice, setChoice] = useState(null);
    const [reveal, setReveal] = useState(false);
    const [question, setQuestion] = useState({});
    const [speaker, setSpeaker] = useState({});

    useEffect(() => {
        regist_handler("set_speaker", setSpeaker);
        regist_handler("start_question", question => {
            setReveal(false);
            setQuestion(question);
        });
    }, []);

    const onSubmitAnswer = () => {
        setReveal(true);
    }

    function choice_class(index){
        if(reveal){
            if(index === question.answer_index){
                return " answer-correct";
            }else if(index === choice){
                return " answer-wrong";
            }
        }else if(choice !== null && index === choice){
            return " answer-selected";
        }
        return "";
    }

    return <Container id="app-container">
        {speaker.name && <h3>Hello, {speaker.name}</h3>}
        <div id="description">
            {question.question}
        </div>
        <div id="answer-wrapper">
            {question.answers && question.answers.map((answer, index) => 
                <Alert key={index} className={`answer${choice_class(index)}`}
                    onClick={setChoice.bind(this, index)}
                >
                    {answer}
                </Alert>
            )}
        </div>
        <Button id="submit-button" onClick={onSubmitAnswer} disabled={reveal}>Submit</Button>
    </Container>
}

export default App;