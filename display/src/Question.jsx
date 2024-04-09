import React, { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { ipcRenderer } from "electron";

import "./Question.css"
import Timer from "./Timer.jsx";
import { regist_handler, send } from "./socket.js";

function Question(){

    const [choice, setChoice] = useState(null);
    const [question, setQuestion] = useState({});
    const [time, setTime] = useState(null);
    const [reveal, setReveal] = useState(false);
    const [submits, setSubmits] = useState([]);

    regist_handler("show_question", (data) => {
        setReveal(false);
        setQuestion(data);
        setChoice(null);
    });
    regist_handler("show_answer", (data) => {
        setSubmits(data);
        setReveal(true);
    });
    regist_handler("set_timer", setTime);
    regist_handler("show_choice", setChoice);
    regist_handler("clear_timer", setTime.bind(this, null));

    useEffect(() => {
        send("get_question");
    }, [])

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

    return <Container className="app-container">
        <div id="description">
            {question.question}
        </div>
        <div id="answer-wrapper">
            {question.answers && question.answers.map((answer, index) => 
                <Alert key={index} className={`answer${choice_class(index)}`}>
                    {answer} {submits[index] && <>({submits[index]})</>}
                </Alert>
            )}
            <Timer time={time} setTime={setTime}/>
        </div>
    </Container>
}

export default Question;