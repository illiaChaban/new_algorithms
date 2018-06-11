function armyMarch(a, b, v1, v2) {
    // point of intersection with Y axis ==> (0, y) ? where y >= (a[1] + b[1]) / 2
    // and y <= b[1]
    const add = 0.000001;
    let y = a[1] > b[1] ? b[1] : (a[1] + b[1])/2;
    let timeTravel = findTimeTravel(y, a, b, v1, v2);
    let newTime;
    while ( 
        (newTime = findTimeTravel( y + add, a, b, v1, v2)) < timeTravel
    ) {
        timeTravel = newTime;
        y += add;
    }
    return timeTravel;
}

function findDistanseToXAxis( y, point) {
    return (point[0]**2 + (y - point[1])**2) ** 0.5;
}
    
function findTimeTravel( y, point1, point2, v1, v2) {
    let d1 = findDistanseToXAxis( y, point1);
    let d2 = findDistanseToXAxis( y, point2);
    return d1/v1 + d2/v2;
}