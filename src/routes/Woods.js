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
import spells from '../data/spells';
import spellEffects from '../data/spellEffects'

const Woods = (props) => {
    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [isCured, setIsCured] = useState(false);

    //if poisonStatus = true / poisonCount -1 / if poisonCount 0, poisonStatus(false) and poisonCount 4
    //if poisonStatus = true / monsterHP = monsterHP - 15

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    const createMonster = (player, multiplier) => {
        let maxDamage = 0
        console.log(player)
        for (let spell of player.spells.playerInv) {
            if (maxDamage < spell.damage) {
                maxDamage = spell.damage
            };
        };
        return ({name: monsterNameList[getRndInteger(0,5)],
        hp: Math.round(getRndInteger(30*multiplier,(maxDamage*3)*multiplier)),
        damage: Math.round(getRndInteger(15*multiplier,(50/3)*multiplier)), 
        gold: getRndInteger(5,40),
        statusEffects: []
    })
};
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

    const effects = (monster,player) => {
        if (monster.statusEffects.length > 0) {
            console.log(monster.statusEffects[0][0])
            spellEffects[monster.statusEffects[0][0]](monster,player)
            monster.statusEffects[0][1] = monster.statusEffects[0][1]-1
        }
        monster.statusEffects = monster.statusEffects.filter(effect => effect[1] > 0)
        console.log(monster)
    }

    const monsterDamage = (monster,player) => {
        if (player.hp - monster.damage > 0) {
            player.hp = player.hp - monster.damage
        } else {
            player.hp = 0
        };
    }

    const monsterDeath = (monster,player) => {
        if (monster.hp <= 0) {
            monster.hp = 0
            player.gold.playerGold = monster.gold + player.gold.playerGold
            setIsCured(false)
            return (true)
        } else {
            return (false)
        }
    }

    const generateAction = (monster, selectedSpell, player) => {
        const newMonster = {...monster}
        const newPlayer = {...player}

        if (!selectedSpell) {
                setErrorMessage("You must first select a spell!")
        } else {
            setErrorMessage('')
        };

        if (selectedSpell.name === "Cleansing Water") {
            if (isCured === true) {
                setErrorMessage("You can only use that spell once per combat!")
                return [newMonster,newPlayer]
            } else {
            setIsCured(true)}
        }

        effects(newMonster,newPlayer)

        if (monsterDeath(newMonster,newPlayer)) {
            setErrorMessage("The monster died before your spell took effect!")
            return ([newMonster,newPlayer])
        }

        spells[selectedSpell.id].function(newMonster,newPlayer)

        if (!monsterDeath(newMonster,newPlayer)) {
            monsterDamage(newMonster,newPlayer)
        };

    return ([newMonster, newPlayer])
};

    const ifMonster = (monster, player) => {
        if (player.hp <= 0) {
            return (
                <div><Monster
                    key={monster.id}
                    name={monster.name}
                    damage={monster.damage}
                    hp={monster.hp}
                    gold={monster.gold}
                    statusEffects={monster.statusEffects} /></div>
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
                        gold={monster.gold}
                        statusEffects= {monster.statusEffects} /></div>
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