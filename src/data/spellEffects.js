const spellEffects = {"Poison Cloud": function(monster,player) {
    monster.hp = monster.hp-15
},
"Weakness": function(monster,player) {
    if (monster.statusEffects[0][1] === 3) {
    monster.damage = monster.damage/2
}
if (monster.statusEffects[0][1] === 1) {
    monster.damage = monster.damage*2
}},
"Sharpened Senses": function(monster,player) {
    if (player.statusEffects[0][1] === 3) {
    
}
if (monster.statusEffects[0][1] === 1) {
    monster.damage = monster.damage*2
}}
}

export default spellEffects