import '../App.css';
import { useParams, useNavigate } from "react-router-dom";
import React from 'react';
import Inventory from '../components/Inventory'
import Stats from '../components/Stats'
import spells from '../data/spells'
import SpellDisplay from '../components/SpellDisplay';

const Market = (props) => {
    let navigate = useNavigate();

    console.log(props.player.gold)
    let haveSpell = true
    
    const buyButton = <button className = 'buy-button'
    onClick={(e) => {
        if (props.buySpell(props.selectedSpell.id, props.player) === false) {
            console.log("cannot buy spell")
            let haveSpell = false
        }
        props.generatePlayerInv()
    }}>Purchase</button>

    const noSpell = (haveSpell) => {
        if (haveSpell === false) {
            return (<p>You cannot afford that spell!</p>)
        }
    }

    //this does not work
    const checkSpellsInInventory = (player) => {
        console.log(player.spells.playerInv)
        if (player.spells.playerInv === []) {
            console.log("Player Inventory has nothing")
        } else {
            props.setSelectedSpell(null)
            navigate("/Woods");
        }
    }

    const woodsButton = <button className = 'woods-button'
    onClick={() => {
        console.log(props.player)
        checkSpellsInInventory(props.player)
    }}>Go Into The Woods</button>

    const shopInventory = () => {
        return (<Inventory allSpells = {props.allSpells}
        setSelectedSpell = {props.setSelectedSpell}
        selectedSpell = {props.selectedSpell} />)
    }

    const playerInventory = () => {
        return (<Inventory allSpells = {props.playerInv}
            setSelectedSpell = {props.setSelectedSpell}
            selectedSpell = {props.selectedSpell} />)
    }

    const ifSpellSelected = (spell) => {
        if (spell) {
            return <SpellDisplay spell = {props.selectedSpell} />
        }
    }

    return (<div><p>This is the Market page.</p>
        <Stats
        player = {props.player} />
        {shopInventory()}
        {playerInventory()} <br />
        {ifSpellSelected(props.selectedSpell)}
        {noSpell(haveSpell)}
        {buyButton} <br />
        {woodsButton}
        </div>)
    
}

export default Market;