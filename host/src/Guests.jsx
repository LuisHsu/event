import Container from "react-bootstrap/Container"
import { Button, Table, InputGroup, Form } from "react-bootstrap";
import { useState } from "react";
import { CheckLg, Mic, MicMute, PlusLg, XCircle, XLg } from "react-bootstrap-icons";

import "./Guests.css"

function Guests(){
    const {guest_list, register_guests, add_guest, delete_guest, set_speaker} = require('./socket');
    const [guests, setGuests] = useState(guest_list);
    const [new_guest, setNewGuest] = useState("");
    const [speaker, setSpeaker] = useState(null);
    register_guests(setGuests);

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

    return (
        <Container className="content">
            <h3>Guest list</h3>
            <div className="btns-wrap">
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
                        <td>{guest.id}</td>
                        <td>{guest.name}</td>
                        <td>{guest.score}</td>
                        <td>{guest.answer_num}</td>
                        <td>{guest.correct_num}</td>
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
        </Container>
    )
}

export default Guests;