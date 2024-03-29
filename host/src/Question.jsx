import { Container, Table } from "react-bootstrap";

function Question(){
    return <Container className="content">
        <h3>Questions</h3>
        <Table>
            <thead><tr>
                <th>ID</th>
                <th>Category</th>
                <th>Question</th>
                <th>Answers</th>
                <th>Used</th>
                <th>Actions</th>
            </tr></thead>
        </Table>
    </Container>
}

export default Question;