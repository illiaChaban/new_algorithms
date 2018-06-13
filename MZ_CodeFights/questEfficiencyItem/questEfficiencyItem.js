function questEfficiencyItem(h, points, timeForQuests) {
    let hours = h.map( el => [el, 0]);
    let allChoices = getAllCombinations(hours);
    let allPointsPossible = allChoices.map( choice => 
            satisfies(choice, timeForQuests) ?
                choice.reduce( (acum, curr, i) => curr ? acum + points[i] : acum  , 0) :
                0);
    return Math.max( ...allPointsPossible);
}

function satisfies(combination, timeForQuests) {
    return combination.reduce( (a,b) => a + b) <= timeForQuests;
}

function getAllCombinations( arrArr ) {
    let allCombs = [[]];
    for ( let arr of arrArr) {
        let dummy = [];
        for ( let j of arr ) {
            for ( let x of allCombs) {
                dummy.push( x.concat( [j]))
            }
        }
        allCombs = dummy
    }
    return allCombs;
}