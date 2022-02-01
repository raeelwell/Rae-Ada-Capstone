import '../App.css';
import React, { useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Monster from '../components/Monster'
import Inventory from '../components/Inventory'
import ActionLog from '../components/ActionLog'
import Stats from '../components/Stats'
import SpellDisplay from '../components/SpellDisplay';
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

    const generateAction = (monster, selectedSpell, player) => {
        console.log(player.hp)
        if (monster.hp - selectedSpell.damage > 0) {
            monster.hp = monster.hp - selectedSpell.damage
        } else {
            monster.hp = 0
        };
        if (monster.hp !== 0) {
            console.log("monster hp is above zero")
            if (player.hp - monster.damage > 0) {
                console.log("player hp minus monster HP is above zero")
                player.hp = player.hp - monster.damage
                console.log(player.hp)
            } else {
                player.hp = 0
            };
    }
    console.log(player.hp)
    props.setPlayerState(player)
    props.generateMonster(monster)
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
                        generateAction(props.currentMonster, props.selectedSpell, props.player)
                        props.setActionLog(<ActionLog
                            currentMonster = {props.currentMonster}
                            selectedSpell = {props.selectedSpell} 
                            setMonsterHP = {props.setMonsterHP} 
                            player = {props.player} />)
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

    const ifSpellSelected = (spell) => {
        if (spell) {
            return <SpellDisplay spell = {props.selectedSpell} />
        }
    }

    return (<div>
        <h1>This is the Woods Page</h1>
        <Stats
        player = {props.player} />
        <Inventory allSpells = {props.playerInv}
        setSelectedSpell = {props.setSelectedSpell}
        selectedSpell = {props.selectedSpell} />
        {ifSpellSelected(props.selectedSpell)}
        {ifMonster(props.currentMonster)}
        {ifActionLog(props.actionLogDisplay)}
        {goButton}
        {marketButton}
        {landingButton}
        </div>)
}

export default Woods;