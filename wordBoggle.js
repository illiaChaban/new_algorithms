let a = [["A","Q","A","H"], 
 ["A","X","V","W"], 
 ["A","L","T","I"], 
 ["T","T","J","I"]]
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
    // console.log(words)
    words.forEach( word => {
        let lettersPositions = findLettersPositions(word, board)
        console.log('WORD: ', word, '*****************')
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

function canMakeWord(lettersPositions) {
    // console.log(lettersPositions, '*************')
    let lastPositions = lettersPositions[0];
    let previousPositions = [].concat(lettersPositions[0]);
    let yesWeCan = true;
    lettersPositions.forEach( (letterPositions, i) => {
        if ( yesWeCan && i !== 0) {
            if (letterPositions.length === 0) yesWeCan = false;
            if (canMoveToNext(lastPositions, letterPositions, previousPositions)) {
                lastPositions = canMoveToNext(lastPositions, letterPositions, previousPositions);
                previousPositions = previousPositions.concat(lastPositions)
            } else {
                yesWeCan = false;
            }
        }
    })
    yesWeCan && console.log('PREV ***', previousPositions)
    return yesWeCan;
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
    // console.log('NEXT**',nextPosition, 'PREV**', previousPositions)
    previousPositions.forEach( pos => {
        if ( 
            pos.row === nextPosition.row &&
            pos.col === nextPosition.col
        ) didntMoveBefore = false;
    })
    return didntMoveBefore;
}

function doesntInclude(objArr, obj) {
    let notInclude = true;
    objArr.forEach( object => {
        let include = true;
        Object.keys(object).forEach( key => {
            if (objArr.key !== obj.key) include = false;
        })
        if (include) notInclude = false;
    })
    return notInclude;
}

function canMoveToNext(lastPositions, nextPositions, previousPositions) {
    let canMoveToPositions = [];
    lastPositions.forEach( lPos => {
        nextPositions.forEach( nPos => {
            if (
                withinOneCell(lPos, nPos)
                && didntMoveThere(nPos, previousPositions) 
                // && doesntInclude(canMoveToPositions, nPos)
            ) {
                canMoveToPositions.push(nPos);
            }
        })
    })
    return canMoveToPositions.length ? canMoveToPositions : false;
}

console.log(a_a, wordBoggle(a, a_w))
// console.log(b_a, wordBoggle(b, b_w))
// console.log(c_a, wordBoggle(c, c_w))