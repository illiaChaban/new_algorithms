let a = [4,1,2,3];

function getAllCombinations(arr) {
    let allCombinations = [];
    for (let i = 0; i < arr.length; i++) {
        let copy = arr.slice();
        let num = copy.splice(i,1);
        copy.unshift(num[0]);
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

// function getAllCombinations(arr) {
//     let allCombs = [[]];
//             arr.forEach( x => {
            
//                 for ( let a of allCombs) {
//                     let dummy = [];
//                     for ( let j of arr) {
//                         // console.log(j)
//                         dummy.push( a.concat( [j] ))
//                         // console.log(a, allCombs)
//                         // console.log( a.concat( [j]))
//                     }
//                     allCombs = dummy;
//                     console.log(allCombs)
                
//                 }
//             })
//     return allCombs;
// }

// function getAllCombinations(arr) {
//     let allCombs = [[]];

// }


console.log(getAllCombinations(a))
