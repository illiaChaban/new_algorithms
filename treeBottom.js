let a = "(2 (7 (2 () ()) (6 (5 () ()) (11 () ()))) (5 () (9 (4 () ()) ())))"
let a_o = [5, 11, 4]

let b = "(1 () ())"
let b_o = [1]

let c = "(1000 () ())"
let c_o = [1000]


let d = "(413 (683 () ()) (355 (913 (985 () ()) ()) ()))"
let d_o = [985]

let e = "(65 (88 (45 (4 () ()) ()) ()) (1000000000 () ()))";
let e_o = [4];

let f = "(1 (2 (4 (8 () ()) (9 () ())) (5 (10 () ()) (11 () ()))) (3 (6 (12 () ()) (13 () ())) (7 (14 () ()) (15 () ()))))"
let f_o = [8, 9, 10, 11, 12, 13, 14, 15]

let g = "(1 () (2 () (3 () (5 () (8 () (13 () (21 () (34 () ()))))))))"
let g_o = [34]

let replaceParenthesis = (tree) => {
    let newTree = tree.split('');
    let regExp1 = /(\()/g;
    let regExp2 = /(\))/g;
    while (regExp1.test(tree)) {
        newTree.splice(regExp1.lastIndex - 1, 1, '[')
    }
    while (regExp2.test(tree)) {
        newTree.splice(regExp2.lastIndex-1, 1, ']')
    }
    return newTree.join('');
}

let addComas = (tree) => {
    let newTree = tree;
    let regExp1 = /([0-9]+\s)/g;
    let regExp2 = /(]\s)/g;
    while (regExp1.test(newTree)) {
        newTree = newTree.split('')
        newTree.splice(regExp1.lastIndex - 1, 0, ',')
        newTree = newTree.join('')
    }
    while (regExp2.test(newTree)) {
        newTree = newTree.split('')
        newTree.splice(regExp2.lastIndex - 1, 0, ',')
        newTree = newTree.join('')
    }
    return newTree;
}

let getArray = (tree) => JSON.parse(addComas(replaceParenthesis(tree)))

let getNextLevel = (currLevelArr) => {
    let arr = [];
    currLevelArr.forEach( currLevel => {
        if (currLevel.length) {
            arr = arr.concat(currLevel)
        }
    })
    return arr;
}

let flatten = (arr) => {
    let flattened = [];
    arr.forEach( el => typeof el === 'number' && flattened.push(el) )
    return flattened;
}

function treeBottom(tree) {
    let treeArr = getArray(tree);
    let lastLevel;
    while (getNextLevel(treeArr).length) {
        treeArr = getNextLevel(treeArr);
    }
    return flatten(treeArr);

}

console.log(a_o, treeBottom(a))
console.log(b_o, treeBottom(b))
console.log(c_o, treeBottom(c))
console.log(d_o, treeBottom(d))
console.log(e_o, treeBottom(e))
console.log(f_o, treeBottom(f))
console.log(g_o, treeBottom(g))