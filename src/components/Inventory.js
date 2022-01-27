import React from 'react';
import Spell from './Spell';

const Inventory = (props) => {
    const allSpells = props.allSpells.map((spell) => {
        return (
            <Spell
            key={spell.id}
            id={spell.id}
            name={spell.name}
            damage={spell.damage}
            owned={spell.owned}
        />
        );
    });
    return (<select className="spellList"
    size="5" 
    onClick={(e) => {
        console.log("click!");
        props.setSelectedSpell(e.target.value);
    }} >{allSpells}</select>)
};

export default Inventory;