import Container from "react-bootstrap/Container"
import { Button, Table, InputGroup, Form } from "react-bootstrap";
import { useState } from "react";
import { CheckLg, MegaphoneFill, XCircle, XLg } from "react-bootstrap-icons";

import "./Guests.css"

function Guests(){
    const {guest_list, register_guests} = require('./socket');
    const [guests, setGuests] = useState(guest_list);
    const [new_guest, setNewGuest] = useState("");
    register_guests(setGuests);

    return (
        <Container className="content">
            <h3>Guest list</h3>
            <div id="btns-wrap">
                <InputGroup className="add-guest">
                    <Form.Control type="text" placeholder="Guest ID to add"
                        value={new_guest} onChange={(e) => setNewGuest(e.target.value)}
                    />
                    <Button variant="success">Add guest</Button>
                </InputGroup>
                <Button variant="secondary">Clear speaker</Button>
            </div>    
            <Table>
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
                <tbody id="table-body">
                    {guests.map(guest => <tr key={guest.id}>
                        <td>{guest.id}</td>
                        <td>{guest.name}</td>
                        <td>{guest.score}</td>
                        <td>{guest.answer_num}</td>
                        <td>{guest.correct_num}</td>
                        <td>{guest.speak_num}</td>
                        <td>{guest.online ? <CheckLg color="var(--bs-success)"/> : <XLg color="var(--bs-danger)"/>}</td>
                        <td>
                            <Button variant="link"><MegaphoneFill color="var(--bs-primary)"/></Button>
                            <Button variant="link"><XCircle color="var(--bs-danger)"/></Button>
                        </td>
                    </tr>)}
                </tbody>
            </Table>
        </Container>
    )
}

export default Guests;