function busyHolidays(shoppers, orders, leadTime) {
    if ( shoppers.length < orders.length) return false;
    let s = shoppers.map( a => a.map( x => Number(x.slice(0,2)) + Number(x.slice(3)) /60) );
    let ords = orders.map( a => a.map( x => Number(x.slice(0,2)) + Number(x.slice(3)) /60) );
    let allShopperArrangments = getAllCombinations(s);
    for ( let shopperArrangement of allShopperArrangments) {
        if (fulfilsOrders( shopperArrangement, ords, leadTime)) return true;
    }
    return false;
}


function fulfilsOrders( shopperArrangement, orders, leadTime) {
    for ( let i = 0; i < orders.length; i ++ ) {
        let order = orders[i];
        let shopper = shopperArrangement[i];
        let startOrder = order[0] > shopper[0] ? order[0] : shopper[0];
        let endOrder = startOrder + leadTime[i] / 60;
        if ( 
            endOrder > order[1]
            || endOrder > shopper[1]
           ) return false;
    }
    return true;
}

function getAllCombinations(arr) {
    let allCombinations = [];
    for (let i = 0; i < arr.length; i++) {
        let copy = arr.map( x => x.slice());
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
    console.log(allCombinations)
    return allCombinations;
}



// let shoppers = [["15:10", "16:00"], 
//             ["17:40", "22:30"]]
// let orders = [["17:30", "18:00"], 
//           ["15:00", "15:45"]]
// let leadTime = [15, 30]
// let a = true


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

let shoppers = [["09:25","23:31"], 
 ["21:34","23:01"], 
 ["10:04","19:13"], 
 ["23:38","23:40"], 
 ["19:30","22:18"]]
let orders = [["03:00","13:12"], 
 ["20:19","21:56"], 
 ["04:14","12:39"], 
 ["23:35","23:39"], 
 ["19:04","21:21"]]
let leadTime = [227, 22, 155, 1, 111]
let a = true;

console.log(busyHolidays(shoppers, orders, leadTime), a);