import React, { useEffect } from "react";

function Timer({time, setTime}) {

    function tick(){
        if(time !== null && time > 0){
            setTime(time - 1);
        }
    }

    useEffect(() => {
        if(time !== null && time > 0){
            setTimeout(tick, 1000);
        }
    }, [time]);

    return <div id="timer">
        {(time !== null) ? 
            (time > 9) ? time : `0${time}`
        : "--"}
    </div>
}

export default Timer;