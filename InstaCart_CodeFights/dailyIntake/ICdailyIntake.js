function dailyIntake(caloricValue) {
    let itemsArrArr = getAllClosest(caloricValue);
    itemsIndexesArr = itemsArrArr.map( x => x.reduce( (acum, curr, i) => {
        if ( curr ) acum.push(i);
        return acum;
    }, []));
    // console.log(itemsIndexesArr)
    if ( itemsIndexesArr.length > 1) { 
        itemsIndexesArr = getLexSmallest(itemsIndexesArr);
        return itemsIndexesArr;
    }
    console.log(itemsIndexesArr)
    return itemsIndexesArr[0];
}


function getLexSmallest(itemsArrArr) {
    console.log(itemsArrArr)
    return itemsArrArr.reduce( (acum, curr) => {
        if (acum.length <= curr.length) return curr;
        return acum;
    }, [])
}

function getAllClosest(caloricValue) {
    let closestCalorieDiff = 2000;
    let itemsArrArr = caloricValue.map( value => [value, 0]);
    let closestArr = [];
    let allCombs = findAllCombinations( itemsArrArr);
    allCombs.forEach( comb => {
        let calories = comb.reduce( (a,b) => a + b);
        let diff = Math.abs( 2000 - calories);
        if ( diff === closestCalorieDiff ) {
            closestArr.push(comb);
        } else
        if ( diff < closestCalorieDiff) {
            closestCalorieDiff = diff;
            closestArr = [];
            closestArr.push( comb );
        }
    })
    return closestArr;
    
}

let findAllCombinations = (arrArr) => {
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