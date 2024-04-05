import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import { regist_handler, send } from "./socket";

import "./Category.css"

function Category(){
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        regist_handler("show_categories", setCategories);
        regist_handler("select_category", setSelected);
        send("get_categories");
    }, []);

    return <Container id="app-container">
        <h2 id="cate-title">Category</h2>
        <div id="cate-grid">
            <div id="cate-wrap">
                {categories.map(({category, count}, idx) => 
                    <Card className={`cate-card${(category === selected) ? " cate-active" : ""}`}
                        key={idx}
                    >
                        <Card.Body>
                            {category} ({count})
                        </Card.Body>
                    </Card>
                )}
            </div>
        </div>
    </Container>
}

export default Category;