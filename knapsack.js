const boxes = [
    {weight: 12, money: 4},
    {weight: 2, money: 2},
    {weight: 1, money: 2},
    {weight: 1, money: 1},
    {weight: 4, money: 10},
]

const maxWeight = 15;

let getChoicesFor = (num, offset) => {
    let choicesArr = [];
    let count = 1;
    let offsetArr = [];
    if(offset) offsetArr = Array(offset).fill(0);
    while( count <= num) {
        let choice = Array(num).fill(0).map( (el, i) => i <= count - 1 ? 1 : 0)
        choice = offsetArr.concat(choice)
        choicesArr.push(choice);
        count ++;
    }
    return choicesArr;
}

let getAllPossibleChoices = (num) => {
    let choicesArr = [];
    let count = num;
    while( count > 0 ) {
        let offset = num - count;
        let choices = getChoicesFor(count, offset);
        choices.forEach( choice => choicesArr.push(choice));
        count --;
    }
    return choicesArr;
}

let constraintSatisfied = (choice, constraint) => {
    let weight = choice.reduce( (acum, curr) => 
        curr.weight ? acum + curr.weight: acum
    , 0)
    return weight <= constraint;
}

let getValue = (choice) => choice.reduce( (acum, curr) =>
    curr.money ? acum + curr.money: acum
, 0)

let getBestChoice = (boxes) => {
    let bestChoice = [0, []]
    let allChoicesNum = getAllPossibleChoices(boxes.length);
    let allChoices = allChoicesNum.map( (choice, i) => 
        choice.map((num, i) => num && boxes[i]))
    allChoices.forEach( choice => {
        if (constraintSatisfied(choice, maxWeight)) {
            let value = getValue(choice);
            if (value > bestChoice[0]) {
                bestChoice[0] = value;
                bestChoice[1] = choice;               
            } 
        }
    })
    return bestChoice;
}

console.log(getBestChoice(boxes));