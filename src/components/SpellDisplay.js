import React from 'react';

const SpellDisplay = (props) => {
    
    if (props.spell.name) {
        return (<p>name: {props.spell.name}<br /> 
            damage: {props.spell.damage}<br />
            cost: {props.spell.cost}<br />
            {props.spell.description}</p>)
    } else {
        return <div></div>
    }
};
export default SpellDisplay;