import { useEffect, useState } from "react";
import { Container, Table, Button, Badge, Dropdown, Form, ButtonGroup} from "react-bootstrap";
import { add_question, delete_question, edit_question, get_questions } from "./question";
import { Cast, CheckLg, PencilSquare, PlusLg, Shuffle, XCircle, XLg } from "react-bootstrap-icons";

import "./Question.css"
import QuestionModal from "./QuestionModal";

function Question(){

    const [question_list, setQuestionList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [show_add, setShowAdd] = useState(false);
    const [show_edit, setShowEdit] = useState(false);
    const [edit_init, setEditInit] = useState({});
    const [filter_cate, setFilter_cate] = useState(null);

    const get_question_list = () => {
        get_questions().then(questions => {
        setQuestionList(questions);
        setCategories([...new Set(questions.map(question => question.category))])
    })}

    useEffect(() => {
        get_question_list();
    }, []);

    const onShowClose = () => {
        setShowAdd(false);
        setShowEdit(false);
    }

    const onAddQuestion = (value) => {
        add_question(value).then(get_question_list)
    }

    const onEditQuestion = (id, value) => {
        edit_question({...value, id}).then(get_question_list)
    }

    const onDeleteQuestion = (id) => {
        delete_question(id).then(get_question_list)
    }

    return <Container className="content">
        <h3>Questions</h3>
        <div id="btns-wrap">
            <div id="filter-wrap">
                <Dropdown onSelect={setFilter_cate.bind(this)}>
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
                {question_list.filter(question => (
                    filter_cate === null || question.category === filter_cate
                ))
                .map(question => <tr key={question.id}>
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
                            <Button variant="link"
                                onClick={() => {
                                    setEditInit(question);
                                    setShowEdit(true);
                                }}
                            ><PencilSquare color="var(--bs-primary)"/></Button>
                            <Button variant="link"
                                onClick={onDeleteQuestion.bind(this, question.id)}
                            ><XCircle color="var(--bs-danger)"/></Button>
                        </div>
                    </td>
                </tr>)}
            </tbody>
        </Table>
        <QuestionModal title="Add question"
            show={show_add} categories={categories}
            onClose={onShowClose} onSubmit={onAddQuestion}
        />
        {show_edit ? 
            <QuestionModal title="Edit question"
                show={true} categories={categories}
                init={edit_init}
                onClose={onShowClose} onSubmit={onEditQuestion.bind(this, edit_init.id)}
            /> : ""
        }
    </Container>
}

export default Question;