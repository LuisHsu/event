import { useEffect, useState } from "react";
import { Container, Table, Button, Badge, Dropdown, Form, ButtonGroup, InputGroup} from "react-bootstrap";
import { add_question, delete_question, edit_question, get_questions } from "./question";
import { ArrowCounterclockwise, Cast, CheckLg, PencilSquare, PlayCircle, PlusLg, Shuffle, StopCircle, XCircle, XLg } from "react-bootstrap-icons";

import "./Question.css"
import QuestionModal from "./QuestionModal";
import { clear_timer, display_categories, display_question, end_question, reset_used, select_category, set_timer } from "./socket";

function Question(){

    const [question_list, setQuestionList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [show_add, setShowAdd] = useState(false);
    const [show_edit, setShowEdit] = useState(false);
    const [edit_init, setEditInit] = useState({});
    const [selected, setSelected] = useState(null);
    const [filter_unused, setFilter_unused] = useState(false);
    const [filter_cate, setFilter_cate] = useState(null);
    const [started, setStarted] = useState(false);
    const [time, setTime] = useState(1);

    const get_question_list = () => {
        get_questions().then(questions => {
        setQuestionList(questions);
        setCategories([...new Set(questions.map(question => question.category))])
    })}

    useEffect(() => {
        get_question_list();
    }, []);

    useEffect(() => {
        setSelected(null);
    }, [filter_cate, filter_unused, question_list])

    function question_filter(question){
        return (filter_cate === null || question.category === filter_cate)
        && (filter_unused === false || question.used === false);
    }

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

    const onSelectQuestion = (id) => {
        setSelected(id);
    }

    const onRandomClick = () => {
        const questions = question_list.filter(question_filter);
        setSelected(questions[Math.floor(Math.random() * questions.length)].id)
    }

    const onStartQuestion = () => {
        if(selected !== null){
            display_question(selected);
            setStarted(true);
        }
    }

    const onEndQuestion = () => {
        if(started){
            end_question();
            setStarted(false);
            get_question_list();
        }
    }

    const onSetTimer = () => {
        set_timer(time);
    }

    const onClearTimer = () => {
        clear_timer();
    }

    return <Container className="content">
        <h3>Questions</h3>
        <div id="btns-wrap">
            <InputGroup>
                <Form.Control type="number" value={time} min={1} onChange={(e) => setTime(e.target.value)}/>
                <Button variant="primary" onClick={onSetTimer}>Set timer</Button>
                <Button variant="danger" onClick={onClearTimer}>Clear timer</Button>
            </InputGroup>
            <Dropdown as={ButtonGroup} align="end" onSelect={select_category.bind(this)}>
                <Button variant="primary" onClick={display_categories}><Cast/> Categories</Button>
                <Dropdown.Toggle split variant="primary"/>
                <Dropdown.Menu>
                    {categories.map(cate => 
                        <Dropdown.Item key={cate} eventKey={cate}>
                            {cate}
                        </Dropdown.Item>
                    )}
                </Dropdown.Menu>
            </Dropdown>
            {started ? <Button variant="danger" onClick={onEndQuestion}><StopCircle/> End </Button>
                : <Button variant="success" onClick={onStartQuestion}><PlayCircle/> Start </Button>
            }
        </div> 
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
            <Form.Check id="unused-switch" type="switch" label="Unused only" onClick={() => setFilter_unused(!filter_unused)}/>
            <Button variant="success" onClick={setShowAdd.bind(this, true)}><PlusLg/> Add question</Button>
            <Button variant="secondary" onClick={onRandomClick}><Shuffle/> Random</Button>
            <div style={{flexGrow: 1}}></div>
            <Button variant="danger" onClick={reset_used}><ArrowCounterclockwise/> Reset used</Button>
        </div>
        <Table id="question-table" hover>
            <thead><tr>
                <th>ID</th>
                <th>Category</th>
                <th>Question</th>
                <th>Answers</th>
                <th>Used</th>
                <th>Actions</th>
            </tr></thead>
            <tbody>
                {question_list.filter(question_filter).map(question => <tr key={question.id}
                    className={(selected !== null && question.id === selected) ? "question-active" : ""}
                    onClick={onSelectQuestion.bind(this, question.id)}
                >
                    <td>{question.id}</td>
                    <td>{question.category}</td>
                    <td>{question.question}</td>
                    <td>{question.answers.map((answer, index) =>
                        <Badge className="answer" key={index}
                            bg={(index === question.answer_index) ? "info" :"secondary"}
                        >{answer}
                        </Badge>
                    )}</td>
                    <td>{question.used ? <CheckLg/> : null}</td>
                    <td>
                        <div className="action-wrap">
                            <Button variant="link"
                                onClick={() => {
                                    setEditInit(question);
                                    setShowEdit(true);
                                }}
                            ><PencilSquare/></Button>
                            {
                                (selected === null || question.id !== selected) &&
                                <Button variant="link"
                                    onClick={onDeleteQuestion.bind(this, question.id)}
                                ><XCircle color="var(--bs-danger)"/></Button>
                            }
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