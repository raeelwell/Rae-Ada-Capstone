import './Woods.css';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Monster from '../components/Monster'
import Inventory from '../components/Inventory'
import ActionLog from '../components/ActionLog'
import Stats from '../components/Stats'
import SpellDisplay from '../components/SpellDisplay';
import monsterNameList from '../data/monsters.json'
import Portraits from '../components/Portraits';
import Landing from '../components/Landing';
import react from 'react';

const Woods = (props) => {
    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [poisonStatus, setPoisonStatus] = useState(false)

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    const createMonster = (player, multiplier) => {
        let maxDamage = 0
        for (let spell of player.spells.playerInv) {
            if (maxDamage < spell.damage) {
                maxDamage = spell.damage
            };
        };
        return ({name: monsterNameList[getRndInteger(0,5)],
        hp: Math.round(getRndInteger(30*multiplier,(maxDamage*3)*multiplier)),
        damage: Math.round(getRndInteger(15*multiplier,(player.hp/3)*multiplier)), 
        gold: getRndInteger(5,40)
    })
}
    const monster = createMonster(props.player, props.monsterMultiplier)

    const marketButton = <button className = 'market-button'
    onClick={() => {
        props.player.hp = 50
        props.setActionLog([])
        props.setSelectedSpell(null)
        navigate("/Market");
        props.setMonsterMultiplier(props.monsterMultiplier+0.1)
        console.log(props.monsterMultiplier)
    }}>Back to the Market</button>

    const landingButton = <button className = 'landing-button'
    onClick={() => {
        props.setPlayerGold(0)
        props.resetSpells()
        props.setPlayerInv([props.allSpells[0]])
        props.setMonster(null)
        props.setActionLog([])
        props.setSelectedSpell(null)
        navigate("/");
    }}>Restart</button>

    const goButton = <button className = 'go-button'
    onClick={() => {
        props.setMonster(monster);
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
        if (selectedSpell.damage === 0) {
            return (effectSpell(selectedSpell, newPlayer, newMonster))
        } else {
        if (newMonster.hp - selectedSpell.damage > 0) {
            newMonster.hp = monster.hp - selectedSpell.damage
        } else {
            newMonster.hp = 0
            newPlayer.gold.playerGold = monster.gold + player.gold.playerGold
        };
        if (newMonster.hp !== 0) {
            if (newPlayer.hp - monster.damage > 0) {
                newPlayer.hp = player.hp - monster.damage
            } else {
                newPlayer.hp = 0
            };
    }};
    return ([newMonster, newPlayer])
    };

    let poisonCount = 4;
    //if poisonStatus = true / poisonCount -1 / if poisonCount 0, poisonStatus(false)
    //if poisonStatus = true / monsterHP = monsterHP - 15

    const effectSpell = (selectedSpell, player, monster) => {
        if (selectedSpell.name === "Cure") {
            player.hp = 50
        };
        if (selectedSpell.name === "Poison Cloud") {
            setPoisonStatus(true)
            player.hp = player.hp - monster.damage
        }
        return ([monster,player])
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
                            props.setMonster(actionResult[0])
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
        } else {
            return <p>Push the Keep Going button to find a monster. <br />
            Returning to the Market restores your HP to full.<br />
            You cannot return to the market while in combat.</p>
        }
    }

    const playerInventory = () => {
        return (<Inventory allSpells = {props.playerInv}
            setSelectedSpell = {props.setSelectedSpell}
            selectedSpell = {props.selectedSpell} />)
    }


    return (<react.Fragment><header><h1 className= "welcome">By The Moonlight, you wander into the woods</h1></header>
    <div>
            <div className="oneLine">
                <Portraits
                hideArrows = {true}
                portraitIndex = {props.portraitIndex} />
                <div className ="statsBlock"><div className="stats"><Stats
                player = {props.player} /></div>
                <div className="selectedSpell">{ifSpellSelected(props.selectedSpell)}</div>
                </div>
                <div className="inventory"><div className="bothInventories">
                <div className="playerInventory"><p>Your Bookbag</p>{playerInventory()}</div></div>
                </div>
            </div>

            { errorMessage? <div className="errorMessage">{errorMessage}</div>: <br />}
            {ifMonster(props.currentMonster, props.player)}
            {ifActionLog(props.actionLogDisplay)} <br />
            <div className = "restartButton">
            {landingButton}</div>
        </div>
        </react.Fragment>)
}

export default Woods;