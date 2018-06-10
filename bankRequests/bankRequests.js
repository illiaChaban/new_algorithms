let a = [10, 100, 20, 50, 30]
let a_r = [
    "withdraw 2 10", 
    "transfer 5 1 20", 
    "deposit 5 20", 
    "transfer 3 4 15"
]
let a_a =[30, 90, 5, 65, 30]

let b = [20, 1000, 500, 40, 90]
let b_r = [
    "deposit 3 400", 
    "transfer 1 2 30", 
    "withdraw 4 50"
]
let b_b = [-2]

let c = [93451]
let c_r = ["withdraw 1 23140"]
let c_c = [70311]


let d = [42]
let d_r = ["transfer 1 2 3"]
let d_d = [-1]

let e = [624, 40204, 22629, 8534, 67973, 36586, 60793, 55954, 79998, 54430]
let e_r = [
    "transfer 5 2 34", 
    "withdraw 10 34", 
    "transfer 2 50 92", 
    "transfer 2 7 27", 
    "deposit 5 68", 
    "deposit 3 80", 
    "transfer 7 1 67", 
    "deposit 1 75", 
    "deposit 1 68", 
    "withdraw 9 95"
]
let e_e = [-3]

let f = [77367, 85558, 88570, 98242, 46552, 2772, 64226, 72128, 15176, 93254]
let f_r = [
    "deposit 11 6", 
    "transfer 2 6 91", 
    "deposit 10 58", 
    "transfer 5 3 49", 
    "withdraw 8 40", 
    "withdraw 6 67", 
    "transfer 7 6 44", 
    "withdraw 5 7", 
    "transfer 8 2 20", 
    "transfer 9 2 94"
]
let f_f = [-1]

let g = [61399, 16119, 78677, 19385, 53, 56692, 5824, 12054, 88354, 89495]
let g_r = [
    "deposit 10 93", 
    "transfer 10 3 81", 
    "deposit 4 4", 
    "transfer 8 3 35", 
    "withdraw 5 53", 
    "transfer 10 4 4", 
    "deposit 8 10", 
    "transfer 2 6 56", 
    "withdraw 4 98", 
    "transfer 1 2 60"
]
let g_g = [61339, 16123, 78793, 19295, 0, 56748, 5824, 12029, 88354, 89503]

let h = [92791, 83126, 7932, 33180, 44077, 48367, 34906, 84237, 41703, 28680, 78285, 1443, 64897, 40212, 62784, 75685, 49497, 76826, 59966, 64477]
let h_r = [
    "transfer 5 16 20570", 
    "deposit 15 81053", 
    "transfer 18 12 19445", 
    "withdraw 11 21658", 
    "deposit 20 45535", 
    "withdraw 13 63316", 
    "withdraw 11 66486", 
    "withdraw 4 33290", 
    "deposit 15 20647", 
    "transfer 4 8 44200", 
    "withdraw 16 52943", 
    "deposit 14 88175", 
    "deposit 13 40427", 
    "withdraw 8 82585", 
    "deposit 9 62598", 
    "transfer 9 20 96544"
]
let h_h = [-7]


let isValid = (accounts, request) => {
    let reqArr = request.split(' ');
    let i = reqArr[1] - 1;
    let j = reqArr[2] - 1;
    if (!accounts[i]) return false;
    if (reqArr[0] === 'transfer') {
        if (accounts[i] < reqArr[3]) return false;
        if (!accounts[j]) return false;
    }
    if (reqArr[0] === 'withdraw') {
        if (accounts[i] < reqArr[2]) return false;
    }
    return true;
}

let processRequest = (accounts, request) => {
    let copied = accounts.slice();
    let reqArr = request.split(' ');
    let reqName = reqArr[0];
    let i = reqArr[1] - 1;
    let j = reqArr[2] - 1;
    if (reqName === 'withdraw') {
        copied[i] -= Number(reqArr[2]);
    }
    if (reqName === 'deposit') {
        copied[i] += Number(reqArr[2]);        
    }
    if (reqName === 'transfer') {
        copied[i] -= Number(reqArr[3]);
        copied[j] += Number(reqArr[3]);        
    }
    return copied;
}



function bankRequests(accounts, requests) {
    let newState = accounts.map( el => el);
    let requestInvalid;
    requests.forEach( (request, i) => {
        if (!requestInvalid) {
            if (isValid(newState, request) === true) {
                newState = processRequest(newState, request);
            } else {
                requestInvalid = [-i -1];
            }
        }

    })
    return requestInvalid ? requestInvalid : newState;
}

console.log(a_a, bankRequests(a, a_r))
console.log(b_b, bankRequests(b, b_r))
console.log(c_c, bankRequests(c, c_r))
console.log(d_d, bankRequests(d, d_r))
console.log(e_e, bankRequests(e, e_r))
console.log(f_f, bankRequests(f, f_r))
console.log(g_g, bankRequests(g, g_r))
console.log(h_h, bankRequests(h, h_r))

