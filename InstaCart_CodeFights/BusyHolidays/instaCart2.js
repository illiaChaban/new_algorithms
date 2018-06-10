
function busyHolidays(shoppers, orders, leadTime) {
    if (orders.length > shoppers.length) return false;
    let s = shoppers.map( a => a.map( x => Number(x.slice(0,2)) + Number(x.slice(3)) /60) );
    let ords = orders.map( a => a.map( x => Number(x.slice(0,2)) + Number(x.slice(3)) /60) );
    let shoppersCanDoOrdersArr = getShoppersCanDoOrdersArr(s, ords, leadTime);
    console.log(shoppersCanDoOrdersArr)
    let combs = findAllUniqueCombinations( shoppersCanDoOrdersArr );
    console.log(combs)

    for (let comb of combs) {
        let canFulfil = true;
        for ( let i = 0; i < orders.length; i++) {
            if (!comb.includes(i)) {
                canFulfil = false;
                break;
            }
        }
        if (canFulfil) return true;
    }
    return false;
}


function findAllUniqueCombinations (arrArr) {
    let allCombs = [[]];
    for ( let arr of arrArr) {
        let dummy = [];
        if ( arr.length === 0) {
            for ( let x of allCombs) {
                dummy.push( x.concat( [null]))
            }
        } else {
            for ( let j of arr ) {
                for ( let x of allCombs) {
                    if ( j !== null && !x.includes(j) ) {
                        dummy.push( x.concat( [j]))
                    }
                }
            }
        }
        allCombs = dummy
    }
    return allCombs;
}

function getShoppersCanDoOrdersArr( shoppers, orders, leadTime ) {
    let arr = []
    shoppers.forEach( shopper => {
        let shopperCanDo = [];
        orders.forEach( (order,i) => {
            let startOrder = order[0] > shopper[0] ? order[0] : shopper[0];
            let endOrder = startOrder + leadTime[i] / 60;
            if ( 
                endOrder <= order[1]
                && endOrder <= shopper[1]
            ) shopperCanDo.push(i);
        })
        arr.push(shopperCanDo)
    })
    return arr;
}






let shoppers = [["15:10", "16:00"], 
            ["17:40", "22:30"]]
let orders = [["17:30", "18:00"], 
          ["15:00", "15:45"]]
let leadTime = [15, 30]
let a = true


// let shoppers =[["10:00","11:00"], 
//  ["10:00","11:00"], 
//  ["12:00","13:00"], 
//  ["12:00","13:00"]]
// let orders = [["10:00","11:00"], 
//  ["10:00","11:00"], 
//  ["10:00","11:00"], 
//  ["12:00","13:00"]]
// let leadTime = [5, 5, 5, 5]
// let a = false

// let shoppers = [["09:25","23:31"], 
//  ["21:34","23:01"], 
//  ["10:04","19:13"],
//  ['10:01', '10:02'], 
//  ["23:38","23:40"], 
//  ["19:30","22:18"]]
// let orders = [["03:00","13:12"], 
//  ["20:19","21:56"], 
//  ["04:14","12:39"], 
//  ["23:35","23:39"], 
//  ["19:04","21:21"]]
// let leadTime = [227, 22, 155, 1, 111]
// let a = true;

console.log(busyHolidays(shoppers, orders, leadTime), a);