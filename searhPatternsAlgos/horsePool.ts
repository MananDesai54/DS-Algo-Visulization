let string = 'I love Angular,Vue,React and I to master it like javaScript';
let pattern = 'React';
string = 'ckuhwtspkezkuhwutoadekuhwnoikuhwlobzcxygegzyzinfcqljnhfthjdiikuhwjobhwygiiblpsxlwxvzpsnedeblmchkuhwztlmkuhwzghs'
pattern = 'kuhw';
const table = new Map();
let found=0;

function makeTable(str:string) {
    str.split('').forEach((letter,index,self)=>{
        table.set(letter,self.length-index-1);
    })
}
makeTable(pattern);

function horsePool(string:string,pattern:string) {
    let index = pattern.length-1;
    let search = true;
    
    while(index<string.length && search) {
        // console.log(index);
        let i:number;
        for(i = pattern.length-1;i>=0;i--) {
            const letter = string[index];
            if(pattern[i]===letter) {
                index--;
            }else if(pattern[i]!==letter) {
                if(table.has(letter)) {
                    index+=table.get(letter);
                    break;
                }else {
                    index+=pattern.length;
                    break;
                }
            }
        }
        if(i===-1) {
            // console.log(index);
            // console.log(string[index]);
            // search=false;
            found++;
            index+=pattern.length+1;
            // break;
        }
    }
}

horsePool(string,pattern);
console.log(found);