import React, { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { ipcRenderer } from "electron";

import "./Question.css"
import Timer from "./Timer.jsx";
import { regist_handler, send } from "./socket.js";

function Question(){

    const [question, setQuestion] = useState({});
    const [time, setTime] = useState(null);

    useEffect(() => {
        regist_handler("show_question", setQuestion);
        regist_handler("set_timer", setTime);
        regist_handler("clear_timer", setTime.bind(this, null));
        send("get_question");
    }, []);

    return <Container id="app-container">
        <div id="description">
            {question.question}
        </div>
        <div id="answer-wrapper">
            {question.answers && question.answers.map((answer, index) => 
                <Alert key={index} className="answer">
                    {answer}
                </Alert>
            )}
            <Timer time={time} setTime={setTime}/>
        </div>
    </Container>
}

export default Question;