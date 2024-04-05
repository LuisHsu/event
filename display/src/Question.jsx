import React, { useState, useEffect } from "react";
import { Alert, Container } from "react-bootstrap";
import { ipcRenderer } from "electron";

import "./Question.css"

function Question(){

    const [question, setQuestion] = useState({});

    ipcRenderer.on("show_question", (_, data) => setQuestion(data));

    useEffect(() => {
        ipcRenderer.send("get_question");
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
            <div id="timer">
                --
            </div>
        </div>
    </Container>
}

export default Question;