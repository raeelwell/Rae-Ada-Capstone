import React from 'react';
import './ActionLog.css'

const ActionLog = (props) => {

    const monsterKilled = () => {
        if (props.currentMonster.hp <= 0) {
            return (<div className="action">Congratulations, you killed the monster! The monster has dropped {props.currentMonster.gold} gold.
            {props.goButton}<br /><br />
            You can return to the Market to recover your HP and buy more spellbooks, or if you are feeling adventurous, you can keep going for another monster encounter!</div>)
        }
    }


    const playerKilled = () => {
        if (props.player.hp <= 0) {
            return (<div className="action">The monster has killed you. Game over.</div>)
        }
    }
    return (
        <div className="action">
        <p><b>Monster HP is now {props.currentMonster.hp}<br />
        Your HP is now {props.player.hp}</b></p>
        {monsterKilled()}
        {playerKilled()}
        </div>
    )
}

export default ActionLog;