import '../App.css';
import { useParams, useNavigate } from "react-router-dom";
import app from '../App'
import React from 'react';
import Inventory from '../components/Inventory'
import spells from '../data/spells'

const Market = (props) => {
    let navigate = useNavigate();
    
    const buyButton = <button className = 'buy-button'
    onClick={(e) => {
        console.log(props.selectedSpell)
    }}>Purchase</button>

    const woodsButton = <button className = 'woods-button'
    onClick={() => {
        navigate("/Woods");
    }}>Go Into The Woods</button>

    return (<div><p>This is the Market page. Your name is {props.playerName}</p>
        <Inventory allSpells = {props.allSpells}
        setSelectedSpell = {props.setSelectedSpell}
        selectedSpell = {props.selectedSpell} />
        {buyButton} <br />
        {woodsButton}
        </div>)
    
}

export default Market;