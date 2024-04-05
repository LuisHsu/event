import "./App.css"
import Category from "./Category";
import Question from "./Question";

function App(){
    const page_map = {
        "/category": <Category />,
        "/question": <Question />
    };
    if(location.pathname in page_map){
        return page_map[location.pathname];
    }else{
        return <></>;
    } 
}

export default App;