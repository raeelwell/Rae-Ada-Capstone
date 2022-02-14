import React from 'react';

const SpellDisplay = (props) => {
    
    if (props.spell.name) {
        return (<p><b><center>{props.spell.name}</center></b><br /> 
            damage: {props.spell.damage}<br />
            cost: {props.spell.cost}<br /><br />
            <center>{props.spell.description}</center></p>)
    } else {
        return <div></div>
    }
};
export default SpellDisplay;