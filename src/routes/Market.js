import './Market.css';
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import Inventory from '../components/Inventory'
import Stats from '../components/Stats'
import spells from '../data/spells'
import SpellDisplay from '../components/SpellDisplay';

const Market = (props) => {
    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');

    const buyButton = <button className = "buttons"
    onClick={(e) => {
        if (props.player.gold.playerGold < props.selectedSpell.cost) {
            setErrorMessage("You cannot afford that spell!")
        }
        props.buySpell(props.selectedSpell.id, props.player)
        props.generatePlayerInv()
    }}>Purchase</button>

    const checkSpellsInInventory = (player) => {
        console.log(player.spells.playerInv)
        if (player.spells.playerInv.length  === 0) {
            console.log("error - no spells in inventory")
            setErrorMessage("It's too dangerous to go into the woods without a spell! You should purchase a spell first!")
        } else {
            props.setSelectedSpell(null)
            setErrorMessage('')
            navigate("/Woods");
        }
    }

    const woodsButton = <button className = 'buttons'
    onClick={() => {
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

    return (<React.Fragment><h1 className= "welcome">Welcome to the Market!</h1>
    <header>
        <Stats
        player = {props.player} />
    </header>
    <main>
        <div className="inventory">
        <div className="shopInventory"><p>Shop Books</p>{shopInventory()}</div>
        <div className="playerInventory"><p>Your Bookbag</p>{playerInventory()}</div>
        </div>
        <div className="selectedSpell">{ifSpellSelected(props.selectedSpell)}</div>
        <div className="errorMessage">{errorMessage}</div>
        <div className="buttons">{buyButton}</div>
        <div className="buttons">{woodsButton} </div>
    </main>
    </React.Fragment>)
}

export default Market;