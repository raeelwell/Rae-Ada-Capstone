import './Woods.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Monster from '../components/Monster'
import Inventory from '../components/Inventory'
import ActionLog from '../components/ActionLog'
import Stats from '../components/Stats'
import SpellDisplay from '../components/SpellDisplay';
import monsterNameList from '../data/monsters.json'
import Landing from '../components/Landing';

const Woods = (props) => {
    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    const createMonster = () => {
        return ({name: monsterNameList[getRndInteger(0,5)],
        hp: getRndInteger(30,80),
        damage: getRndInteger(15,40),
        gold: getRndInteger(5,40)
    })
}
    const monster = createMonster()

    const marketButton = <button className = 'market-button'
    onClick={() => {
        props.player.hp = 50
        props.setActionLog([])
        props.setSelectedSpell(null)
        navigate("/Market");
    }}>Back to the Market</button>

    const landingButton = <button className = 'landing-button'
    onClick={() => {
        props.setPlayerInv([])
        props.setPlayerGold(50)
        props.resetSpells()
        props.generateMonster(null)
        props.setActionLog([])
        props.setSelectedSpell(null)
        navigate("/");
    }}>Restart</button>

    const goButton = <button className = 'go-button'
    onClick={() => {
        props.generateMonster(monster);
        props.setActionLog([])
    }}>Keep Going</button>

    const generateAction = (monster, selectedSpell, player) => {
        const newMonster = {...monster}
        const newPlayer = {...player}

        if (!selectedSpell) {
                setErrorMessage("You must first select a spell!")
        } else {
            setErrorMessage('')
        }
        if (newMonster.hp - selectedSpell.damage > 0) {
            newMonster.hp = monster.hp - selectedSpell.damage
        } else {
            newMonster.hp = 0
            newPlayer.gold.playerGold = monster.gold + player.gold.playerGold
        };
        if (newMonster.hp !== 0) {
            console.log(`monster hp is ${newMonster.hp}`)
            if (newPlayer.hp - monster.damage > 0) {
                console.log("player hp minus monster damage is above zero")
                newPlayer.hp = player.hp - monster.damage
            } else {
                newPlayer.hp = 0
            };
    };
    return ([newMonster, newPlayer])
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
                    <div><div className="monster"><p>You encounter a {monster.name}!</p><br />
                    <Monster
                        key={monster.id}
                        name={monster.name}
                        damage={monster.damage}
                        hp={monster.hp}
                        gold={monster.gold} /></div>
                        <button className = 'buttons'
                        onClick={(e) => {
                            const actionResult = generateAction(props.currentMonster, props.selectedSpell, props.player)
                            props.setActionLog(<ActionLog 
                                goButton = {props.goButton}
                                currentMonster = {actionResult[0]}
                                selectedSpell = {props.selectedSpell}
                                player = {actionResult[1]}/>)
                            props.setPlayerState(actionResult[1])
                            props.generateMonster(actionResult[0])
                        }}>Cast Spell</button></div>
                );
            } else {
                return (<div className="buttons">{marketButton}
                    {goButton}</div>)
            }
        } else {
            return (<div className="buttons">{marketButton}
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

    const playerInventory = () => {
        return (<Inventory allSpells = {props.playerInv}
            setSelectedSpell = {props.setSelectedSpell}
            selectedSpell = {props.selectedSpell} />)
    }

    return (<div>
        <h1 className="welcome">The Woods are dark and creepy</h1>
        <header>
            <Stats
            player = {props.player} />
        </header>
        <main>
            <div className="inventory">{playerInventory()}</div>
            <div className="selectedSpell">{ifSpellSelected(props.selectedSpell)}</div>
            <div className="errorMessage">{errorMessage}</div>
            {ifMonster(props.currentMonster, props.player)}
            {ifActionLog(props.actionLogDisplay)} <br />
            <div className = "restartButton">
            {landingButton}</div>
        </main>
        </div>)
}

export default Woods;