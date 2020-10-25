import React from 'react';

function Timer(props){
    return <div>
        <h2 id="timer-label">{props.interval}</h2>
        <p id="time-left"></p>
        <div>
            <button id="start_stop">&#9199;</button>
            <button id="reset">&#8634;</button>
        </div>
    </div>;
}

export default Timer;