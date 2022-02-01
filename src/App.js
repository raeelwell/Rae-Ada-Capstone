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
    owned: spell.owned
  });
};

function App() {
  const [nameInput, setNameInput] = useState('');
  const [spells, setSpells] = useState(allSpells);
  const [playerInv, setplayerInv] = useState([]);
  const [selectedSpell, setSelectedSpell] = useState(allSpells[0]);
  const [currentMonster, generateMonster] = useState(null);
  const [playerState, setPlayerState] = useState(null);
  //const [monsterHP, setMonsterHP] = useState(null);
  const [actionLogDisplay, setActionLog] = useState([])

  const monster = {id: 0,
    name: "minotaur",
  hp: 40,
  damage: 30}

  useEffect(() => setPlayerState({id: 0,
    name: {nameInput},
  hp: 50,
  spells: {playerInv},
  gold: 50}), [nameInput, playerInv])

  const buySpell = (id) => {
    setSpells(spells.map(spell => {
      if (spell.id === id) {
        spell.owned = true
      }
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
    setplayerInv(spellList);
  };


  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Landing
    nameInput = {nameInput}
    setNameInput = {setNameInput} />} />
    <Route path="market" element={<Market
    player = {playerState}
    playerName = {nameInput}
    allSpells = {allSpells}
    playerInv = {playerInv}
    setSelectedSpell = {setSelectedSpell}
    selectedSpell = {selectedSpell}
    buySpell = {buySpell}
    generatePlayerInv = {generatePlayerInv} />} />
    <Route path="woods" element={<Woods
    monster = {monster}
    generateMonster = {generateMonster}
    currentMonster = {currentMonster}
    allSpells = {allSpells}
    setSelectedSpell = {setSelectedSpell}
    selectedSpell = {selectedSpell}
    player = {playerState}
    playerState = {playerState}
    setPlayerState = {setPlayerState}
    // monsterHP = {monsterHP}
    // setMonsterHP = {setMonsterHP}
    actionLogDisplay = {actionLogDisplay}
    setActionLog = {setActionLog}
    playerInv = {playerInv} />} />
    </Routes>
    </BrowserRouter>
  );
}


export default App;
