import React from 'react';
import './ActionLog.css'

const ActionLog = (props) => {

    const castReturnStatement = () => {
        if (props.selectedSpell.name === "Throw Rock") {
            return(<div className="partOne">You pick up a rock and throw it! It deals 10 damage (...it was a big rock).<br /><br />
            <center><b>Monster HP is now {props.currentMonster.hp}.<br /></b></center><br /></div>)
        }
        if (props.selectedSpell.name === "Cleansing Water") {
            return(<div className="partOne">You recover your HP with {props.selectedSpell.name}!<br /><br />
            <center><b>Monster HP is {props.currentMonster.hp}.<br /></b></center><br /></div>)
        };
        if (props.selectedSpell.name === "Weakness") {
            return(<div className="partOne">You cast {props.selectedSpell.name} before the {props.currentMonster.name} could react! The monster's damage will be {props.currentMonster.damage} for the next two turns.<br /><br />
            <center><b>Monster HP is now {props.currentMonster.hp}.<br /></b></center><br /></div>)
        };
        if (props.selectedSpell.name === "Mana Ward") {
            return(<div className="partOne">You cast {props.selectedSpell.name}! The monster will not damage you for 2 turns.<br /><br />
            <center><b>Monster HP is now {props.currentMonster.hp}.<br /></b></center><br /></div>)
        };
        return(<div className="partOne">You cast {props.selectedSpell.name}! It does {props.selectedSpell.damage} damage.<br /><br />
            <center><b>Monster HP is now {props.currentMonster.hp}.<br /></b></center><br /></div>)
    };

    const monsterReturnStatement = () => {
        if (props.currentMonster.hp > 0) {
            for (let status of props.currentMonster.statusEffects) {
                if (status[0] === "Mana Wall") {
                    return(<div className="partTwo">The monster cannot damage you due to your Mana Wall!<br /><br />
                    <b><center>Your HP remains at {props.player.hp}</center></b></div>)
                };
                if (status[0] === "Weakness") {
                    return(<div className="partTwo">The monster's damage is halved due to Weakness!<br /><br />
                    <center><b>Your HP is now {props.player.hp}.</b></center></div>)
                };
            };
            if (props.selectedSpell.name !== "Cleansing Water" && props.selectedSpell.name !== "Mana Wall"){
                return (<div className="monsterAttack">The monster strikes back at you, doing {props.currentMonster.damage} damage!<br /><br />
                <center><b>Your HP is now {props.player.hp}.</b></center></div>)
            } else {
                return (<div className="monsterAttack">You used {props.selectedSpell.name} before the monster could react.<br /><br />
                <center><b>Your current HP is {props.player.hp}.</b></center></div>)
            }


        }}

    return (
        <div className="action">
            {castReturnStatement()}
            {monsterReturnStatement()}
        </div>
    )
}

export default ActionLog;