let contents = Array(43).fill(0);
let max = 2**32;

let getNum = ( init, add ) => {
    return( init + add + max ) % max; 
};

let getIndex = (command, i1, i2) => {
    return Number( command.slice(i1,i2));
}

let commands = {
    MOV: function(command, currIndex) {
            let regexs = [
                /^MOV\sR([0-9]{2}),R([0-9]{2})/,
                /^MOV\s([0-9]+),R([0-9]{2})/
            ];
            let instructions = [
                function( command, currIndex  ) {
                    let [ str, i1, i2 ] = regexs[0].exec( command ).map( Number );
                    contents[i2] = contents[i1];
                    return currIndex + 1;
                },
                function( command, currIndex ) {
                    let [ str, num, i ] = regexs[1].exec( command ).map( Number );
                    contents[i] = num;
                    return currIndex + 1;
                }

            ];
            let instructionIndex = regexs.findIndex( regex => regex.test( command ) );
            let newIndex = instructions[ instructionIndex ]( command, currIndex );
            return newIndex;
    },
    ADD: function(command, currIndex) {
        let i1 = getIndex(command, 5,7);
        let i2 = getIndex(command, 9,11);
        contents[i1] = (contents[i1] + contents[i2]) % max;
        return currIndex + 1;
    },
    DEC: function(command, currIndex) {
        let i = getIndex(command, 5,7);
        contents[i] = getNum( contents[i], -1 );
        return currIndex + 1;
    },
    INC: function(command, currIndex) {
        let i = getIndex(command, 5,7);
        contents[i] = getNum( contents[i], 1 );
        return currIndex + 1;
    },
    INV: function(command, currIndex) {
        let i = getIndex(command, 5,7);
        let binary = contents[i].toString(2);
        binary = ("0").repeat(33 - binary.length) + binary;
        let inverted = binary.split('').map( num => Number(num) ? '0' : '1').join('');
        contents[i] = parseInt(inverted, 2) % max;
        return currIndex + 1;
    },
    JMP: function(command, currIndex) {
        return getIndex(command, 4, command.length) - 1;
    },
    "JZ ": function(command, currIndex) {
        let i = getIndex(command, 3, command.length);
        if ( contents[0] === 0 ) return i - 1;
        return currIndex + 1;
    },
    NOP: function(command, currIndex) {
        return currIndex + 1;
    }
}

let execute = (command, currIndex) => {
    let task = command.slice(0,3);
    let nextIndex = commands[task](command, currIndex);
    return nextIndex;
}


function cpuEmulator(subroutine) {
    console.time();
    let currIndex = 0;
    let lastIndex = subroutine.length -1 ;

    while ( currIndex <= lastIndex ) {
        let command = subroutine[currIndex];
        currIndex = execute( command, currIndex );
    };
    
    console.timeEnd();
    return contents[42].toString();
}


let subroutine = ["MOV 5,R00", 
 "MOV 10,R01", 
 "JZ 7", 
 "ADD R02,R01", 
 "DEC R00", 
 "JMP 3", 
 "MOV R02,R42"];

 let a = '50';


 let s2 = ["MOV 32,R00", 
 "MOV 1,R41", 
 "JZ 8", 
 "MOV R41,R42", 
 "ADD R41,R42", 
 "DEC R00", 
 "JMP 3", 
 "NOP"]

 let a2 = "2147483648";

 let s3 = ["INV R41", 
 "ADD R42,R41"]

 let a3 = "4294967295"

 let s4 = ["INV R42", 
 "MOV 101,R00", 
 "JZ 13", 
 "MOV R00,R08", 
 "MOV 100,R00", 
 "JZ 10", 
 "INC R42", 
 "DEC R00", 
 "JMP 6", 
 "MOV R08,R00", 
 "DEC R00", 
 "JMP 3", 
 "INC R42"]

 let a4 = "10100"

 let s5 = ["INV R41", 
 "ADD R42,R41"]
 
 let a5 = "4294967295"

 console.log( cpuEmulator( s5));
