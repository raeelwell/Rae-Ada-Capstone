import React from 'react';

const Monster = (props) => {
        const ifStatus = (statusEffects) => {
        let effectsList = [];
        let turnsRemaining = 0;
        if (props.statusEffects.length > 0) {
            for (let statusEffect of props.statusEffects) {
                if (statusEffect[0] === "Weakness" || statusEffect[0] === "Mana Wall") {
                    turnsRemaining = statusEffect[1] -1
                } else {
                    turnsRemaining = [statusEffect[1]]
                };
                if (turnsRemaining > 0) {
                    effectsList.push(` ${statusEffect[0]}`)
                    effectsList.push(` ${turnsRemaining} turns`)
                    ;
                };
            };
            if (effectsList.length < 1) {
                return (<div></div>)
            };
            return (<div><p><b>Status Effects:</b> {`${effectsList} `}</p></div>)
        };
    };

    return (<React.Fragment><div><b><center>{props.name}</center></b>
    <p><b>HP:</b> {props.hp}</p>
    <p><b>Attack Strength:</b> {props.damage}</p></div>
    {ifStatus(props.statusEffects)}
    </React.Fragment>)
};

export default Monster;