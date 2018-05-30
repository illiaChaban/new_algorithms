function stringsRearrangement(inputArray) {
    for (let i = 0; i < inputArray.length; i++) {
        let copy = inputArray.slice();
        let lastStr = copy[i];
        for (let j = 0; j < inputArray.length; j++) {
            console.log(lastStr, copy, findStrDiffByOne(copy, lastStr), )
            if (findStrDiffByOne(copy, lastStr)) {
                let found = findStrDiffByOne(copy, lastStr);
                let index = copy.indexOf(lastStr);
                copy.splice(index, 1);
                lastStr = found;                
            } else { break; }
            
            if ( copy.length === 1 ) {
                console.log('returning true')
                return true;
            }
        }
    }
    return false;
}

function findStrDiffByOne(arr, str) {
    let found = false;
    arr.forEach( string => {
        if (
            str !== string
            && stringsDiffByOne(str, string)
        ) found = string;
    })
    return found;
}

function stringsDiffByOne(a,b) {
    let count = 0;
    a.split('').forEach( (char, i) => {
        if (char !== b.split('')[i]) count ++
    })
    return count <= 1 ? true : false;
}

// let a = ["abc", 
// "abx", 
// "axx", 
// "abx", 
// "abc"];
// let a = ["aba", 
// "bbb", 
// "bab"];
// let a = ["abc", 
// "abx", 
// "axx", 
// "abc"]
// let a = ["f", 
// "g", 
// "a", 
// "h"];
let a = ["abc", 
"bef", 
"bcc", 
"bec", 
"bbc", 
"bdc"];
console.log(stringsRearrangement(a));