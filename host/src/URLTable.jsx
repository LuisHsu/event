import ListGroup from "react-bootstrap/ListGroup"

function URLTable({list}){
    return <>
        <h3>Saved URL</h3>
        <ListGroup>
            {list.map(url => <ListGroup.Item>
                {url}
            </ListGroup.Item>)}
        </ListGroup>
    </>
}
export default URLTable;