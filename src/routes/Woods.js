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

    const singleUseSpells = {
        "Cleansing Water":false,
        "Mana Wall":false,
        "Avarice":false,
        "Weakness":false}

    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [singleUse, setSingleUse] = useState(singleUseSpells);

    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    const createMonster = (player, multiplier) => {
        let totalCost = 0
        for (let spell of player.spells.playerInv) {
                totalCost += spell.cost
            };
            if (totalCost*multiplier < 30) {
                totalCost = 30
            };
        return ({name: monsterNameList[getRndInteger(0,5)],
        hp: Math.round(getRndInteger(30*multiplier,(totalCost)*multiplier)),
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
        const newTurnCount = props.turnCount
        props.setTurnCount(newTurnCount+1)
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
            for (let effect in monster.statusEffects) {
                spellEffects[monster.statusEffects[effect][0]](monster,player,monster.statusEffects[effect])
                monster.statusEffects[effect][1] = monster.statusEffects[effect][1]-1
            }
        }
        monster.statusEffects = monster.statusEffects.filter(effect => effect[1] > 0)
        console.log(monster.statusEffects)
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
            setSingleUse(singleUseSpells)
            return (true)
        } else {
            return (false)
        }
    }

    const monsterWeakness = (monster) => {
        for (let effect of monster.statusEffects) {
            if (effect[0] === "Weakness") {
                if (effect[1] === 3){
                monster.damage = monster.damage/2
        } if (effect[1] === 1){
            monster.damage = monster.damage*2
        }}
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

        if (selectedSpell.name in singleUse) {
            if (singleUse[selectedSpell.name] === true) {
                setErrorMessage("You can only use that spell once per combat!")
                return [newMonster,newPlayer]
            } else {
                const updatedSingleUseSpells = {...singleUse}
                updatedSingleUseSpells[selectedSpell.name] = true
                setSingleUse(updatedSingleUseSpells)
            }
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
        console.log(monster)
        monsterWeakness(newMonster)

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
                    <div><div className="monster"><p>You encounter a {monster.name}!</p>
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