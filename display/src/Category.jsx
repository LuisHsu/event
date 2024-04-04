import { Card, Container } from "react-bootstrap";

import "./Category.css"
import { useState } from "react";

function Category(){
    const [category, setCategory] = useState(["A", "B", "C", "D", "E"]);

    return <Container id="app-container">
        <h2 id="cate-title">Category</h2>
        <div id="cate-grid">
            <div id="cate-wrap">
                {category.map((cate, idx) => 
                    <Card className="cate-card" key={idx}>
                        <Card.Body>
                            {cate} ({idx})
                        </Card.Body>
                    </Card>
                )}
            </div>
        </div>
    </Container>
}

export default Category;