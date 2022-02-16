import './Woods.css';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Monster from '../components/Monster'
import Inventory from '../components/Inventory'
import ActionLog from '../components/ActionLog'
import Stats from '../components/Stats'
import SpellDisplay from '../components/SpellDisplay';
import monsterNameList from '../data/monsters.json'
import Portraits from '../components/Portraits';
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
        let defaultGold = 10
        for (let spell of player.spells.playerInv) {
                totalCost += spell.cost
            };
            if (totalCost*multiplier < 30) {
                totalCost = 30
            };
            if (props.turnCount === 1) {
                defaultGold = 30
            };
        let HpCap = (totalCost*0.6)*multiplier
        if ((totalCost*0.6)*multiplier > 220) {
            HpCap = 220
        };
        return ({name: monsterNameList[getRndInteger(0,30)],
        hp: Math.round(getRndInteger(30*multiplier,HpCap)),
        damage: Math.round(getRndInteger(15*multiplier,(50/3)*multiplier)), 
        gold: getRndInteger(defaultGold,40),
        statusEffects: []
    })
};
    const monster = createMonster(props.player, props.monsterMultiplier)

    const marketButton = <button className = 'woodsButtons'
    onClick={() => {
        props.player.hp = 50
        props.setActionLog([])
        props.setSelectedSpell(null)
        navigate("/Market");
        props.setMonsterMultiplier(props.monsterMultiplier+0.1)
        const newTurnCount = props.turnCount
        props.setTurnCount(newTurnCount+1)
        props.setMonster(null)
    }}>Back to the Market</button>

    const landingButton = <button className = 'woodsButtons'
    onClick={() => {
        props.setPlayerGold(0)
        props.resetSpells()
        props.setPlayerInv([props.allSpells[0]])
        props.setMonster(null)
        props.setActionLog([])
        props.setSelectedSpell(null)
        props.setMonsterMultiplier(1)
        props.setTurnCount(1)
        navigate("/");
    }}>Restart</button>

    const goButton = <button className = 'woodsButtons'
    onClick={() => {
        props.setMonster(monster);
        props.setActionLog([])
    }}>Keep Going</button>

    const castButton = <button className = 'woodsButtons'
        onClick={(e) => {
        const actionResult = generateAction(props.currentMonster, props.selectedSpell, props.player)
            props.setActionLog(<ActionLog 
                goButton = {props.goButton}
                currentMonster = {actionResult[0]}
                selectedSpell = {props.selectedSpell}
                player = {actionResult[1]}/>)
            props.setPlayerState(actionResult[1])
            props.setMonster(actionResult[0])
    }}>Cast Spell</button>

    const effects = (monster,player) => {
        if (monster.statusEffects.length > 0) {
            for (let effect in monster.statusEffects) {
                spellEffects[monster.statusEffects[effect][0]](monster,player,monster.statusEffects[effect])
                monster.statusEffects[effect][1] = monster.statusEffects[effect][1]-1
            }
        }
        monster.statusEffects = monster.statusEffects.filter(effect => effect[1] > 0)
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
                monster.damage = Math.round(monster.damage/2)
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

        monsterWeakness(newMonster)

        if (newPlayer.hp > 50) {
            newPlayer.hp = newPlayer.hp-newMonster.damage
        }

    return ([newMonster, newPlayer])
};

    const ifMonster = (monster, player) => {
        if (player.hp <= 0) {
            return (<React.Fragment>
                <div className="monster">
                    The monster has killed you. Game over.<br /><br />
                    You tragically met your fate on <b>day {props.turnCount}</b> of your adventure.<br /><br />
                    To play again, press the Restart button.
                </div><br />
                <div className = "buttonBlock">{landingButton}</div>
                </React.Fragment>
            );
        } else {
        if (monster) {
            if (monster.hp >= 1) {
                return (
                    <div><div className="monster"><p>You encounter a {monster.name}!</p>
                    <Monster
                        key={monster.id}
                        name={monster.name}
                        damage={monster.damage}
                        hp={monster.hp}
                        gold={monster.gold}
                        statusEffects= {monster.statusEffects} /></div>
                        </div>
                );
            } else {
                return (<React.Fragment><div className="monster">Congratulations, you killed the monster! 
                The monster has dropped <b>{props.currentMonster.gold} gold</b>.
                <br /><br />
                You can return to the Market to recover your HP 
                and buy more spellbooks, or if you are feeling adventurous, 
                you can keep going for another monster encounter!
                </div>
                <div className="buttonBlock">{marketButton}
                {goButton}</div></React.Fragment>
                )
            }
        } else {
            return (<div></div>)
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
            return <p>Push the Keep Going button to find a monster. <br /><br />
            Returning to the Market restores your HP to full.<br />
            It also makes monsters slightly stronger.<br /><br />
            You cannot return to the market while in combat.</p>
        }
    }

    const playerInventory = () => {
        return (<Inventory allSpells = {props.playerInv}
            setSelectedSpell = {props.setSelectedSpell}
            selectedSpell = {props.selectedSpell} />)
    }


    return (<React.Fragment><div className ="page"><h1 className= "welcome">By The Moonlight, you wander into the woods</h1>
    <div>
            <div className="oneLine">
            <div className="statsBlock">
                <Portraits
                hideArrows = {true}
                portraitIndex = {props.portraitIndex} />
                <Stats player = {props.player} />
                <div className="selectedSpell">{ifSpellSelected(props.selectedSpell)}</div>
                </div>
            <div className="secondColumn">
                <div className="woodsInventory"><center>Your Bookbag</center><br />{playerInventory()}</div>
                { props.currentMonster? props.currentMonster.hp !== 0? 
                    <div className="buttonBlock"> {castButton}</div>: <div></div>: <div className="buttonBlock">{marketButton}
                {goButton}</div>}
                <div className="twoColumns">
                    { errorMessage? <div className="errorMessage">{errorMessage}</div>: <div className="actionLog">{ifActionLog(props.actionLogDisplay)}</div> }
                    </div>
                </div>
            
            <div className="thirdColumn">{ifMonster(props.currentMonster, props.player)}</div>
            </div>
        </div>
        </div>
        </React.Fragment>)
}

export default Woods;