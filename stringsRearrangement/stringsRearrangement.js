function stringsRearrangement(inputArray) {
    let allCombinations = getAllCombinations(inputArray);
    let length = allCombinations.length
    let subLength = inputArray.length;
    for (let i = 0; i < length; i++) {
        let combination = allCombinations[i];
        let canRearrange = true;
        for (let j = 0; j < subLength; j++) {
           if (
               combination[j+1]
               && !stringsDiffByOne(combination[j], combination[j+1])
           ) canRearrange = false;
        }
        if (canRearrange) return true;
    }
    return false;
}

function getAllCombinations(arr) {
    let allCombinations = [];
    for (let i = 0; i < arr.length; i++) {
        let copy = arr.slice();
        copy.splice(i,1);
        copy.unshift(arr[i]);
        if (arr.length === 2) {
            allCombinations.push(copy);
        } else {
            let newArr = copy.slice(1);
            let combinations = getAllCombinations(newArr);
            combinations = combinations.map( numArr => {
                numArr.unshift(copy[0]);
                return numArr;
            })            
            allCombinations = allCombinations.concat(combinations);
        }
    }
    return allCombinations;
}

function stringsDiffByOne(a,b) {
    let count = 0;
    a.split('').forEach( (char, i) => {
        if (char !== b.split('')[i]) count ++
    })
    console.log(count)
    return count === 1 ? true : false;
}

let a = ["q", 
"q"];

console.log(stringsRearrangement(a));