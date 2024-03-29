import { useEffect, useState } from "react";
import { Container, Table, Button, Badge, Dropdown, Form, ButtonGroup} from "react-bootstrap";
import { get_questions } from "./question";
import { Cast, CheckLg, PencilSquare, PlusLg, Shuffle, XCircle, XLg } from "react-bootstrap-icons";

import "./Question.css"
import QuestionModal from "./QuestionModal";

function Question(){

    const [question_list, setQuestionList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [show_add, setShowAdd] = useState(false);
    const [filter_cate, setFilter_cate] = useState(null);

    useEffect(() => {
        get_questions().then(questions => {
            setQuestionList(questions);
            setCategories([...new Set(questions.map(question => question.category))])
        })
    }, []);

    const onShowClose = () => {
        setShowAdd(false);
    }

    const onAddQuestion = (value) => {
        console.log(value)
    }

    const onFilterSelect = (cate) => {
        setFilter_cate(cate);
    }

    return <Container className="content">
        <h3>Questions</h3>
        <div id="btns-wrap">
            <div id="filter-wrap">
                <Dropdown onSelect={onFilterSelect}>
                    <Dropdown.Toggle variant="outline-secondary">
                        {(filter_cate === null) ? <i>All</i> : filter_cate}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item eventKey={null}><XLg/> Clear filter</Dropdown.Item>
                        <Dropdown.Divider />
                        {categories.map(cate => <Dropdown.Item key={cate} eventKey={cate}>{cate}</Dropdown.Item>)}
                    </Dropdown.Menu>
                </Dropdown>
                <Form.Check type="switch" label="Unused only"/>
            </div>
            <Button variant="secondary"><Shuffle/> Random</Button>
            <Dropdown as={ButtonGroup} autoClose="outside" align="end">
                <Button variant="primary"><Cast/> Display categories</Button>
                <Dropdown.Toggle split variant="primary"/>
                <Dropdown.Menu>
                    <Dropdown.Item>Action</Dropdown.Item>
                    <Dropdown.Item>Another action</Dropdown.Item>
                    <Dropdown.Item>Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Button variant="primary"><Cast/> Display question</Button>
            <Button variant="success" onClick={setShowAdd.bind(this, true)}><PlusLg/> Add question</Button>
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
                        <Badge className="answer" key={index}
                            bg={(index === question.answer_index) ? "info" :"secondary"}
                        >{answer}
                        </Badge>
                    )}</td>
                    <td>{question.used ? <CheckLg color="var(--bs-primary)"/> : null}</td>
                    <td>
                        <div className="action-wrap">
                            <Button variant="link"><PencilSquare color="var(--bs-primary)"/></Button>
                            <Button variant="link"><XCircle color="var(--bs-danger)"/></Button>
                        </div>
                    </td>
                </tr>)}
            </tbody>
        </Table>
        <QuestionModal title="Add question"
            show={show_add} categories={categories}
            onClose={onShowClose} onSubmit={onAddQuestion}
        />
    </Container>
}

export default Question;