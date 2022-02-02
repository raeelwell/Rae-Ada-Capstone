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
    damage: 30,
gold: 50}

    const marketButton = <button className = 'market-button'
    onClick={() => {
        props.player.hp = 50
        props.setActionLog([])
        navigate("/Market");
    }}>Back to the Market</button>

    const landingButton = <button className = 'landing-button'
    onClick={() => {
        props.setPlayerInv([])
        props.setPlayerGold(50)
        props.resetSpells()
        props.generateMonster(monster)
        props.setActionLog([])
        props.setSelectedSpell(null)
        navigate("/");
    }}>Restart</button>

    const goButton = <button className = 'go-button'
    onClick={() => {
        props.generateMonster(monster);
        props.setActionLog([])
    }}>Keep Going</button>


    //this function changes state which should be immutable.
    const generateAction = (monster, selectedSpell, player) => {
        console.log(player.hp)
        if (monster.hp - selectedSpell.damage > 0) {
            monster.hp = monster.hp - selectedSpell.damage
        } else {
            monster.hp = 0
            player.gold.playerGold = monster.gold + player.gold.playerGold
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
    props.setPlayerState(player)
    props.generateMonster(monster)
    };

    const ifMonster = (monster, player) => {
        if (player.hp === 0) {
            return (
                <div><Monster
                    key={monster.id}
                    name={monster.name}
                    damage={monster.damage}
                    hp={monster.hp}
                    gold={monster.gold} /></div>
            );
        } else {
        if (monster) {
            if (monster.hp !== 0) {
                return (
                    <div><Monster
                        key={monster.id}
                        name={monster.name}
                        damage={monster.damage}
                        hp={monster.hp}
                        gold={monster.gold} />
                        <button className = 'attack-button'
                        onClick={(e) => {
                            generateAction(props.currentMonster, props.selectedSpell, props.player)
                            props.setActionLog(<ActionLog
                                goButton = {props.goButton}
                                currentMonster = {props.currentMonster}
                                selectedSpell = {props.selectedSpell} 
                                setMonsterHP = {props.setMonsterHP} 
                                player = {props.player} />)
                        }}>Cast Spell</button></div>
                );
            } else {
                return (<div>{marketButton}
                    {goButton}</div>)
            }
        } else {
            return (<div>{marketButton}
            {goButton}</div>)
        }}
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
        {ifMonster(props.currentMonster, props.player)}
        {ifActionLog(props.actionLogDisplay)}
        {landingButton}
        </div>)
}

export default Woods;