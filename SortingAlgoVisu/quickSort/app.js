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
let states = [];
let sorted = false;

async function init() {
    context.clearRect(0,0,canvas.width,canvas.height);
    arr = [];
    for(let i = 0;i<canvas.width/1.05;i++) {
        arr.push(Math.floor(Math.random()*canvas.height)+1);
        states.push(-1);
    }
    await quickSort(arr,0,arr.length-1);
    sorted = true;
}
init();

async function quickSort(arr,start,end) {
    if(start>=end) return;

    let pIndex = await partition(arr,start,end);
    states[pIndex] = -1;
    await Promise.all([
        quickSort(arr,start,pIndex-1),
        quickSort(arr,pIndex+1,end)
    ])
}

async function partition(arr,start,end) {
    for(let i = start;i<end;i++) {
        states[i] = 1;
    }
    let pivot = arr[end];
    let pIndex = start;
    states[pIndex] = 0;
    for(let i=start;i<end;i++) {
        if(arr[i]<pivot) {
            await swap(arr,pIndex,i);
            states[pIndex] = -1;
            pIndex++;
            states[pIndex] = 0;
        }
    }
    await swap(arr,pIndex,end);
    for(let i = start;i<end;i++) {
        if(i!=pIndex)
            states[i] = -1;
    }
    return pIndex;
}

async function swap(arr,i,j) {
    await sleep(1);
    [arr[i],arr[j]] = [arr[j],arr[i]];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}

function visualize() {
    context.clearRect(0,0,canvas.width,canvas.height);
    arr.forEach((number,index)=>{
        if(states[index]===0) {
            color = '#e76f51';
        }else if(states[index]===1) {
            color = '#2a9d8f';
        }else {
            color = '#eee';
        }
        drawBlock(number,index,color);
    });
    if(sorted) {
        return;
    }
    requestAnimationFrame(visualize);
}
visualize();

function drawBlock(number,index,color) {
    context.beginPath();
    context.strokeStyle = color;
    context.moveTo(index*blockWidth+blockWidth,canvas.height);
    context.lineTo(index*blockWidth+blockWidth,canvas.height-(number+1));
    context.lineWidth = blockWidth;
    context.stroke();
    context.closePath();
}