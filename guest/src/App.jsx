import { Container } from "react-bootstrap";
import { useState } from "react";

import "./App.css"
import Login from "./Login";
import Panel from "./Panel";

function App(){

    const [credential, setCredential] = useState(null);

    const onLogin = (user) => {
        setCredential(user);
    }

    return <Container id="app-container">
        {(credential === null) ? 
            <Login onLogin={onLogin} 
                onLogout={setCredential.bind(this, null)}
            />
            : <Panel id={credential.id} name={credential.username}/>
        }
    </Container>
}

export default App;