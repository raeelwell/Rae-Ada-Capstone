import React, { useState, useReducer, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Landing from './components/Landing';
import spells from './data/spells.json'
import Market from './routes/Market';
import Woods from './routes/Woods';
import Spell from './components/Spell';
import Inventory from './components/Inventory'

const allSpells = []
for (let spell of spells){
  allSpells.push({
    id: spell.id,
    name: spell.name,
    damage: spell.damage,
    cost: spell.cost,
    owned: spell.owned,
    description: spell.description
  });
};

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

function App() {
  const [nameInput, setNameInput] = useState('');
  const [spells, setSpells] = useState(allSpells.slice(1));
  const [playerInv, setPlayerInv] = useState([allSpells[0]]);
  const [selectedSpell, setSelectedSpell] = useState(null);
  const [currentMonster, setMonster] = useState(null);
  const [playerState, setPlayerState] = useState(null);
  const [playerGold, setPlayerGold] = useState(50);
  const [actionLogDisplay, setActionLog] = useState([])
  const [portraitIndex, setPortraitIndex] = useState(getRndInteger(0,48))
  const [monsterMultiplier, setMonsterMultiplier] = useState(1);
  const [narrative, setNarrative] = useState('')

  useEffect(() => setPlayerState({id: 0,
    name: {nameInput},
  hp: 50,
  spells: {playerInv},
  gold: {playerGold},
}), 
  [nameInput, playerInv, playerGold])

  const buySpell = (id, player) => {
    setSpells(spells.map(spell => {
      if (spell.id === id) {
        if (player.gold.playerGold >= spell.cost) {
        spell.owned = true
        setPlayerGold(player.gold.playerGold - spell.cost)
      }}
      return spell;
    }));
  };

  const generatePlayerInv = () => {
    let spellList = []
    for (let spell of allSpells) {
      if (spell.owned === true) {
        spellList.push(spell)
      }
    }
    setPlayerInv(spellList);
  };
  
  const resetSpells = () => {
    let spellList = []
    for (let spell of allSpells) {
      spell.owned = false
      spellList.push(spell)
      }
    setSpells(spellList)
  }


  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Landing
    playerState = {playerState}
    portraitIndex = {portraitIndex}
    setPortraitIndex = {setPortraitIndex}
    nameInput = {nameInput}
    setNameInput = {setNameInput} />} />
    <Route path="market" element={<Market
    portraitIndex = {portraitIndex}
    player = {playerState}
    playerName = {nameInput}
    allSpells = {allSpells}
    playerInv = {playerInv}
    setSelectedSpell = {setSelectedSpell}
    selectedSpell = {selectedSpell}
    buySpell = {buySpell}
    generatePlayerInv = {generatePlayerInv}
    playerGold = {playerGold}
    setPlayerGold = {setPlayerGold} />} />
    <Route path="woods" element={<Woods
    monsterMultiplier = {monsterMultiplier}
    setMonsterMultiplier = {setMonsterMultiplier}
    portraitIndex = {portraitIndex}
    setMonster = {setMonster}
    currentMonster = {currentMonster}
    allSpells = {allSpells}
    setSelectedSpell = {setSelectedSpell}
    selectedSpell = {selectedSpell}
    player = {playerState}
    playerState = {playerState}
    //two player objects here are the same ^
    setPlayerState = {setPlayerState}
    actionLogDisplay = {actionLogDisplay}
    setActionLog = {setActionLog}
    playerInv = {playerInv}
    setPlayerInv = {setPlayerInv}
    setPlayerGold = {setPlayerGold}
    resetSpells = {resetSpells} />} />
    </Routes>
    </BrowserRouter>
  );
}


export default App;
