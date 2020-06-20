let data,graph,start,end,path = [],found=false;

window.addEventListener('load',()=>{
    setUp();
});
async function loadData() {
    const res = await fetch('graph.json');
    let data = res.json();
    return data
}

function Node(value) {
    this.value = value;
    this.edges = [];
    this.parent = null;
    this.searched = false;
}
Node.prototype.addEdge = function(friendNode) {
    this.edges.push(friendNode);
    friendNode.edges.push(this);
}


function Graph() {
    this.nodes = [];
    this.graph = {};
    this.start = null;
    this.end = null;
}
Graph.prototype.addNode = function(node) {
    graph.nodes.push(node);
    const name = node.value;
    this.graph[name] = node;
}
Graph.prototype.getNode = function(friend) {
    if(this.graph[friend]) {
        return this.graph[friend];
    }
}
Graph.prototype.setStart = function(node) {
    this.start = this.graph[node];
    return this.start;
}
Graph.prototype.setEnd = function(node) {
    this.end = this.graph[node];
    return this.end;
}

async function setUp() {
    graph = new Graph();

    data = await loadData();
    let list = data.list;
    
    list.forEach(pair=>{
        const name = pair.name;
        const friends = pair.friends;
        
        const nameNode = new Node(name);

        graph.addNode(nameNode);

        friends.forEach(friend=>{
            const f = friend;
            let friendNode = graph.getNode(f);
            if(friendNode===undefined) {
                friendNode = new Node(f);
                graph.addNode(friendNode);
            }
            nameNode.addEdge(friendNode);
        })

    })
    start = graph.setStart(29);
    end  = graph.setEnd(2);

    bfs();
    console.log(graph);
}

let queue = [];

function bfs() {
    queue.push(graph.start);
    start.searched = true;
    
    while(queue.length>0) {
        const friend = queue.shift();
        if(friend===end) {
            found = true;
            break;
        }
        const edges = friend.edges;
        edges.forEach(edge=>{
            const neighbour = edge;
            if(!neighbour.searched) {
                neighbour.parent = friend;
                neighbour.searched = true;
                queue.push(neighbour);
            }
        });
    }

    if(found) {
        path.push(end);
        let next = end.parent;
        while(next) {
            path.push(next);
            next = next.parent;
        }
    }
    console.log(path);

}