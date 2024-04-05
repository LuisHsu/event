import React, { useEffect, useState } from "react";
import "./App.css"
import Category from "./Category.jsx";
import Question from "./Question.jsx";

function App(){

    const [page, setPage] = useState("")

    useEffect(() => {
        setPage(location.hash);
    }, [location.hash]);

    switch(page){
        case "#category":
            return <Category />;
        case "#question":
            return <Question />;
        default:
            return <></>;
    }
}

export default App;