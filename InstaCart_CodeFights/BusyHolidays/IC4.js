function busyHolidays( shoppers, orders, leadTime) {
    let fromIndex = 0;
    let s = shoppers.map( a => a.map( x => Number(x.slice(0,2)) + Number(x.slice(3)) /60) );
    let ords = orders.map( a => a.map( x => Number(x.slice(0,2)) + Number(x.slice(3)) /60) );
    let shoppersCanDo = getShoppersCanDoOrdersArr( s, ords, leadTime)
    let max = orders.length - 1;
    let count = 0;
    // console.log(flatten(shoppersCanDo).indexOf(count, fromIndex))
    let fl;
    console.log(flatten(shoppersCanDo))
    while( fl = flatten(shoppersCanDo).indexOf(count, fromIndex) ) {
        console.log(fl, count ,fromIndex)
        
        if ( fl === -1) {
            count ++;
            fromIndex = 0;
            console.log( count > max)
            if ( count > max ) break;
            
        } else {
            fromIndex = fl + 1;
            
        }
    }


}

function flatten(arrArr) {
    return arrArr.reduce( (acum, curr) => [ ...acum, ...curr], [])
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

let shoppers = [
    ["21:34","23:01"], 
    ["10:04","19:13"],
    ["09:25","23:31"], 
    ['10:01', '10:02'], 
    ["23:38","23:40"], 
    ["19:30","22:18"]
]
let orders = [["03:00","13:12"], 
 ["20:19","21:56"], 
 ["04:14","12:39"], 
 ["23:35","23:39"], 
 ["19:04","21:21"],

]
let leadTime = [227, 22, 155, 1, 111, 10]
let a = true;

console.log(busyHolidays(shoppers, orders, leadTime), a);