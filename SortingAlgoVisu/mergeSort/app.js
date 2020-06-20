let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = '#222';

let context = canvas.getContext('2d');
let blockWidth = 1;

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
let arr = [];
// let states = [];
// let sorted = false;

function init() {
    context.clearRect(0,0,canvas.width,canvas.height);
    arr = [];
    for(let i = 0;i</*canvas.width/1.05*/10;i++) {
        arr.push(Math.floor(Math.random()*canvas.height)+1);
    }
    console.log(arr);
    let sorted =  mergeSort(arr);
    sorted = true;
}
init();

function mergeSort(unsortedArray) {
    if(unsortedArray.length <= 1) return;

    const midIndex = Math.floor(unsortedArray.length/2);
    const left = unsortedArray.slice(0,midIndex);
    const right = unsortedArray.slice(midIndex);
    mergeSort(left);
    mergeSort(right);
    merge(left,right);
}

function merge(left,right) {
    let i=0,j=0,k=0;
    let l = [];
    let r = [];
    let temp = [];

    left.forEach(item=>{
        l.push(item);
    });
    right.forEach(item=>{
        r.push(item);
    });

    while(i>l.length || j>r.length) {
        if(l[i]>=r[j]) {
            temp.push(l[i]);
            l.splice(i,1);
            i++;
        } else {
            temp.push(r[j]);
            r.splice(j,1);
            j++;
        }
        k++;
    }
    while(l.length) {
        temp.push(l[i]);
        i++;
    }
    while(r.length) {
        temp.push(l[j]);
        j++;
    }

    return temp;
}

// async function swap(arr,i,j) {
//     await sleep(1);
//     [arr[i],arr[j]] = [arr[j],arr[i]];
// }

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve,ms));
// }

// function visualize() {
//     context.clearRect(0,0,canvas.width,canvas.height);
//     arr.forEach((number,index)=>{
//         if(states[index]===0) {
//             color = '#e76f51';
//         }else if(states[index]===1) {
//             color = '#2a9d8f';
//         }else {
//             color = '#eee';
//         }
//         drawBlock(number,index,color);
//     });
//     if(sorted) {
//         return;
//     }
//     requestAnimationFrame(visualize);
// }
// visualize();

function drawBlock(number,index,color) {
    context.beginPath();
    context.strokeStyle = color;
    context.moveTo(index*blockWidth+blockWidth,canvas.height);
    context.lineTo(index*blockWidth+blockWidth,canvas.height-(number+1));
    context.lineWidth = blockWidth;
    context.stroke();
    context.closePath();
}