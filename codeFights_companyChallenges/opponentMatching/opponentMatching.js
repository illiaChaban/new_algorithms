function opponentMatching(xp) {
    let circles = xp.map( (el,i) => [i,el] ).sort( (a,b) => a[1] - b[1]);
    let matched = [];
    let match;
    while( circles.length > 1 && (match = get1stMatch( circles))  ) {
        matched.push(match);
        circles = circles.filter( el => el[0] !== match[0] && el[0] !== match[1])
    }
    return matched;
}

function get1stMatch( circles) {
    let match;
    let smallestStep = circles.reduce( (acum , curr, i) => {
        let step = circles[i+1] && circles[i+1][1] - curr[1];
        if ( step < acum) {
            acum = step;
            match = [ curr[0], circles[i+1][0] ].sort( (a,b) => a-b);
        }
        return acum;
    }, circles[circles.length-1][1])
    return match ? match : false;
}