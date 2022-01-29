import React from 'react';

const ActionLog = (props) => {

    const generateAction = (monster, selectedSpell) => {
        if (selectedSpell.damage - monster.hp > 0) {
            props.setMonsterHP(selectedSpell.damage - monster.hp > 0)
            console.log("inside action log")
        }

    }
    return (
        <div><p>Action Generated</p>
        {generateAction(props.currentMonster, props.selectedSpell)}</div>
    )
}

export default ActionLog;