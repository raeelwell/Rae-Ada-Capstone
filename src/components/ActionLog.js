import React from 'react';

const ActionLog = (props) => {

    const monsterKilled = () => {
        if (props.currentMonster.hp === 0) {
            return (<p>Congratulations, you killed the monster!</p>)
        }
    }
    return (
        <div><p>Action Generated</p>
        <p>Monster HP is now {props.currentMonster.hp}</p>
        {monsterKilled()}</div>
    )
}

export default ActionLog;