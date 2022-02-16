import './Market.css';
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import Inventory from '../components/Inventory'
import Stats from '../components/Stats'
import SpellDisplay from '../components/SpellDisplay';
import Portraits from '../components/Portraits';

const Market = (props) => {

    const generateMarketInv = () => {
        let spellList = []
        for (let spell of props.allSpells) {
            if (spell.owned === false) {
            spellList.push(spell)
        }}
        return spellList;
    };

    let navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const [marketInv, setMarketInv] = useState(generateMarketInv());
    const [winCheck, setWinCheck] = useState(false)

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

    const buyButton = <button className = "woodsButtons"
    onClick={(e) => {
        if (props.player.gold.playerGold < props.selectedSpell.cost) {
            setErrorMessage("You cannot afford that spell!")
            return;
        }
        if (props.selectedSpell.owned === true) {
            setErrorMessage("You already own that spell!")
            return;
        }
        props.buySpell(props.selectedSpell.id, props.player)
        props.generatePlayerInv()
        setMarketInv(generateMarketInv())

        if (props.selectedSpell.name==="Essence of Victory"){
            setWinCheck(true)
            setErrorMessage(`🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉 Congratulations, you are now a master wizard! Your day count is ${props.turnCount}. Play again and try to get a lower day count!`)
        }
    }}>Purchase</button>

    const checkSpellsInInventory = (player) => {
        if (player.spells.playerInv.length  === 0) {
            setErrorMessage("It's too dangerous to go into the woods without a spell! You should purchase a spell first!")
        } else {
            props.setSelectedSpell(null)
            setErrorMessage('')
            navigate("/Woods");
        }
    }

    const woodsButton = <button className = "woodsButtons"
    onClick={() => {
        checkSpellsInInventory(props.player)
    }}>Go Into The Woods</button>

    const shopInventory = () => {
        return (<Inventory allSpells = {marketInv}
        setSelectedSpell = {props.setSelectedSpell}
        selectedSpell = {props.selectedSpell} />)
    }

    const playerInventory = () => {
        return (<Inventory allSpells = {props.playerInv}
            setSelectedSpell = {props.setSelectedSpell}
            selectedSpell = {props.selectedSpell} />)
    }

    const ifSpellSelected = (spell, errorMessage) => {
        if (spell) {
            return <SpellDisplay spell = {props.selectedSpell} />
        } else {
            return <p>Select a spell from the shop.<br />
            Use the purchase button to buy the spell.<br /><br />
            Your current day count is {props.turnCount}.</p>}
        }

    return (<React.Fragment><main><div className="page"><h1 className= "welcome">Welcome to the Market!</h1>
        <div className="oneLine">
        <div className ="statsBlock">
            <Portraits
            hideArrows = {true}
            portraitIndex = {props.portraitIndex} />
            <Stats player = {props.player} />
            <div className="selectedSpell">{ifSpellSelected(props.selectedSpell)}</div>
            </div>
            <div className="oneColumn">
            <div className="inventory">
                <div className="bothInventories">
                <div className="shopInventory"><p><b>Shop Books</b></p>{shopInventory()}</div>
                <div className="playerInventory"><p><b>Your Bookbag</b></p>{playerInventory()}</div>
                </div>
            <div className="buyButton">{buyButton}</div></div>
            { errorMessage? <div className="errorMessage">{errorMessage}</div>: <div></div>}
            <div className="buttonBlock">
            { winCheck ? <div>{landingButton}</div> : <div></div>}
            {woodsButton}</div></div>
        </div>
        </div>
    </main>
    </React.Fragment>)
};

export default Market;