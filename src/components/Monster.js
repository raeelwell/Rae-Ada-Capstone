import react from 'react';
import React from 'react';

const Monster = (props) => {
    console.log(props.statusEffects)

    const ifStatus = (statusEffects) => {
        let effectsList = [];
        if (props.statusEffects.length > 0) {
            for (let statusEffect of props.statusEffects) {
                effectsList.push(statusEffect[0])
            }
            return (<div><p>Status Effects:</p>{`${effectsList} `}</div>)
        }
    }

    return (<React.Fragment><div><h1>{props.name}</h1>
    <p>HP: {props.hp}</p>
    <p>Attack Strength: {props.damage}</p></div>
    {ifStatus(props.statusEffects)}
    </React.Fragment>)
}

export default Monster;