import React from 'react';
import './Stats.css'

const Stats = (props) => {
    return <div className = 'Stats'><b>Name:</b> {props.player.name.nameInput}<br /> 
    <b>HP:</b> {props.player.hp} | <b>Gold:</b> {props.player.gold.playerGold}</div>
}

export default Stats;