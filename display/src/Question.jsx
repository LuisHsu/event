import React, { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { ipcRenderer } from "electron";

import "./Question.css"
import Timer from "./Timer.jsx";
import { regist_handler, send } from "./socket.js";

function Question(){

    const [question, setQuestion] = useState({});
    const [time, setTime] = useState(null);
    const [answer_index, setAnswerIndex] = useState(null);

    regist_handler("show_question", (data) => {
        setAnswerIndex(null);
        setQuestion(data);
    });
    regist_handler("show_answer", () => {
        setAnswerIndex(question.answer_index);
    });
    regist_handler("set_timer", setTime);
    regist_handler("clear_timer", setTime.bind(this, null));

    useEffect(() => {
        send("get_question");
    }, [])

    return <Container className="app-container">
        <div id="description">
            {question.question}
        </div>
        <div id="answer-wrapper">
            {question.answers && question.answers.map((answer, index) => 
                <Alert key={index} className={`answer${
                    (answer_index !== null) ? (
                        (index === answer_index) ? " answer-correct" : ""
                    ) : ""
                }`}>
                    {answer}
                </Alert>
            )}
            <Timer time={time} setTime={setTime}/>
        </div>
    </Container>
}

export default Question;