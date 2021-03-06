let a = [
    ["A","Q","A","H"], 
    ["A","X","V","W"], 
    ["A","L","T","I"], 
    ["T","T","J","I"]
]
let a_w =["AXOLOTL", 
 "TAXA", 
 "ABA", 
 "VITA", 
 "VITTA", 
 "GO", 
 "AXAL", 
 "LATTE", 
 "TALA"]
let a_a = ["AXAL", 
 "TALA", 
 "TAXA", 
 "VITTA"]

let b = [
    ["R","L","D"], 
    ["U","O","E"], 
    ["C","S","O"]
]
let b_w = ["CODE", 
 "SOLO", 
 "RULES", 
 "COOL"]
let b_a = ["CODE", "RULES"]

let c = [["G","T"], 
 ["O","A"]]
let c_w = ["TOGGLE", 
 "GOAT", 
 "TOO", 
 "GO"]
let c_a = ["GO", 
 "GOAT"]


function wordBoggle(board, words) {
    let possibleWords = [];
    words.forEach( word => {
        let lettersPositions = findLettersPositions(word, board)
        canMakeWord(lettersPositions) && possibleWords.push(word);
    })
    possibleWords.sort( (a,b) => a > b ? 1 : -1);
    return possibleWords;
}


function findLetterPositions(letter, board) {
    let positions = [];
    board.forEach( (row, i) => 
        row.forEach( (col, j) => col === letter && 
            positions.push({row: i, col: j, letter})
    ))
    return positions;
}

function findLettersPositions(word, board) {
    let positions = [];
    word.split('').forEach( letter => positions.push(findLetterPositions(letter, board)))
    return positions;
}

function canMoveToNextPosition(prevPosition, nextPosition) {
    if (!prevPosition) return true;
    if (
        withinOneCell(prevPosition, nextPosition) 
    ) return true;
    return false;
}

function satisfiesConstraint(wordIteration) {
    let lastPosition;
    let satisfies = true;
    if (arrayHasEqualObj(wordIteration)) {
        return false;
    }
    wordIteration.forEach( position => {
        if (!canMoveToNextPosition(lastPosition, position)) {
            satisfies = false;
        }
        lastPosition = position;
    })
    return satisfies;
}

function getNumOfIterations(lettersPositions) {
    let iterationsNum = 1;
    lettersPositions.forEach( (letPositions, i) => {
        iterationsNum *= letPositions.length;
    })
    return iterationsNum;
}

let getIterationsNum = (arrArr, lastIndex = arrArr.length - 1) => {
    let iterationsNum = 1;
    while (lastIndex >= 0) {
        iterationsNum *= arrArr[lastIndex].length;
        lastIndex --
    }
    return iterationsNum;
}

let findAllCombinations = (arrArr) => {
    let iterationsNum = getIterationsNum(arrArr)
    let combinations = Array(iterationsNum).fill().map( el => Array(arrArr.length).fill())
    const len= arrArr[0].length;
    arrArr.forEach( (arr, i) => {
        let k = 0;
        while( k < iterationsNum) {
            let step = getIterationsNum(arrArr, i - 1)
            arr.forEach(num => {
                for (let j = 0; j < step; j++) {
                    combinations[k][i] = num;
                    k ++
                }
            })
        }
    })
    return combinations
}

function canMakeWord(lettersPositions) {
    let yesWeCan = false;
    let allPossibleIterations = findAllCombinations(lettersPositions);
    if (arrayHas2EqualArrOfObj(allPossibleIterations)) throw 'array was repeated!!!!'
    allPossibleIterations.forEach( iteration => {
        if (satisfiesConstraint(iteration)) yesWeCan = iteration;
    })
    return yesWeCan ;
}

function withinOneCell(position1, position2) {
    let { row: row1, col: col1} = position1;
    let { row: row2, col: col2} = position2;
    if (
        (Math.abs(row1 -row2) <= 1 || Math.abs(row2 - row1) <= 1)
        &&
        (Math.abs(col1 - col2) <= 1 || Math.abs(col2 - col1) <=1)
        &&
        !( row1 === row2 && col1 === col2)
    ) return true;
    return false;
}

function didntMoveThere(nextPosition, previousPositions) {
    let didntMoveBefore = true;
    previousPositions.forEach( pos => {
        if ( 
            pos.row === nextPosition.row &&
            pos.col === nextPosition.col
        ) didntMoveBefore = false;
    })
    return didntMoveBefore;
}

function doesntInclude(objArr, obj) {
    let notIncludes = true;
    objArr.forEach( object => {
        let match = true;
        Object.keys(object).forEach( key => {
            if (object[key] !== obj[key]) match = false;
        })
        if (match) notIncludes = false;
    })
    return notIncludes;
}

function canMoveToNext(lastPositions, nextPositions, previousPositions) {
    let canMoveToPositions = [];
    lastPositions.forEach( lPos => {
        nextPositions.forEach( nPos => {
            if (
                withinOneCell(lPos, nPos)
                && didntMoveThere(nPos, previousPositions) 
                && doesntInclude(canMoveToPositions, nPos)
            ) {
                canMoveToPositions.push(nPos);
            }
        })
    })
    return canMoveToPositions.length ? canMoveToPositions : false;
}

function objectsEqual(obj1, obj2) {
    let equal = true;
    if (Object.keys(obj1).length !== Object.keys(obj2).length) equal = false;
    Object.keys(obj1).forEach( key => {
        if (obj1[key] !== obj2[key]) equal = false;
    })
    return equal && obj1;
}

function arrayHasEqualObj(arrOfObj) {
    let has = false;
    arrOfObj.forEach( (obj1, i) => {
        arrOfObj.forEach( (obj2, j) => {
            if (i !== j && objectsEqual(obj1, obj2)) {
                has = true;
            }
        })
    })
    return has;
}

//##################
function arraysOfObjEqual(arr1, arr2) {
    let equal = true;
    arr1.forEach( (obj, i) => {
        if (!objectsEqual(obj, arr2[i])) equal = false;
    })
    return equal;
}

function arrayHas2EqualArrOfObj(arrArr) {
    let has = false;
    arrArr.forEach( (arr1, i) => {
        arrArr.forEach( (arr2, j) => {
            if ( 
                i !== j &&
                arraysOfObjEqual(arr1, arr2)
            ) has = true;
        })
    })
    return has;
}

console.log(a_a, wordBoggle(a, a_w))
// console.log(b_a, wordBoggle(b, b_w))
// console.log(c_a, wordBoggle(c, c_w))
// console.log(d_a, wordBoggle(d, d_w))