let contents = Array(43).fill(0);
let max = 2**32;

let getNum = ( init, add ) => {
    return( init + add + max ) % max; 
};

let instructions = [
    { 
        regex: /^MOV\sR([0-9]{2}),R([0-9]{2})/,
        instruction: function( command, currIndex  ) {
            let [ str, i1, i2 ] = this.regex.exec( command );
            i2 = Number(i2);
            i1 = Number(i1);
            contents[i2] = contents[i1];
            return currIndex + 1;
        }
    },
    { 
        regex: /^MOV\s([0-9]+),R([0-9]{2})/,
        instruction: function( command, currIndex ) {
            let [ str, num, i ] = this.regex.exec( command );
            i = Number(i);
            contents[i] = Number(num);
            return currIndex + 1;
        }
    },
    { 
        regex: /^ADD\sR([0-9]{2}),R([0-9]{2})/,
        instruction: function( command, currIndex ) {
            let [ str, i1, i2 ] = this.regex.exec( command );
            i1 = Number(i1);
            i2 = Number(i2)
            contents[i1] = (contents[i1] + contents[i2]) % max;
            return currIndex + 1;
        }  
    },
    { 
        regex: /^DEC\sR([0-9]{2})/,
        instruction: function( command, currIndex ) {
            let [ str, i ] = this.regex.exec( command );
            i = Number(i);
            contents[i] = getNum( contents[i], -1 );
            return currIndex + 1;
        } 
    },
    { 
        regex: /^INC\sR([0-9]{2})/,
        instruction: function( command, currIndex ) {
            let [ str, i ] = this.regex.exec( command );
            i = Number(i);
            contents[i] = getNum( contents[i], 1 );
            return currIndex + 1;
        }
    },
    {
        regex: /^INV\sR([0-9]{2})/,
        instruction: function( command, currIndex ) {
            let [ str, i ] = this.regex.exec( command );
            i = Number(i);
            let binary = contents[i].toString(2);
            binary = ("0").repeat(33 - binary.length) + binary;
            let inverted = binary.split('').map( num => Number(num) ? '0' : '1').join('');
            contents[i] = parseInt(inverted, 2) % max;
            return currIndex + 1;
        }
    },
    {
        regex: /^JMP\s([0-9]+)/,
        instruction: function( command, currIndex ) {
            let [ str, i ] = this.regex.exec( command );
            i = Number(i);
            return i - 1;
        }
    },
    {
        regex: /^JZ\s([0-9]+)/,
        instruction: function( command, currIndex) {
            let [ str, i ] = this.regex.exec( command );
            i = Number(i);
            if ( contents[0] === 0 ) return i - 1;
            return currIndex + 1;
        }
    },
    {
        regex: /^NOP/,
        instruction: function( command, currIndex) {
            return currIndex + 1;
        }
    }
    
];


function cpuEmulator(subroutine) {
    console.time();
    let nextSubroutineIndex = 0;
    let subLength = subroutine.length;

    while ( nextSubroutineIndex <= subLength -1 ) {
        let command = subroutine[ nextSubroutineIndex ];

        let instructionToExec = instructions.find( instruction => 
            instruction.regex.test( command )
        );
        nextSubroutineIndex = instructionToExec.instruction( command, nextSubroutineIndex );
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

 console.log( cpuEmulator( s4));
