function isAdmissibleOverpayment(prices, notes, x) {
    let totalPriceCart = prices.reduce( (acum, curr) => acum + curr);
    let totalPriceStore = getTotalPriceStore(prices, notes);
    if (totalPriceCart - totalPriceStore > x + 0.0000000000001) return false;
    return true;
}

function getTotalPriceStore(prices, notes) {
    let regExp = /([0-9]+\.[0-9]+)% (higher)?/;
    let totalPriceStore = 0;
    notes.forEach( (note,i) => {
        let executed = regExp.exec(note);
        if (executed) {
            let percent = Number(executed[1]);
            let higher = executed[2] === 'higher';
            let storePrice;
            higher ? 
                storePrice = prices[i] / (1 + percent/100)
            : 
                storePrice = prices[i] / (1 - percent/100);
            totalPriceStore += storePrice;
        } else {
            totalPriceStore += prices[i] 
        }
    })
    return totalPriceStore
}

// let prices = [110, 95, 70];
// let notes = ["10.0% higher than in-store", 
//          "5.0% lower than in-store", 
//          "Same as in-store"];
// let x = 5;

// let prices = [48, 165];
// let notes = ["20.00% lower than in-store", 
//          "10.00% higher than in-store"]
// let x = 2

let prices = [220]
let notes = ["120.0000% higher than in-store"]
let x = 120

// let prices = [110, 110, 110, 110, 110, 110, 110, 110, 110, 160]
// let notes = ["10.0% higher than in-store", 
//  "10.0% higher than in-store", 
//  "10.0% higher than in-store", 
//  "10.0% higher than in-store", 
//  "10.0% higher than in-store", 
//  "10.0% higher than in-store", 
//  "10.0% higher than in-store", 
//  "10.0% higher than in-store", 
//  "10.0% higher than in-store", 
//  "60.0% higher than in-store"]
// let x = 150

// let prices = [40, 40, 40, 40]
// let notes = ["0.001% higher than in-store", 
//  "0.0% lower than in-store", 
//  "0.0% higher than in-store", 
//  "0.0% lower than in-store"]
// let x = 0

console.log(isAdmissibleOverpayment(prices, notes, x));