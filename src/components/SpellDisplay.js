import React from 'react';

const SpellDisplay = (props) => {
    
    return (<p>name: {props.spell.name}<br /> 
    damage: {props.spell.damage}<br />
    cost: {props.spell.cost}</p>)
};
export default SpellDisplay;