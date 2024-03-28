import { Container } from "react-bootstrap";

import "./App.css"
import Login from "./Login";
import { useState } from "react";
import Panel from "./Panel";

function App(){

    const [id, setId] = useState(null);
    const [name, setName] = useState(null);

    const onLogin = (guest_id, guest_name) => {
        setId(guest_id)
        setName(guest_name)
    }

    return <Container id="app-container">
        {(id === null) ? <Login onLogin={onLogin}/> : <Panel id={id} name={name}/>}
    </Container>
}

export default App;