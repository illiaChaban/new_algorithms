


let s = "2[b3[a]]";
let s_a = "baaabaaa"


let updateString = (strToDelete, initialStr, strToRepeat, times) => {
    let i = initialStr.indexOf(strToDelete)
    initialStr = initialStr.split('')
    initialStr.splice(i, strToDelete.length, strToRepeat.repeat(times))
    initialStr = initialStr.join('')
    return initialStr;
}


function decodeString(s) {
    let regExp = /([0-9]+)\[([a-z]+)\]/;
    // console.log(regExp.exec(s))

    let decoded = '';
    while(regExp.exec(s)) {
        let regExpArr = regExp.exec(s)
        let strToDelete = regExpArr[0];
        let times = regExpArr[1];
        let strToRepeat = regExpArr[2];
        s = updateString(strToDelete, s, strToRepeat, times);
        // decoded = strToRepeat.repeat(times) + decoded;
        // console.log(decoded, s)
    }
    console.log(s)

}

decodeString(s)