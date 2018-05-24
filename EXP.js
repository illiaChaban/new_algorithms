function objectsEqual(obj1, obj2) {
    let equal = true;
    if (Object.keys(obj1).length !== Object.keys(obj2).length) equal = false;
    Object.keys(obj1).forEach( key => {
        if (obj1[key] !== obj2[key]) equal = false;
    })
    return equal && obj1;
}

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
            ) has = arraysOfObjEqual(arr1, arr2);
        })
    })
    return has;
}