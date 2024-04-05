import React from "react";
import { Alert, Container } from "react-bootstrap";

import "./Question.css"

function Question(){
    return <Container id="app-container">
        <div id="description">
            Test question
        </div>
        <div id="answer-wrapper">
            <Alert className="answer">Ans1</Alert>
            <Alert className="answer">Ans2</Alert>
            <Alert className="answer">Ans3</Alert>
            <Alert className="answer answer-correct">Ans4</Alert>
            <Alert className="answer answer-wrong">Ans3</Alert>
            <Alert className="answer answer-selected">Ans4</Alert>
            <div id="timer">
                --
            </div>
        </div>
    </Container>
}

export default Question;