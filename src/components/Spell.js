import React from 'react';
import spells from '../data/spells'

const Spell = (props) => { 
    
    return (<option value = {props.id}>{props.name}</option>)
};
export default Spell;