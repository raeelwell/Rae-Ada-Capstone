const spellEffects = {"Poison Cloud": function(monster,player) {
    monster.hp = monster.hp-15
},
"Weakness": function(monster,player) {
    monster.damage = monster.damage/2
}}

export default spellEffects