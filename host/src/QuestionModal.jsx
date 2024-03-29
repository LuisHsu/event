import { useState } from 'react';
import {Modal, ButtonGroup, Form, Container, Dropdown, Button, InputGroup, ListGroup} from 'react-bootstrap'
import { PlusLg, XLg } from 'react-bootstrap-icons';

import "./QuestionModal.css"

function QuestionModal({show, onClose, onSubmit, title, categories,
    init={}
}){
    const [category, setCategory] = useState(init.category ? init.category : "");
    const [question, setQuestion] = useState(init.question ? init.question : "");
    const [answers, setAnswers] = useState(init.answers ? init.answers : []);
    const [answer_index, setAnswerIndex] = useState(init.answers ? init.answer_index : 0);
    const [new_answer, setNewAnswer] = useState("");
    const [new_answer_invalid, setNewAnswerInvalid] = useState(false);
    const [question_invalid, setQuestionInvalid] = useState(false);

    const onAnswerDelete = (index, event) =>{
        event.stopPropagation();
        setAnswers(answers.toSpliced(index, 1));
    }
    const onAnswerAdd = () =>{
        if(new_answer === ""){
            setNewAnswerInvalid(true);
        }else{
            setNewAnswerInvalid(false);
            setAnswers([...answers, new_answer]);
            setNewAnswer("");
        }
    }
    const onQuestionSubmit = (e) => {
        e.preventDefault();
        if(category === "" || question === "" || answers.length < 2){
            setQuestionInvalid(true);
        }else{
            onSubmit({category, question, answers, answer_index});
            onClose();
        }
    }
    const onQuestionClose = () => {
        setQuestionInvalid(false);
        setNewAnswerInvalid(false);
        setNewAnswer("");
        onClose();
    }

    return <Modal show={show} onHide={onQuestionClose} size='lg'>
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Form noValidate onSubmit={onQuestionSubmit}>
            <Modal.Body>
                <Container>
                    <Form.Group>
                        <h5>Category</h5>
                        <Dropdown as={ButtonGroup} align="end">
                            <Form.Control className="form-cate-btn" value={category}
                                placeholder="Select or input category"
                                onChange={(e) => setCategory(e.target.value)}
                                isInvalid={question_invalid && (category === "")}
                            />
                            <Dropdown.Toggle split variant="secondary"/>
                            <Dropdown.Menu>{categories.map(cate => 
                                <Dropdown.Item key={cate} onClick={setCategory.bind(this, cate)}>{cate}</Dropdown.Item>
                            )}</Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label><h5>Question</h5></Form.Label>
                        <Form.Control className='question-model-question' as="textarea"
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            isInvalid={question_invalid && (question === "")}
                        />
                    </Form.Group>
                    <br/>
                    <Form.Group>
                        <Form.Label><h5>Answers</h5></Form.Label>
                        <ListGroup className='question-model-list'>
                            <InputGroup className='question-model-new_answer'>
                                <Form.Control type="text" placeholder="New answer"
                                    value={new_answer}
                                    onChange={(e) => setNewAnswer(e.target.value)}
                                    isInvalid={new_answer_invalid && (new_answer === "")}
                                />
                                <Button variant="secondary" onClick={onAnswerAdd}><PlusLg/></Button>
                            </InputGroup>
                            {answers.map((answer, index) => 
                                <ListGroup.Item key={index} style={{display: "flex"}}
                                    active={index === answer_index}
                                    onClick={setAnswerIndex.bind(this, index)}
                                >
                                    <div style={{flexGrow: 1}}>{answer}</div>
                                    {(index === answer_index) ? "" :
                                        <Button variant='link' style={{padding: 0}}
                                            onClick={onAnswerDelete.bind(this, index)}
                                        ><XLg color='var(--bs-danger)'/></Button>
                                    }
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                        {(question_invalid && answers.length < 2) ? 
                            <Form.Text style={{color: 'var(--bs-danger)'}}>
                                Must be at least 2 answers
                            </Form.Text>
                            : ""
                        }
                    </Form.Group>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" type="submit">Submit</Button>
            </Modal.Footer>
        </Form>
    </Modal>
}

export default QuestionModal;