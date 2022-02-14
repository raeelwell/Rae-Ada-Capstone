import React, { useState } from 'react';
import './Landing.css'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { Link } from "react-router-dom";
import Portraits from './Portraits'

const Landing = (props) => {
    let navigate = useNavigate();

    const form = <form className="nameEntry" onSubmit={(e) => {
        e.preventDefault();
    }}>
        <p>Enter A Name</p>
    <label htmlFor='NameInput'>
    <input 
    id="name-submission" 
    value = {props.nameInput}
    onChange ={(e) => {
        props.setNameInput(e.target.value);
        }} />
    </label>
    <button className = 'submit-button'
    onClick={() => {
        navigate("/Market");
    }}>Begin Game</button>
    </form>

    return (<div className="page">
        <h1 className="welcome">Welcome to By The Moonlight</h1>
        <div className="intro">        
        <div className ="createCharacter"><Portraits
        portraitIndex = {props.portraitIndex}
        setPortraitIndex = {props.setPortraitIndex}
        hideArrows = {false} /> <div className="form">{form}</div></div>
        <div className="story"><center><b>This is a story about a young mage who wants nothing more than to be a powerful wizard.<br />
        Every day they browse the market stalls for new spells to buy.<br /><br />
        By the moonlight, they journey into the unknown forest and defeat monsters with their newfound power...</b></center>
        <ul><li>The objective of this game is to buy the final spell, "Essence of Victory" in the fewest number of days possible.</li><br />
        <li>Defeating monsters drops gold, which is used to purchase spellbooks.</li><br />
        <li>Monsters do not damage you on the turn you use an Interrupt spell.</li><br />
        <li>Your attack hits before the monster's attack - if your attack defeats the monster, they will not damage you.</li></ul></div></div>
        </div>)
};

export default Landing;