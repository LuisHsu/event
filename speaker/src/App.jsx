import { Alert, Button, Container } from "react-bootstrap";
import { useState } from "react";

import "./App.css"
import Timer from "./Timer";

function App(){

    // const [question, setQuestion] = useState({});
    const [time, setTime] = useState(null);

    // useEffect(() => {
    //     regist_handler("show_question", setQuestion);
    //     regist_handler("set_timer", setTime);
    //     regist_handler("clear_timer", setTime.bind(this, null));
    //     send("get_question");
    // }, []);

    return <Container id="app-container">
        <h3>Hello, aaa</h3>
        <div id="description">
            Test question
        </div>
        <div id="answer-wrapper">
            <Alert className="answer">
                A
            </Alert>
            <Alert className="answer">
                B
            </Alert>
            <Alert className="answer">
                C
            </Alert>
            {/* {question.answers && question.answers.map((answer, index) => 
                <Alert key={index} className="answer">
                    {answer}
                </Alert>
            )}*/}
            <Timer time={time} setTime={setTime}/>
            
        </div>
        <Button id="submit-button">Submit</Button>
    </Container>
}

export default App;