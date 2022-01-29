import React from 'react';
import spells from '../data/spells'

const Spell = (props) => {

    const generateSpell = () => {
        return (
            <Spell
            key={props.spell.id}
            id={props.spell.id}
            name={props.spell.name}
            damage={props.spell.damage}
            owned={props.spell.owned}
        />
        );
    }

    //i need setselectedspell to return a spell object? not a string spell option
    //can i display this option in a different way without breaking my code
    
    return (<option value = {props.id}>{props.name}, damage: {props.damage}</option>)
};
export default Spell;