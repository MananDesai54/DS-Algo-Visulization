function Node(value,dist) {
    this.value = value;
    this.distance = dist;
    // this.parent = null;
}
let total = Number.MAX_SAFE_INTEGER;

const numNodes = 9;
const edges = [
    [0,1,4],
    [0,7,8],
    [1,7,11],
    [1,2,8],
    [2,3,7],
    [2,5,4],
    [2,8,2],
    [3,4,9],
    [3,5,14],
    [4,5,10],
    [5,6,2],
    [6,7,1],
    [6,8,6],
    [7,8,7]
];

let graph = new Map();

function setEdges(start,end,dist) {
    graph.get(start).nodes.push(new Node(end,dist));
    graph.get(end).nodes.push(new Node(start,dist));
}

function setNodes(node) {
    graph.set(node,{parent:null,nodes:[],path:[],position:Number.MAX_SAFE_INTEGER,value:node,searched:false});
}

for(let i=0;i<numNodes;i++) {
    setNodes(i);
}
edges.forEach(edge=>{
    setEdges(...edge);
})

let start = 1;
graph.get(start).position = 0;
graph.get(start).searched = true;
let unreached = [];
unreached.push(graph.get(start));


// for(let i=1;i<=numNodes;i++) {
//     unreached.push(graph.get(i));
// }
// console.log(unreached);
function sortPlease() {
    if(unreached.length>1) {
        unreached.sort((a,b)=>{
            if(a.position<b.position) {
                return -1;
            }
            else if(a.position>b.position) {
                return 1;
            }else {
                return 0;
            }
        });
    }
} 
// console.log(unreached)
// console.log(start)
while(unreached.length>0) {
    sortPlease();
    const item = unreached.shift();
    const parent = item;
    // console.log(parent.value)
    graph.get(parent.value).searched = true;
    item.nodes.forEach(node=>{
        {
            // console.log(node.value);
            if(parent.position+node.distance<graph.get(node.value).position) {
                graph.get(node.value).position = parent.position+node.distance;
                graph.get(node.value).searched = true;
                unreached.push(graph.get(node.value));
                graph.get(node.value).parent = parent;
                // graph.get(parent.value).parent = node;
                graph.get(node.value).path.push(node.value);
                let currentParent = parent;
                while(currentParent) {
                    graph.get(node.value).path.push(currentParent.value);
                    currentParent = currentParent.parent;
                }
                // console.log(node.value,graph.get(node.value).position);
            }
        }
    })
}
// console.log(graph);