let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = '#222';

let context = canvas.getContext('2d');
let blockWidth = 10;

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})

function init() {
    context.clearRect(0,0,canvas.width,canvas.height);
    arr = [];
    visualize();
    for(let i = 0;i<canvas.width/10.05;i++) {
        arr.push(Math.floor(Math.random()*canvas.height-10)+1);
    }
}
let arr = [];

function visualize() {
    arr.forEach((number,index)=>{
        drawBlock(number,index);
    });
}


function drawBlock(number,index) {
    context.beginPath();
    context.strokeStyle = '#eee';
    context.moveTo(index*blockWidth+blockWidth,canvas.height);
    context.lineTo(index*blockWidth+blockWidth,canvas.height-(number+1));
    context.lineWidth = blockWidth;
    context.stroke();
    context.closePath();
}

// for(let i=0;i<arr.length-1;i++) {
//     context.clearRect(0,0,canvas.width,canvas.height);
//     arr.forEach((number,index)=>{
//         drawBlock(number,index);
//     });
//     for(let j=0;j<arr.length-i-1;j++) {
//         if(arr[j]>arr[j+1]) {
//             [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
//         }
//     }
// }

let i=0;
let j=0;
init();
function bubbleSortVisu() {
    if(i===arr.length) {
        return;
    }
    if(j<arr.length-i-1) {
        context.clearRect(0,0,canvas.width,canvas.height);
        if(arr[j]>arr[j+1]) {
            [arr[j],arr[j+1]] = [arr[j+1],arr[j]];
        }
        j++;
    }else {
        i++;
        j = 0;
    }
    visualize();
    console.log(arr);
    requestAnimationFrame(bubbleSortVisu);
}
bubbleSortVisu();