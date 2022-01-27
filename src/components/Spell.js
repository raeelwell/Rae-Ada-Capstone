import React from 'react';
import spells from '../data/spells'

const Spell = (props) => {
    return (<option>{props.name}, damage: {props.damage}</option>)
}

export default Spell;