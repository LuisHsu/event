import { useEffect, useState } from "react";
import { Container, Table, Button, Badge, Dropdown, Form, ButtonGroup, InputGroup} from "react-bootstrap";
import { get_questions } from "./question";
import { Cast, CheckLg, PlusLg, Shuffle, XCircle } from "react-bootstrap-icons";

import "./Question.css"

function Question(){

    const [question_list, setQuestionList] = useState([]);

    useEffect(() => {
        get_questions().then(setQuestionList)
    }, []);

    return <Container className="content">
        <h3>Questions</h3>
        <div id="btns-wrap">
            <div id="filter-wrap">
                <Dropdown>
                    <Dropdown.Toggle variant="outline-secondary">
                        Dropdown Button
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>Action</Dropdown.Item>
                        <Dropdown.Item>Another action</Dropdown.Item>
                        <Dropdown.Item>Something else</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Check type="switch" label="Unused only"/>
            </div>
            <Button variant="secondary"><Shuffle/> Random</Button>
            <Dropdown as={ButtonGroup} autoClose="outside" align="end">
                <Button variant="primary">Show category</Button>
                <Dropdown.Toggle split variant="primary"/>
                <Dropdown.Menu>
                    <Dropdown.Item as={InputGroup}>Action</Dropdown.Item>
                    <Dropdown.Item as={InputGroup}>Another action</Dropdown.Item>
                    <Dropdown.Item as={InputGroup}>Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary"><Cast/> Display</Button>
            <Button variant="success"><PlusLg/> Add question</Button>
        </div> 
        <Table id="question-table">
            <thead><tr>
                <th>ID</th>
                <th>Category</th>
                <th>Question</th>
                <th>Answers</th>
                <th>Used</th>
                <th>Actions</th>
            </tr></thead>
            <tbody>
                {question_list.map(question => <tr key={question.id}>
                    <td>{question.id}</td>
                    <td>{question.category}</td>
                    <td>{question.question}</td>
                    <td>{question.answers.map((answer, index) =>
                        <Badge className="answer"
                            bg={(index === question.answer_index) ? "info" :"secondary"}
                        >
                            {answer}
                        </Badge>
                    )}</td>
                    <td>{question.used ? <CheckLg color="var(--bs-primary)"/> : null}</td>
                    <td>
                        <Button variant="link"><XCircle color="var(--bs-danger)"/></Button>
                    </td>
                </tr>)}
            </tbody>
        </Table>
    </Container>
}

export default Question;