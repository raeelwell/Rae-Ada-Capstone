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
    }}>Submit</button>
    </form>

    return (<div>
        <h1 className="welcome">Welcome to By The Moonlight</h1>
        <p className="story">This is a story about a young mage who wants nothing more than to be a powerful wizard.<br />
        Every day they browse the market stalls for new spells to buy.<br />
        By the moonlight, they journey into the unknown forest where they defeat monsters with their newfound power...</p>
        
        <div className ="createCharacter"><Portraits
        portraitIndex = {props.portraitIndex}
        setPortraitIndex = {props.setPortraitIndex}
        hideArrows = {false} /> <div className="form">{form}</div></div>

        <Link to="/market">Market</Link>
    <br />
    <Link to="/woods">Woods</Link>
        </div>)
};

export default Landing;