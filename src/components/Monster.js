import React from 'react';

const Monster = (props) => {
    return (<div><h1>{props.name}</h1>
    <p>HP: {props.hp}</p>
    <p>Attack Strength: {props.damage}</p></div>)
}

export default Monster;