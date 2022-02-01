import '../App.css';
import { useParams, useNavigate } from "react-router-dom";
import React from 'react';
import Inventory from '../components/Inventory'
import Stats from '../components/Stats'
import spells from '../data/spells'
import SpellDisplay from '../components/SpellDisplay';

const Market = (props) => {
    let navigate = useNavigate();
    
    const buyButton = <button className = 'buy-button'
    onClick={(e) => {
        props.buySpell(props.selectedSpell.id)
        //use UseEffect, when allSpells changes calls generatePlayerInv in useEffect
        props.generatePlayerInv()
    }}>Purchase</button>

    const woodsButton = <button className = 'woods-button'
    onClick={() => {
        navigate("/Woods");
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
        {buyButton} <br />
        {woodsButton}
        </div>)
    
}

export default Market;