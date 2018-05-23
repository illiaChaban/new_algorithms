// function zigzag(a) {
//     let greatest = 0;
//     let count = 1;
//     let arrOfZigzags = []
//     a.forEach( (el, i, arr) => {
//             if(
//                 (el > arr[i - 1] || arr[i-1] === undefined) && 
//                 (el > arr[i + 1] || arr[i+1] === undefined) ||
//                 (el < arr[i - 1] || arr[i-1] === undefined) && 
//                 (el < arr[i + 1] || arr[i+1] === undefined)
//             ) {
//                 count ++;
//             } else {
//                 // count ++;
//                 count = 1;
//             }
//             if (count > greatest) greatest = count
        
        
     
//     })
//     return greatest;
// }


let a = [9, 8, 8, 5, 3, 5, 3, 2, 8, 6];  //4
let b = [2, 1, 4, 4, 1, 4, 4, 1, 2, 0, 1, 0, 0, 3, 1, 3, 4, 1, 3, 4]; //6
let c = [4, 4]; //1

let satisfiesConstraint = (currentNum, previousNum, constraint) => {
    if ( constraint === 'more') return currentNum > previousNum;
    if ( constraint === 'less') return currentNum < previousNum;
    if (currentNum === previousNum) return false;
    return true;
}

let updateConstraint = (currNum, prevNum) => currNum - prevNum > 0 ? 'less' : 'more';

let getFirstZigzag = (arr) => {
    let zigzag = [arr[0]]
    let constraint = 'any';
    let keepGoing = true;
    arr.forEach( (el, i, thisArr) => {
        if (i !== 0 && keepGoing) {
            if (satisfiesConstraint(el, thisArr[i-1], constraint)) {
                zigzag.push(el)
                constraint = updateConstraint(el, thisArr[i-1])
            } else {
                keepGoing = false;
            }
        }
        
    })
    return zigzag;
}



let getMaxZigzagLength = (arr) => {
    let maxLength = 0;
    arr.forEach( (el, i, thisArr) => {
        let zz = getFirstZigzag(thisArr.slice(i))
        if (zz.length > maxLength) maxLength = zz.length;
    })
    return maxLength;
};

console.log(getMaxZigzagLength(a), '##### 4 #####')
console.log(getMaxZigzagLength(b), '##### 6 #####')
console.log(getMaxZigzagLength(c), '##### 1 #####')