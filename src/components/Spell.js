import React from 'react';

const Spell = (props) => { 
    
    return (<option className ="option" value = {props.id}>{props.name}</option>)
};
export default Spell;