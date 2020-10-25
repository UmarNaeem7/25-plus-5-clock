import React from 'react';

function IntervalController(props){
    const type = props.type;
    return <section>
        <h2 id={`${type}-label`}>{props.type}</h2>
        <div>
            <button id={`${type}-decrement`}>&#9660;</button>
            <p id={`${type}-length`}>{props.length}</p>
            <button id={`${type}-increment`}>&#9650;</button>
        </div>
    </section>;
}

export default IntervalController;