//total nodes
let numNodes = 10;

//total Edges
let edges = [
    [0,1],
    [1,2],
    [2,5],
    [1,6],
    [5,8],
    [6,9],
    [4,7],
    [8,9],
    [5,9],
    [2,3],
    [3,9],
    [3,4]
];

//adjesent List
let graph = new Map();

//Graph
let array = Array(10);
for(let i=0;i<array.length;i++) {
    array[i] = Array(array.length);
    array[i].fill(0);
}

//To set Adjesent list for every nodes
function addNode(node) {
    graph.set(node,[]);
}

//To set Non-Directed
function addEdge(source,destination) {
    graph.get(source).push(destination);
    graph.get(destination).push(source);
    array[source][destination] = 1;
    array[destination][source] = 1;
}

//Setting Adjesent list
for(let i=0;i<numNodes;i++) {
    addNode(i);
}

//Joining Sourse and Destination 
edges.forEach(edge=>{
    addEdge(...edge);
});
console.log(graph);

//Traversal BFS
let visited = new Set();

function BFS(start) {
    const queue = [start];
    visited.add(start);
    while(queue.length > 0) {
        const airport = queue.shift();
        const destinations = graph.get(airport);
        console.log(airport); //log for BFS 
        for(destination of destinations) {
            if(destination===9) {
                //console.log('Found it...!!'); //log for Searching
            }
            if(!visited.has(destination)) {
                visited.add(destination);
                queue.push(destination);
                //console.log(destination); //Log the path for searching
            }
        }
    }
}
//BFS(0);

//Traversal DFS
let visitedDfs = new Set();

function DFS(start) {
    const queue = [start];
    visitedDfs.add(start);
    while(queue.length > 0) {
        const airport = queue.pop();
        console.log(airport);
        const destinations = graph.get(airport);
        for(destination of destinations) {
            if(destination===9) {
                //console.log('Found it...!!'); //log for Searching
            }
            if(!visitedDfs.has(destination)) {
                visitedDfs.add(destination);
                queue.push(destination);
                //console.log(destination); //Log the path for searching
            }
        }
    }
}
DFS(0);

//find path between two nodes
function findPath(start,destination,visited = new Set()) {
    console.log(start);

    visited.add(start);
    const destinations = graph.get(start);
    for(desti of destinations) {
        if(desti===destination) {
            console.log('found it...!!');
            return;
        }if(!visited.has(desti)) {
            findPath(desti,destination,visited);
        }
    }
}
//findPath(1,4);