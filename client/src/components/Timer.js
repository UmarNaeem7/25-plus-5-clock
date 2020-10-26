import React from 'react';

function Timer(props){
    return <section>
        <h2 id="timer-label">{props.interval}</h2>
        <p id="time-left"></p>
        <div>
            <button id="start_stop">&#9199;</button>
            <button id="reset" onClick={props.reset}>&#8634;</button>
        </div>
    </section>;
}

export default Timer;