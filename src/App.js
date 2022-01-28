import React, { useState, useReducer } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Outlet, Link } from "react-router-dom";
import Landing from './components/Landing';
import spells from './data/spells.json'
import Market from './routes/Market';
import Woods from './routes/Woods';
import Spell from './components/Spell';
import Inventory from './components/Inventory'

// function reducer(spellState, action) {
//   switch (action.type) {
//     case 'purchase':
//       return { spell: state.owned = true }
//     case 'use':
//       return { spell: state.owned = false }
//   }
// }


function App() {
  //const [spellState, dispatch] = useReducer(reducer, {spellState.owned: false})
  const [nameInput, setNameInput] = useState([]);
  const [playerInv, setplayerInv] = useState([]);
  const [selectedSpell, setSelectedSpell] = useState([]);
  const [currentMonster, generateMonster] = useState(null);

  const monster = {id: 0,
    name: "minotaur",
  hp: 40,
  damage: 30}

  // function purchaseSpell() {
  //   dispatch({ type: 'purchase' })
  // }

  const allSpells = []
  for (let spell of spells){
    allSpells.push({
      id: spell.id,
      name: spell.name,
      damage: spell.damage,
      owned: spell.owned
    });
  };

  //useReducer hook
  const buySpell = (id) => {
    const newInv = playerInv.push((spell) => {
      if (spell.id === id) {
        if (spell.owned === false) {
          return {
            id: spell.id,
            name: spell.name,
            damage: spell.damage,
            owned: !spell.owned
          };
        }
      }
    })
    for (let spell of allSpells) {
      if (spell.owned) {
        newInv.push(spell)
      }
    }
    setplayerInv(newInv);
  };


  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Landing
    nameInput = {nameInput}
    setNameInput = {setNameInput} />} />
    <Route path="market" element={<Market
    playerName = {nameInput}
    allSpells = {allSpells}
    setSelectedSpell = {setSelectedSpell}
    selectedSpell = {selectedSpell} />} />
    <Route path="woods" element={<Woods
    monster = {monster}
    generateMonster = {generateMonster}
    currentMonster = {currentMonster}
    allSpells = {allSpells}
    setSelectedSpell = {setSelectedSpell}
    selectedSpell = {selectedSpell} />} />
    </Routes>
    </BrowserRouter>
  );
}


export default App;
