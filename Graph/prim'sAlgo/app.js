let canvas = document.querySelector('canvas');
canvas.style.background = '#222';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let context = canvas.getContext('2d');

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
let nodes = [];

let mouse = {
    x:undefined,
    y:undefined
}

function Node(x,y) {
    this.x = x;
    this.y = y;

    this.draw = function() {
        context.beginPath();
        context.fillStyle = '#eee';
        context.arc(this.x,this.y,10,0,Math.PI*2,false);
        context.fill();
        context.closePath();
    }
}

canvas.addEventListener('click',(e)=>{
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    createCircle();
    //prim();
})

function createCircle() { 
    const node = new Node(mouse.x,mouse.y);
    nodes.push(node);
    node.draw();
}

const button = document.querySelector('button');

button.addEventListener('click',()=>{
    prim();
});


function findDistance(x1,y1,x2,y2) {
    return Math.floor(Math.sqrt(Math.abs(x1-x2)**2+Math.abs(y1-y2)**2));
}
function drawLine(x1,y1,x2,y2) {
    context.beginPath();
    context.strokeStyle = '#eee';
    context.moveTo(x1,y1);
    context.lineTo(x2,y2);
    context.stroke();
    context.closePath();
}

function prim() {
    // console.log('------------------')
    context.clearRect(0,0,window.innerWidth,window.innerHeight);
    let reached = [];
    let unReached = [];
    // console.log(nodes);
    for(let i=0;i<nodes.length;i++) {
        unReached.push(nodes[i]);
    }
    // console.log(reached[0],unReached[0]);
    reached.push(unReached[0]);
    unReached.splice(0,1);
    // console.log(reached[0],unReached[0]);
    while(unReached.length>0) {
        let max = 100000;
        let rIndex,uIndex;
        // console.log(reached.length,unReached.length);
        for(var i=0;i<reached.length;i++) {
            for(var j=0;j<unReached.length;j++) {
                let v1 = reached[i];
                let v2 = unReached[j];
                let dist = findDistance(v1.x,v1.y,v2.x,v2.y);
                if(dist<max) {
                    max = dist;
                    rIndex = i;
                    uIndex = j;
                }
            }
        }
        // console.log(rIndex,uIndex,unReached[uIndex],unReached.length);
        drawLine(reached[rIndex].x,reached[rIndex].y,unReached[uIndex].x,unReached[uIndex].y);
        reached.push(unReached[uIndex]);
        unReached.splice(uIndex,1);

    }
    nodes.forEach(node=>{
        node.draw();
    })
}






// reachedNodes = [];
// nodes.forEach(node=>{
//     unReachedNodes.push(node);
// })

// reachedNodes.push(unReachedNodes[0]);
// unReachedNodes.splice(0,1);
// let distance = Number.MAX_SAFE_INTEGER;
// let dist;
// let reachIndex,unReachIndex;
// while(unReachedNodes.length>0) {
//     for(let i=0;i<reachedNodes.length;i++){
//         for(let j=0;j<unReachedNodes.length;j++){
//             const node = reachedNodes[i];
//             const reach = unReachedNodes[j];
//             dist = findDistance(node.x,node.y,reach.x,reach.y);
//             console.log(distance,dist);
//             if(dist<distance) {
//                 reachIndex = i;
//                 unReachIndex = j;
//                 distance = dist;
//             }
//         }
//     }
//     console.log(dist);
//     console.log(reachIndex,unReachIndex);
//     console.log(unReachedNodes,reachedNodes);
//     drawLine(reachedNodes[reachIndex].x,reachedNodes[reachIndex].y,unReachedNodes[unReachIndex].x,unReachedNodes[unReachIndex].y);
//     reachedNodes.push(unReachedNodes[unReachIndex]);
//     unReachedNodes.splice(unReachIndex,1);
// }