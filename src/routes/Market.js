import '../App.css';
import { useParams, useNavigate } from "react-router-dom";
import React from 'react';
import Inventory from '../components/Inventory'
import spells from '../data/spells'

const Market = (props) => {
    let navigate = useNavigate();
    
    const buyButton = <button className = 'buy-button'
    onClick={(e) => {
        console.log(props.selectedSpell)
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

    return (<div><p>This is the Market page. Your name is {props.playerName}</p>
        {shopInventory()}
        {playerInventory()}
        {buyButton} <br />
        {woodsButton}
        </div>)
    
}

export default Market;