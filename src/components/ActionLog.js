import React from 'react';
import './ActionLog.css'
import Monster from './Monster';

const ActionLog = (props) => {

    const monsterKilled = () => {
        if (props.currentMonster.hp <= 0) {
            return (<div></div>)
        }
    }


    const ifNewEncounter = () => {
        if (!props.selectedSpell) {
            return (<div className="action">You encounter a {props.currentMonster.name}!</div>)
        } else {
            return (<div className="action">
            You cast {props.selectedSpell.name}! It does {props.selectedSpell.damage} damage.<br /><br />
            <center><b>Monster HP is now {props.currentMonster.hp}.<br /></b></center><br />
            The monster strikes back at you, doing {props.currentMonster.damage} damage!<br /><br />
        
            <center><b>Your HP is now {props.player.hp}.</b></center>
            {monsterKilled()}
            </div>)
        }
    }

    return (
        <div className="action">
            You cast {props.selectedSpell.name}! It does {props.selectedSpell.damage} damage.<br /><br />
            <center><b>Monster HP is now {props.currentMonster.hp}.<br /></b></center><br />
            { props.currentMonster.hp > 0? <div className="monsterAttack">The monster strikes back at you, doing {props.currentMonster.damage} damage!
            <br /><br /><center><b>Your HP is now {props.player.hp}.</b></center></div> : <div></div>}<br /><br />
            
            {monsterKilled()}
            </div>
    )
}

export default ActionLog;