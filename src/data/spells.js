const spells = [{"id": 0,
    "name": "Throw Rock",
    "damage": 10,
    "cost": 0,
    "owned": true,
    "description": "Throws a rock at the enemy for 10 points of damage",
    "function": function(monster,player){
        if (monster.hp - 10 > 0) {
            monster.hp = monster.hp - 10
        } else {
                monster.hp = 0
        }}
    },
{"id": 1,
    "name": "Fireball",
    "damage": 40,
    "cost": 40,
"owned": false,
"description": "Casts a fireball spell for 40 points of damage",
"function": function(monster,player){
    if (monster.hp - 40 > 0) {
        monster.hp = monster.hp - 40
    } else {
            monster.hp = 0
        }}},
{"id": 2,
    "name": "Lightning",
    "damage": 30,
    "cost": 30,
    "owned": false,
    "description": "Casts a lightning spell for 30 points of damage",
    "function": function(monster,player){
    if (monster.hp - 30 > 0) {
        monster.hp = monster.hp - 30
    } else {
            monster.hp = 0
        }}},
{"id": 3,
    "name": "Biting Wind",
    "damage": 20,
    "cost": 20,
    "owned": false,
    "description": "Casts a wind storm spell for 20 points of damage",
    "function": function(monster,player){
    if (monster.hp - 20 > 0) {
        monster.hp = monster.hp - 20
    } else {
            monster.hp = 0
        }}},
{"id": 4,
    "name": "Cleansing Water",
    "damage": 0,
    "cost": 60,
    "owned": false,
    "description": "Interrupt. Uses healing magic to restore all of your HP (once per combat)",
    "function": function(monster,player){
    player.hp = 50 + monster.damage}},
{"id": 5,
    "name": "Poison Cloud",
    "damage": 0,
    "cost": 70,
    "owned": false,
    "description": "Engulfs the foe in a poison cloud which does 15 damage for the next 4 turns",
    "function": function(monster,player){
        monster.statusEffects = monster.statusEffects.filter(effect => effect[0] !== "Poison Cloud")
        monster.statusEffects.push(["Poison Cloud", 4])
        console.log(monster)
    }},
{"id": 6,
    "name": "Weakness",
    "damage": 0,
    "cost": 45,
    "owned": false,
    "description": "Weakens the foe, halving its damage for the next two turns",
    "function": function(monster,player){
        monster.statusEffects = monster.statusEffects.filter(effect => effect[0] !== "Weakness")
        monster.statusEffects.push(["Weakness", 3])
        console.log(monster)
    }},
    {"id": 7,
    "name": "Blood Siphon",
    "damage": 16,
    "cost": 55,
    "owned": false,
    "description": "Siphons energy from your foe, healing you for half of your damage dealt",
    "function": function(monster,player){
        if (monster.hp - 16 > 0) {
            monster.hp = monster.hp - 16
            player.hp = player.hp + 8
        } else {
                monster.hp = 0
            }}},
    {"id": 8,
    "name": "Mana Wall",
    "damage": 0,
    "cost": 40,
    "owned": false,
    "description": "Interrupt. Creates a wall of mana around you, making you invulnerable for the next two turns (once per combat). Upon the end of the effect, monster attack triples.",
    "function": function(monster,player){
        player.hp = player.hp + monster.damage
        monster.statusEffects = monster.statusEffects.filter(effect => effect[0] !== "Mana Wall")
        monster.statusEffects.push(["Mana Wall", 3])
        console.log(monster)}},
    {"id": 9,
    "name": "Avarice",
    "damage": 0,
    "cost": 50,
    "owned": false,
    "description": "Doubles the amount of gold in the monster's possession. Once per combat",
    "function": function(monster,player){
        monster.gold = monster.gold*2
        console.log(monster)}},
    {"id": 10,
    "name": "Essence of Victory",
    "damage": 0,
    "cost": 300,
    "owned": false,
    "description": "The final spell in the shop - purchasing this makes you a master wizard and wins the game",
    "function": function(monster,player){
        console.log("Game won")
    }}
];

export default spells;

// change to spells.js, in each object have a spell function that executes, general damage function
//each spell has monster,player input and monster,player output and modifies monster,player based on spell effects
//spells do player half of the turn, apply effects during function

//option 1; monster/player have effects attribute that is an empty list
//list is filled as spells with (effect, #ofTurns)
//combat goes current spell function > effect function > monster damage function
//current spell function is the function attribute to spell in spells.js and executes simple damage/hp recovery/etc, and adds effects
//check #ofTurns and if zero, remove from effects list, then decrement
//effect function calls an object with spell names as keys and spell functions as values
//ex: {poison cloud : customFunction(monster, player) //could add hp to player to seem like monster damage reduced

