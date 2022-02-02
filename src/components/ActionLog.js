import React from 'react';

const ActionLog = (props) => {

    const monsterKilled = () => {
        if (props.currentMonster.hp === 0) {
            return (<div>Congratulations, you killed the monster! The monster has dropped {props.currentMonster.gold} gold.
            {props.goButton}</div>)
        }
    }
    console.log(props.player.hp)

    const playerKilled = () => {
        if (props.player.hp === 0) {
            return (<p>The monster has killed you. Game over.</p>)
        }
    }
    return (
        <div>
        <p><b>Monster HP is now {props.currentMonster.hp}<br />
        Your HP is now {props.player.hp}</b></p>
        {monsterKilled()}
        {playerKilled()}
        </div>
    )
}

export default ActionLog;