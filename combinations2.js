let a = [4,1,2,3];

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


console.log(getAllCombinations(a))
