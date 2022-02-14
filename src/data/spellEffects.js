const spellEffects = {"Poison Cloud": function(monster,player,effect) {
    monster.hp = monster.hp-15
    if (monster.hp <= 0) {
        monster.hp = 0
    }
},
"Weakness": function(monster,player,effect) {
//     if (effect[1] === 3) {
//     monster.damage = monster.damage/2
// }
// if (effect[1] === 1) {
//     monster.damage = monster.damage*2
// }
},
"Mana Wall": function(monster,player,effect) {
    if (monster.hp !== 0) { 
        if (effect[1] === 2) {
            monster.damage = monster.damage*3
        }
        if (effect[1] < 4 && effect[1] > 1 ) {
            player.hp = player.hp + monster.damage
}}
}
}

export default spellEffects