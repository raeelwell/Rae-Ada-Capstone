import React from 'react';

const ActionLog = (props) => {

    const monsterKilled = () => {
        if (props.currentMonster.hp === 0) {
            return (<p>Congratulations, you killed the monster! The monster has dropped {props.currentMonster.gold} gold.</p>)
        }
    }
    console.log(props.player.hp)

    const playerKilled = () => {
        if (props.player.hp === 0) {
            return (<p>The monster has killed you. Game over.</p>)
        }
    }
    return (
        <div><p>Action Generated</p>
        <p>Monster HP is now {props.currentMonster.hp}<br />
        Your HP is now {props.player.hp}</p>
        {monsterKilled()}
        {playerKilled()}
        </div>
    )
}

export default ActionLog;