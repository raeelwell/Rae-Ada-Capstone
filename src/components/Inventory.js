import './Inventory.css'
import React from 'react';
import Spell from './Spell';

const Inventory = (props) => {
    const displayAllSpells = props.allSpells.map((spell) => {
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

    const lookUpSpell = id => {
        id = parseInt(id, 10)
        for (let spell of props.allSpells) {
            if (spell.id === id) {
                return spell
            }
        } return null
        };

    return (<React.Fragment><select className="spellList"
    size="5" 
    onClick={(e) => {
        props.setSelectedSpell(lookUpSpell(e.target.value));
    }} >{displayAllSpells}</select>
    </React.Fragment>
    )
};

export default Inventory;