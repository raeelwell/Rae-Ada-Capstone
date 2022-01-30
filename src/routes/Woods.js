import '../App.css';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Monster from '../components/Monster'
import Inventory from '../components/Inventory'
import ActionLog from '../components/ActionLog'
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
        //props.setMonsterHP(monster.hp);
    }}>Keep Going</button>

    const generateAction = (monster, selectedSpell) => {
        if (monster.hp - selectedSpell.damage > 0) {
            monster.hp = monster.hp - selectedSpell.damage
        } else {
            monster.hp = 0
        };
    };

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
                        console.log(props.currentMonster)
                        generateAction(props.currentMonster, props.selectedSpell)
                        props.setActionLog(<ActionLog
                            currentMonster = {props.currentMonster}
                            selectedSpell = {props.selectedSpell} 
                            setMonsterHP = {props.setMonsterHP} />)
                    }}>Attack</button></div>
            );
        } else {
            return (<div></div>)
        }
    };

    const ifActionLog = (actionLog) => {
        if (actionLog) {
            return (<div>{props.actionLogDisplay}</div>)
        }
    }

    const createActionLog = (monsterHP, spellDamage) => {
        return (<ActionLog
            monster = {props.currentMonster}
            selectedSpell = {props.selectedSpell}
            monsterHP = {props.monsterHP}
            setMonsterHP = {props.setMonsterHP} />)
    }

    return (<div>
        <h1>This is the Woods Page</h1>
        <Inventory allSpells = {props.playerInv}
        setSelectedSpell = {props.setSelectedSpell}
        selectedSpell = {props.selectedSpell} />
        {ifMonster(props.currentMonster)}
        {ifActionLog(props.actionLogDisplay)}
        {goButton}
        {marketButton}
        {landingButton}
        </div>)
}

export default Woods;