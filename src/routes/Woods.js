import '../App.css';
import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Monster from '../components/Monster'
import Inventory from '../components/Inventory'
import Landing from '../components/Landing';

const Woods = (props) => {
    let navigate = useNavigate();

    const monster = {id: 0,
        name: "minotaur",
    hp: 40,
    damage: 30}

    const marketButton = <button className = 'market-button'
    onClick={() => {
        navigate("/Market");
    }}>Back to the Market</button>

    const landingButton = <button className = 'landing-button'
    onClick={() => {
        navigate("/");
    }}>Restart</button>

    const goButton = <button className = 'go-button'
    onClick={() => {
        props.generateMonster(monster);
    }}>Keep Going</button>

    const attackButton = <button className = 'attack-button'
    onClick={(e) => {
        console.log(props.selectedSpell)
    }}>Attack</button>

    const ifMonster = (monster) => {
        if (monster) {
            return (
                <div><Monster
    key={monster.id}
    name={monster.name}
    damage={monster.damage}
    hp={monster.hp} />
    <button className = 'attack-button'
    onClick={(e) => {
        console.log(props.selectedSpell)
    }}>Attack</button></div>
            );
        } else {
            return (<div></div>)
        }
    }

    return (<div>
        <h1>This is the Woods Page</h1>
        <Inventory allSpells = {props.allSpells}
        setSelectedSpell = {props.setSelectedSpell}
        selectedSpell = {props.selectedSpell} />
        {ifMonster(props.currentMonster)}
        {goButton}
        {marketButton}
        {landingButton}
        </div>)
}

export default Woods;