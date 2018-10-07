/* Given a grid find a maximum number of connected colors */

let grid1 = [
    ['x','x','o'],
    ['x','o','o'],
    ['q','x','o'],
];
let a1 = 4; // 'o';

let grid2 = [
    ['o','o','x','q'],
    ['o','x','q','x'],
    ['q','x','x','x']
];

let a2 = 5;


let checkConnected = ( grid, direction, cell ) => {
    let { i,j } = direction;
    return grid[i][j] === cell.value;
};

let isValid = ( indexes, rowsNum, colsNum ) => {
    let { i, j} = indexes;
    return (
        i >= 0 && i < rowsNum &&
        j >= 0 && j < colsNum
    );
};

let findMoreConnected = ( grid, connectedCells ) => {
    let rowsNum = grid.length;
    let colsNum = grid[0].length;
    let newConnectedCells = [ ...connectedCells ];

    connectedCells.forEach( cell => {
        let { i, j, value } = cell;
        let directions = [
            { i: i+1, j: j },
            { i: i-1, j: j },
            { i: i, j: j+1 },
            { i: i, j: j-1 }
        ];

        directions.forEach( direction => {
            if ( isValid( direction, rowsNum, colsNum )) {
                let connected = checkConnected( grid, direction, cell );
                let wasntAdded = !newConnectedCells.find( cell => {
                    return cell.i === direction.i && cell.j === direction.j;
                });
                if ( connected && wasntAdded ) {
                    newConnectedCells.push( {
                        i: direction.i,
                        j: direction.j,
                        value: grid[ direction.i ][ direction.j ]
                    });
                }
            }
        });
    });

    return newConnectedCells;
};


let findNumConnected = ( grid, i, j) => {
    let prevConnectedCells = [];
    let currConnectedCells = [ 
        { i, j, value: grid[i][j] }
    ];

    while (currConnectedCells.length > prevConnectedCells.length) {
        prevConnectedCells = [ ...currConnectedCells];
        currConnectedCells = findMoreConnected( grid, currConnectedCells );
    }

    return currConnectedCells.length;
}

let findMaxConnected = (grid) => {
    let max = 0;

    for( let i = 0; i < grid.length; i++ ) {
        let row = grid[i];

        for( let j = 0; j < row.length; j++ ) {

            let thisMax = findNumConnected( grid, i, j);
            if ( thisMax > max ) { max = thisMax; }
        }
    }

    return max;
};




console.assert( findMaxConnected(grid1) === a1, "FALSE GRID 1 -->", findMaxConnected(grid1));
console.assert( findMaxConnected(grid2) === a2, "FALSE GRID 2 -->", findMaxConnected(grid2));

