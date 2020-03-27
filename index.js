const fs = require("fs");  
const process = require('process');

if (process.argv[2] === undefined || process.argv[3] === undefined){
  throw("USAGE: node index.js [ Input file ] [ Output file ]");
}

fs.readFile(process.argv[2], "utf-8", (err, data) => {
    if (err){
        console.log(err)
    }else{
        let result = compile(data);
        fs.writeFile(process.argv[3], result, (err) => {
            if (err){
                console.log("error")
            }
        })
    }
});
const zero = '+[]';
const one = '+!![]';

const number = n => {
  if (n === 0) return zero;
  return Array.from({length: n}, () => one).join(' + ');
}
const principalLetters = {};

const fromString = s =>s.split('').map(x => {
  if (!(x in principalLetters)) {
    const charCode = x.charCodeAt(0);
    return `([]+[])[${fromString('constructor')}][${fromString('fromCharCode')}](${number(charCode)})`;
  }
  return principalLetters[x];
}).join('+');

principalLetters.a = `(+{}+[])[${number(1)}]`;
principalLetters.b = `({}+[])[${number(2)}]`;
principalLetters.o = `({}+[])[${number(1)}]`;
principalLetters.e = `({}+[])[${number(4)}]`;
principalLetters.c = `({}+[])[${number(5)}]`;
principalLetters.t = `({}+[])[${number(6)}]`;
principalLetters[' '] = `({}+[])[${number(7)}]`;
principalLetters.f = `(![]+[])[${number(0)}]`;
principalLetters.s = `(![]+[])[${number(3)}]`;
principalLetters.r = `(!![]+[])[${number(1)}]`;
principalLetters.u = `(!![]+[])[${number(2)}]`;
principalLetters.i = `((+!![]/+[])+[])[${number(3)}]`;
principalLetters.n = `((+!![]/+[])+[])[${number(4)}]`;
principalLetters.S = `([]+([]+[])[${fromString('constructor')}])[${number(9)}]`;
principalLetters.g = `([]+([]+[])[${fromString('constructor')}])[${number(14)}]`;
principalLetters.p = `([]+(/-/)[${fromString('constructor')}])[${number(14)}]`;
principalLetters['\\'] = `(/\\\\/+[])[${number(1)}]`;
principalLetters.d = `(${number(13)})[${fromString('toString')}](${number(14)})`;
principalLetters.h = `(${number(17)})[${fromString('toString')}](${number(18)})`;
principalLetters.m = `(${number(22)})[${fromString('toString')}](${number(23)})`;
principalLetters.C = `((()=>{})[${fromString('constructor')}](${fromString('return escape')})()(${principalLetters['\\']}))[${number(2)}]`;

const compile = code => `(()=>{})[${fromString('constructor')}](${fromString(code)})()`;
