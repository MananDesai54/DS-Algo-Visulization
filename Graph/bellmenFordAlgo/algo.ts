//will not work on graph where there in cycle of edges

// const numEdges = 7;
const numEdges = 4;
const maxNum = Number.MAX_SAFE_INTEGER;

// const edges = [
//     [1,2,6],
//     [1,3,5],
//     [1,4,5],
//     [3,2,-2],
//     [4,3,-2],
//     [2,5,-1],
//     [3,5,1],
//     [4,6,-1],
//     [5,7,3],
//     [6,7,3]
// ]
const edges = [
    [1,2,4],
    [1,4,5],
    [4,3,3],
    [3,2,-10],
    [2,4,5]
]

const graph = new Map();

function setNodes(value:number):void {
    graph.set(value,{position:maxNum,parent:null,childs:[]})
}

function setEdges(start:number,end:number):void {
    graph.get(start).childs.push(end);
    graph.get(end).childs.push(start);
}

for(let i=1;i<=numEdges;i++) {
    setNodes(i);
}
edges.forEach((edge:number[])=>{
    const [start,end] = edge;
    setEdges(start,end);
})
// console.log(graph);
//assume start node as 1
graph.get(1).position = 0;
for(let i=1;i<numEdges;i++) {
    edges.forEach((edge:number[])=>{
        const [start,end,dist] = edge;
        if(graph.get(start).position+dist<graph.get(end).position) {
            graph.get(end).position = graph.get(start).position+dist;
            graph.get(end).parent = start;
        }
    })
}
console.log(graph);