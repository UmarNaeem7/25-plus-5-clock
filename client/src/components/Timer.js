import React from 'react';

function Timer(props){
    return <section id="timer">
        <h2 id="timer-label">{props.interval}</h2>
        <p id="time-left">{props.time}</p>
        <button id="start_stop" onClick={props.isPaused ? props.start : props.pause}>&#9199;</button>
        <button id="reset" onClick={props.reset}>&#8634;</button>
    </section>;
}

export default Timer;