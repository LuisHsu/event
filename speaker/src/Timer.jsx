import { useEffect } from "react";

let timer = null;

function Timer({time, setTime}) {

    function tick(){
        if((time !== null) && (time > 0)){
            setTime(time - 1);
        }
    }

    useEffect(() => {
        if((time !== null) && (time > 0)){
            timer = setTimeout(tick, 1000);
        }else if(time === null && timer !== null){
            clearTimeout(timer);
            timer = null;
        }
    }, [time]);

    return <div id="timer">
        {(time !== null) ? 
            (time > 9) ? time : `0${time}`
        : "--"}
    </div>
}

export default Timer;