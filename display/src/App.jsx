import "./App.css"
import Category from "./Category";

function App(){
    const page_map = {
        "/category": <Category />
    };
    if(location.pathname in page_map){
        return page_map[location.pathname];
    }else{
        return <></>;
    } 
}

export default App;