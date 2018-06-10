let a = [
    [1,0,0,2], 
    [0,5,0,1], 
    [0,0,3,5]
]

let a_r = [1];
let a_c = [0, 2];

// [
//     [0,2],
//     [0,5]
// ]

let b = [
    [1,0,0,2], 
    [0,5,0,1], 
    [0,0,3,5]
]

let b_r = [];
let b_c = [0];
// [[0,0,2], 
//  [5,0,1], 
//  [0,3,5]]

let c = [[1]]

c_r = []
c_c = []
//[[1]]

function constructSubmatrix(matrix, rowsToDelete, columnsToDelete) {
    let newM = [];
    matrix.forEach( (arr, i) => {
        if (!rowsToDelete.includes(i)) {
            let newArr = [];
            arr.forEach( (el, j) => {
                if(!columnsToDelete.includes(j)) {
                    newArr.push(el);
                }
            })
            newM.push(newArr);
        }
    })
    return newM;
}

console.log(constructSubmatrix( a, a_r, a_c))
console.log(constructSubmatrix( b, b_r, b_c))
console.log(constructSubmatrix( c, c_r, c_c))