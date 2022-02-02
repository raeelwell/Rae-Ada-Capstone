import React from 'react';

const Stats = (props) => {
    return <div>Name: {props.player.name.nameInput}, HP: {props.player.hp}, Gold: {props.player.gold.playerGold}</div>
}

export default Stats;