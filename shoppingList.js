let items = "Doughnuts, 4; doughnuts holes, 0.08; glue, 3.4"
let c = "wanna 22.2&15.3olo 0.00 and 12.12kk0.02 ..34"

function shoppingList(items) {
    let regExp = /([0-9]+(\.[0-9]+)*)/g;
    let prices = items.match(regExp)
    return prices.reduce( (acum, curr) => acum + Number(curr), 0)
}

shoppingList(c);
shoppingList(items)