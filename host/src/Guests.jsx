import Container from "react-bootstrap/Container"
import { Button, Table, InputGroup, Form, Dropdown, ButtonGroup } from "react-bootstrap";
import { useState } from "react";
import { CheckLg, Mic, MicMute, PlusLg, XCircle, XLg } from "react-bootstrap-icons";

import "./Guests.css"
import QRModal from "./QRModal";

function Guests(){
    const {guest_list, register_guests, add_guest, delete_guest, set_speaker} = require('./socket');
    const [guests, setGuests] = useState(guest_list);
    const [qrdata, setQrdata] = useState(null);
    const [new_guest, setNewGuest] = useState("");
    const [speaker, setSpeaker] = useState(null);
    const [sorter, setSorter] = useState("name");

    function sorted_guests(guests, sorter){
        guests.sort((a, b) => {
            if(sorter === "correct_percent"){
                return (b.correct_num / (b.answer_num + 1e-6)) - (a.correct_num / (a.answer_num + 1e-6));
            }else if(sorter === "name"){
                return ("" + a.name).localeCompare(b.name);
            }else{
                return b[sorter] - a[sorter];
            }
        })
        return guests;
    }

    register_guests(guests => {
        setGuests(sorted_guests(guests, sorter));
    });

    const onAddGuest = () => {
        add_guest(new_guest)
        setNewGuest("")
    }
    const onDeleteGuest = (id) => {
        delete_guest(id)
    }
    const onSetSpeaker = (id) => {
        set_speaker(id)
        setSpeaker(id)
    }
    const onSetSorter = (value) => {
        setSorter(value);
        setGuests(sorted_guests(guests, value));
    }
    const onShowQR = (value) => {
        setQrdata(value);
    }
    const onHideQR = () => {
        setQrdata(null);
    }

    return (
        <Container className="content">
            <h3>Guest list</h3>
            <div className="btns-wrap">
                <div id="sort-dropdown">
                    <Dropdown as={ButtonGroup} onSelect={onSetSorter}>
                        <Dropdown.Toggle variant="outline-secondary">
                            Sort by
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="name">Name</Dropdown.Item>
                            <Dropdown.Item eventKey="score">Score</Dropdown.Item>
                            <Dropdown.Item eventKey="answer_num">Answer</Dropdown.Item>
                            <Dropdown.Item eventKey="correct_num">Correct count</Dropdown.Item>
                            <Dropdown.Item eventKey="correct_percent">Corrent percent</Dropdown.Item>
                            <Dropdown.Item eventKey="speak_num">Speak</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <InputGroup className="add-guest">
                    <Form.Control type="text" placeholder="Guest ID to add"
                        value={new_guest} onChange={(e) => setNewGuest(e.target.value)}
                    />
                    <Button variant="success" onClick={onAddGuest}><PlusLg/> Add guest</Button>
                </InputGroup>
                <Button variant="secondary" onClick={onSetSpeaker.bind(this, null)}><MicMute/> Clear speaker</Button>
            </div>    
            <Table id="guest-table">
                <thead><tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Score</th>
                    <th>Answer</th>
                    <th>Correct</th>
                    <th>Speak</th>
                    <th>Online</th>
                    <th>Actions</th>
                </tr></thead>
                <tbody>
                    {guests.map(guest => <tr key={guest.id} className={(guest.id === speaker) ? "guest-active" : ""}>
                        <td><b className="qrlink" onClick={onShowQR.bind(this, guest.id)}>{guest.id}</b></td>
                        <td>{guest.name}</td>
                        <td>{guest.score}</td>
                        <td>{guest.answer_num}</td>
                        <td>{guest.correct_num} ({
                        Math.round(guest.correct_num * 100.0 / (guest.answer_num + 1e-6)) / 100.0}%)</td>
                        <td>{guest.speak_num}</td>
                        <td>{guest.online ? <CheckLg className="online"/> : <XLg className="offline"/>}</td>
                        <td>
                            {(guest.id !== speaker) && <>
                                <Button variant="link" onClick={onSetSpeaker.bind(this, guest.id)}><Mic color="var(--bs-primary)"/></Button>
                                <Button variant="link" onClick={onDeleteGuest.bind(this, guest.id)}><XCircle color="var(--bs-danger)"/></Button>
                            </>}
                        </td>
                    </tr>)}
                </tbody>
            </Table>
            <QRModal data={qrdata} onClose={onHideQR} />
        </Container>
    )
}

export default Guests;