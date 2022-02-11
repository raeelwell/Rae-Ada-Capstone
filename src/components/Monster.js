import react from 'react';
import React from 'react';

const Monster = (props) => {

    const ifStatus = (statusEffects) => {
        let effectsList = [];
        if (statusEffects.length > 1) {
            for (let statusEffect in statusEffects) {
                effectsList.push(statusEffect[0])
                return;
            }
            return (<div><p>Status Effects:</p>{ifStatus(props.statusEffects)}</div>)
        }
    }

    return (<React.Fragment><div><h1>{props.name}</h1>
    <p>HP: {props.hp}</p>
    <p>Attack Strength: {props.damage}</p></div>
    {ifStatus(props.statusEffects)}
    </React.Fragment>)
}

export default Monster;