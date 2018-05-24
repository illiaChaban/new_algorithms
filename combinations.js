let a = [
    [1,2,3],
    [4,5],
    [6,7,8]
]

let a_a = [
    [1, 4, 6],
    [1, 4, 7],
    [1, 4, 8],
    [1, 5, 6],
    [1, 5, 7],
    [1, 5, 8],

    [2, 4, 6],
    [2, 4, 7],
    [2, 4, 8],
    [2, 5, 6],
    [2, 5, 7],
    [2, 5, 8],

    [3, 4, 6],
    [3, 4, 7],
    [3, 4, 8],
    [3, 5, 6],
    [3, 5, 7],
    [3, 5, 8],
]


let findAllCombinations = (arrArr) => {
    let iterationsNum = arrArr.reduce( (acum, curr) => {
        return acum * curr.length
    }, 1)
    let combinations = Array(iterationsNum).fill().map( el => Array(arrArr.length).fill())
    const lastArrlength = arrArr[arrArr.length - 1].length;
    arrArr.forEach( (arr, i) => {
        let k = 0;
        while( k < iterationsNum) {
            let step = lastArrlength * i || 1
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

console.log(findAllCombinations(a))