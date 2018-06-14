function allianceVersusMonster(healthPoints, attackDamage) {
    let warriors = Array(healthPoints.length - 1).fill()
                        .map( (el,i) => ({ health: healthPoints[i + 1], attack: attackDamage[i + 1] }));
    warriors.sort( (a,b) => b.attack - a.attack);
    let monster = { health: healthPoints[0], attack: attackDamage[0]};
    while( 
        monster.health > 0 
        && getNumOfAliveWarriors( warriors ) !== 0
    ) {
        playGame(monster, warriors);
    }
    return getNumOfAliveWarriors( warriors );
}

function getNumOfAliveWarriors( warriors ) {
    return warriors.reduce( (acum, curr) => curr.health > 0 ? acum + 1 : acum, 0)
}

function playGame( monster, warriors ) {
    for ( let warrior of warriors) {
        if ( warrior.health - monster.attack > 0) {
            let attackNum = Math.ceil(warrior.health / monster.attack - 1)
            monster.health -= warrior.attack * attackNum;
            warrior.health -= monster.attack * attackNum;
            return;
        } 
    }
    for ( let warrior of warriors) {
        if ( warrior.health > 0 ) {
            monster.health -= warrior.attack;
            if ( monster.health <= 0) return;
            warrior.health -= monster.attack;
            return;
        }
    }
}