function mostViewedWriters(topicIds, answerIds, views) {
    let uniqueTopicsArr = getUniqueTopicsSorted(topicIds)
    let topicsNum = uniqueTopicsArr.length;
    let mostViewed = Array(topicsNum).fill().map( x => []);

    uniqueTopicsArr.forEach( (topicId, i) => {
        let answerIndexes = getAnswerIndexes(topicIds, topicId);
        let topicAnswers = getTopicAnswers(answerIds, answerIndexes);
        topicAnswers.forEach( answerId => {
            let userIdViewsArr = getUserIdViewsArr(answerId, views);
            let indexExistentUser = mostViewed[i].findIndex( arr => arr[0] === userIdViewsArr[0])
            if ( indexExistentUser >= 0 ) {
                mostViewed[i][indexExistentUser][1] += userIdViewsArr[1];
            } else {
                mostViewed[i].push(userIdViewsArr)
            }
        })

        mostViewed[i].sort( (a,b) => {
            if ( a[1] === b[1] ) return a[0] - b[0];
            return b[1] - a[1];
        });

    }) 

    console.log(mostViewed)
    return mostViewed;

}

function getUniqueTopicsSorted( topicIds ) {
    return topicIds
        .reduce( (acum, curr) => [...acum, ...curr])
        .filter( (value, i, self) => self.indexOf(value) === i)
        .sort( (a,b ) => a-b)
}

function getUserIdViewsArr(answerId, views) {
    return views.find( view => view[0] === answerId).slice(1)
}

function getTopicAnswers(answerIds, answerIndexes) {
    let topicAnswers = [];
    answerIndexes.forEach( i => topicAnswers.push(...answerIds[i]))
    return topicAnswers;
}


function getAnswerIndexes(topicIds, topicId) {
    return topicIds.reduce( (acum, curr, i) => {
        if ( curr.includes(topicId) ) acum.push(i);
        return acum;
    }, [])
}

// let topicIds = [[1, 2, 3], [2, 3, 4], [1, 4], [2, 3]];
// let answerIds = [[6, 4], [1, 2], [5], [3]];
// let views = [[2, 1, 2], [6, 3, 5], [3, 3, 0], [5, 1, 1], [4, 2, 3], [1, 4, 2]];

// let a =[
//     [[3, 5], [2, 3], [1, 1]],
//     [[3, 5], [2, 3], [1, 2], [4, 2]],
//     [[3, 5], [2, 3], [1, 2], [4, 2]],
//     [[1, 3], [4, 2]]
// ]

// let topicIds = [
//     [555,666,777], 
//     [8,1,239], 
//     [239,566,1000]
// ]
// let answerIds = [
//     [1,2,3], 
//     [239,567], 
//     [566,30,8]
// ]
// let views = [
//     [1,18,5], 
//     [239,23,37], 
//     [567,23,0], 
//     [566,1,23], 
//     [30,18,18], 
//     [8,7,20], 
//     [3,239,1], 
//     [2,18,1]
// ]

// let a =[
//     [[23,37]], 
//     [[23,37]], 
//     [[23,37],[1,23],[7,20],[18,18]], 
//     [[18,6],[239,1]], 
//     [[1,23],[7,20],[18,18]], 
//     [[18,6],[239,1]], 
//     [[18,6],[239,1]], 
//     [[1,23],[7,20],[18,18]]
// ]


let topicIds = [
    [5,6,81], 
    [1,3,2], 
    [10,12,34], 
    [13,14,23,43], 
    [11,22,17]
]
let answerIds = [
    [1,2,3], 
    [], 
    [], 
    [4,5,6,7], 
    [8,9,10,11]
]
let views = [
    [4,18,5], 
    [5,23,37], 
    [8,1,23], 
    [11,18,18], 
    [1,7,20], 
    [9,239,10], 
    [2,239,1], 
    [10,18,1], 
    [3,239,5], 
    [6,169,2], 
    [7,800,1]
]

let a = [
    [], 
    [], 
    [], 
    [[7,20],[239,6]], 
    [[7,20],[239,6]], 
    [], 
    [[1,23],[18,19],[239,10]], 
    [], 
    [[23,37],[18,5],[169,2],[800,1]], 
    [[23,37],[18,5],[169,2],[800,1]], 
    [[1,23],[18,19],[239,10]], 
    [[1,23],[18,19],[239,10]], 
    [[23,37],[18,5],[169,2],[800,1]], 
    [], 
    [[23,37],[18,5],[169,2],[800,1]], 
    [[7,20],[239,6]]
]

mostViewedWriters(topicIds, answerIds, views);