import { Container } from "react-bootstrap";

import "./App.css"
import Login from "./Login";
import { useState } from "react";

function App(){

    const [id, setId] = useState(null);

    const onLogin = (guest_id, guest_name) => {

    }

    return <Container id="app-container">
        {(id === null) ? <Login onLogin={onLogin}/>}
        
    </Container>
}

export default App;