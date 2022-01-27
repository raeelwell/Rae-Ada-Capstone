import '../App.css';
import React from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Landing from '../components/Landing';

const Woods = () => {
    let navigate = useNavigate();

    const marketButton = <button className = 'market-button'
    onClick={() => {
        navigate("/Market");
    }}>Back to the Market</button>

    const landingButton = <button className = 'landing-button'
    onClick={() => {
        navigate("/");
    }}>Restart</button>

    return (<header className="App-header">
        <h1>This is the Woods Page</h1>
        {marketButton}
        {landingButton}
        </header>)
}

export default Woods;