import React from 'react';

const SpellDisplay = (props) => {
    
    if (props.spell.name) {
        return (<div><b><center>{props.spell.name}</center></b><br /> 
            damage: {props.spell.damage}<br />
            cost: {props.spell.cost}<br /><br />
            <center>{props.spell.description}</center></div>)
    } else {
        return <div></div>
    }
};
export default SpellDisplay;