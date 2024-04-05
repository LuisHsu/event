import React, { useEffect } from "react";
import { Card, Container } from "react-bootstrap";

import "./Category.css"
import { useState } from "react";
import { ipcRenderer } from "electron";

function Category(){
    const [categories, setCategories] = useState([]);
    const [selected, setSelected] = useState(null);

    ipcRenderer.on("show_categories", (_, data) => setCategories(data));
    ipcRenderer.on("select_category", (_, data) => setSelected(data));

    useEffect(() => {
        ipcRenderer.send("get_categories");
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