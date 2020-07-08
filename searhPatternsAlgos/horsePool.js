// const readline = require('readline');

// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// rl.question('What do you think of Node.js? ', (answer) => {
//   // TODO: Log the answer in a database
//   console.log(`Thank you for your valuable feedback: ${answer}`);

//   rl.close();
// });

// const fs = require('fs');

// const readStream = fs.createReadStream(__dirname+'/i1.txt',{encoding:'utf-8'});
// readStream.on('data',chunk=>{
//     console.log(chunk);
// })

var string = 'I love Angular,Vue,React and I to master it like javaScript';
var pattern = 'React';
string = 'zbkxfkvrxfqymqybzekbesztwrxfqymqybzkcwkfsmjrxfqymqybzruzpzdcbtkwizhlxrrxfqymqybzbgpbykqyaqrvneavjhrmsmk';
pattern = 'rxfqymqybz';

var table = new Map();
var found = 0;
function makeTable(str) {
    str.split('').forEach(function (letter, index, self) {
        table.set(letter, self.length - index - 1);
    });
}
makeTable(pattern);
function horsePool(string, pattern) {
    var index = pattern.length - 1;
    var search = true;
    while (index < string.length && search) {
        // console.log(index);
        var i = void 0;
        for (i = pattern.length - 1; i >= 0; i--) {
            var letter = string[index];
            if (pattern[i] === letter) {
                index--;
            }
            else if (pattern[i] !== letter) {
                if (table.has(letter)) {
                    index += table.get(letter);
                    break;
                }
                else {
                    index += pattern.length;
                    break;
                }
            }
        }
        if (i === -1) {
            // console.log(index);
            // console.log(string[index]);
            // search=false;
            found++;
            index += pattern.length + 1;
            // break;
        }
    }
}
horsePool(string, pattern);
console.log(found);
