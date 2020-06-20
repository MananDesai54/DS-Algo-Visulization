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
let array = [];
let visualArray = [];
let states = [];
let sorted = false;
let nextStart = 0

async function init() {
    context.clearRect(0,0,canvas.width,canvas.height);
    array = [];
    for(let i = 0;i<canvas.width/1.05;i++) {
        const num = Math.floor(Math.random()*canvas.height)+1;
        array.push(num);
        visualArray.push(num);
    }
    await mergeSortArray(array);
    sorted = true;
}

async function mergeSortArray(array,previousLeft=0,previousRight=0) {
    var len = array.length;
    if (len < 2)
        return;
    var middle = len / 2;
    var left = array.slice(0, middle);
    var right = array.slice(middle, len);
    // await Promise.all([
    nextStart = previousLeft 
    await mergeSortArray(left,0);
    nextStart = previousRight
    await mergeSortArray(right,middle);
    // ])
    await mergeArray(left,right,array,middle)
}

async function mergeArray(left, right, array,middle) {
    var nL = left.length;
    var nR = right.length;
    var i = 0;
    var j = 0;
    var k = 0;
    while (i < nL && j < nR) {
        if (left[i] <= right[j]) {
            // array[k] = left[i];
            await putValue(array,left,k,i);
            i++;
        }
        else {
            // array[k] = right[j];
            await putValue(array,right,k,j,middle);
            j++;
        }
        k++;
    }
    
    while (i < nL) {
        // array[k] = left[i];
        await putValue(array,left,k,i);
        k++;
        i++;
    }
    while (j < nR) {
        // array[k] = right[j];
        await putValue(array,right,k,j,middle);
        k++;
        j++;
    }
}

init();


async function putValue(array,sec,k,i,middle=null) {
    await sleep(0);
    // if(middle) {
        // visualArray[middle+k+i] = sec[i] 
    // }else {
        visualArray[nextStart+k] = sec[i];
    // }
    array[k] = sec[i];
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve,ms));
}

function visualize() {
    context.clearRect(0,0,canvas.width,canvas.height);
    visualArray.forEach((number,index)=>{
        // if(states[index]===0) {
        //     color = '#e76f51';
        // // }else if(states[index]===1) {
        // //     color = '#2a9d8f';
        // }else {
        //     color = '#eee';
        // }
        color = '#eeeeee'
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