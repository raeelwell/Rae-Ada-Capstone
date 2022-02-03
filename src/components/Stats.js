import React from 'react';
import './Stats.css'

const Stats = (props) => {
    return <div className = 'Stats'>Name: {props.player.name.nameInput} | HP: {props.player.hp} | Gold: {props.player.gold.playerGold}</div>
}

export default Stats;