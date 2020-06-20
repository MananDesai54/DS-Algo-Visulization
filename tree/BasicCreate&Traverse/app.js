/*
In this program basic tree creation, traversal and getting tree from different output of traversal is provided
 */

let tree = [
    [1,2,3],
    [2,4,5],
    [3,6,7],
    [4,8],
    [7,9,10],
    [8,11,12]
]

/*
    making to base Object for tree
*/
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}


/*
    making of tree , map is used to store nodes so we can check node will not crate twise..
*/
let map = new Map();
let head = null;

function makeTree() {
    tree.forEach((pair,index)=>{
        let parent,left,right;
        if(!map.has(pair[0])) {
            parent = createNode(pair[0]);
            map.set(pair[0],parent);
        }else {
            parent = map.get(pair[0]);
        }
        if(index===0) {
            head = parent;
        }
        if(pair.length===3) {
            right = createNode(pair[2]);
            left = createNode(pair[1]);
        }else {
            left = createNode(pair[1]);
            right = null;
        }
        parent.left = left.value;
        if(!map.has(left.value)) {
            map.set(left.value,left)
        }
        if(right) {
            parent.right = right.value;
            if(!map.has(right.value)) {
                map.set(right.value,right)
            }
        }
    })
}makeTree();

function createNode(value) {
    return new Node(value);
}


/*
    traversal BFS & DFS
*/

function inorder(head) {
    if(head==null) {
        return
    }
    inorder(map.get(head.left));
    console.log(head.value);
    inorder(map.get(head.right));
}
// console.log('*********Inorder********')
// inorder(map.get(head.value));

function preorder(head) {
    if(head==null) {
        return
    }
    console.log(head.value);
    preorder(map.get(head.left));
    preorder(map.get(head.right));
}
// console.log('*********Preorder********')
// preorder(map.get(head.value));

function postorder(head) {
    if(head==null) {
        return
    }
    postorder(map.get(head.left));
    postorder(map.get(head.right));
    console.log(head.value);
}
// console.log('*********Postorder********')
// postorder(map.get(head.value));

let queue = [];
queue.push(map.get(head.value));
function levelOrder() {
    while(queue.length) {
        const value = queue.shift();
        console.log(value.value);
        const left = map.get(value.left);
        const right = map.get(value.right);
        if(left) {
            queue.push(left)
        }if(right) {
            queue.push(right)
        }
    }
}
// console.log('*******Level order*********');
// levelOrder();


/*
    making of tree from output of different traversal. 
    You need to provide at-least two traversal to get a tree.(Mostly give any two from BFS).
*/
let newMap = new Map();
let newHead;
let traversal1;
let traversal2;

let traversal1OP;
let traversal2OP;

/*
    Inorder and preorder
*/
traversal1 = 'inorder';
traversal2 = 'preorder';

traversal1OP = '11 8 12 4 2 5 1 6 3 9 7 10';
traversal2OP = '1 2 4 8 11 12 5 3 6 7 9 10';

if((traversal1==='inorder' && traversal2==='preorder') || (traversal2==='inorder' && traversal1==='preorder')) {
    let leftSideInTemp = traversal1OP.split(' ').map(value=>+value);
    let leftSidePreTemp = traversal2OP.split(' ').map(value=>+value);

    //newHead = makeTreeFromTraversal(0,0,traversal1OP.length-1,leftSidePreTemp,leftSideInTemp)
    function makeTreeFromTraversal(preStart,inStart,inEnd,preorder,inorder) {
        if (preStart>preorder.length-1 || inStart>inEnd) 
            return null;

        let inIndex=0;
        let valueRoot = preorder[preStart];
        const root = new Node(valueRoot);
        newMap.set(valueRoot,root);

        for(let i=0;i<inorder.length;i++){
            if(inorder[i]===root.value) {
                inIndex = i;
            }
        }
        left = makeTreeFromTraversal(preStart+1,inStart,inIndex-1,preorder,inorder);
        if(left) {
            root.left = left.value;
        }else {
            root.left = null;
        }
        right = makeTreeFromTraversal(preStart+inIndex-inStart+1,inIndex+1,inEnd,preorder,inorder);
        if(right) {
            root.right = right.value;
        }else {
            root.right = null;
        }
        
        return root;
    }
}

/* 
    Inorder and postorder
*/

traversal1 = 'inorder';
traversal2 = 'postorder';

traversal1OP = '11 8 12 4 2 5 1 6 3 9 7 10';
traversal2OP = '11 12 8 4 5 2 6 9 10 7 3 1';

if((traversal1==='inorder' && traversal2==='postorder') || (traversal2==='inorder' && traversal1==='postorder')) {
    let leftSideInTemp = traversal1OP.split(' ').map(value=>+value);
    let leftSidePostTemp = traversal2OP.split(' ').map(value=>+value);

    //newHead = makeTreeFromTraversal(leftSidePostTemp.length-1,0,traversal1OP.length-1,leftSidePostTemp,leftSideInTemp)
    function makeTreeFromTraversal(postEnd,inStart,inEnd,postorder,inorder) {
        if (postEnd<0 || inStart>inEnd) 
            return null;

        let inIndex=0;
        let valueRoot = postorder[postEnd];
        const root = new Node(valueRoot);
        newMap.set(valueRoot,root);
        for(let i=0;i<inorder.length;i++){
            if(inorder[i]===root.value) {
                inIndex = i;
            }
        }
        right = makeTreeFromTraversal(postEnd-1,inIndex+1,inEnd,postorder,inorder);
        if(right) {
            root.right = right.value;
        }else {
            root.right = null;
        }

        left = makeTreeFromTraversal(postEnd-inIndex,inStart,inIndex-1,postorder,inorder);
        if(left) {
            root.left = left.value;
        }else {
            root.left = null;
        }
        
        return root;
    }
}

/*
    preorder and postorder
*/

traversal1 = 'preorder';
traversal2 = 'postorder';

traversal1OP = '1 2 4 8 11 12 5 3 6 7 9 10';
traversal2OP = '11 12 8 4 5 2 6 9 10 7 3 1';

if((traversal1==='preorder' && traversal2==='postorder') || (traversal2==='preorder' && traversal1==='postorder')) {
    let leftSidePreTemp = traversal1OP.split(' ').map(value=>+value);
    let leftSidePostTemp = traversal2OP.split(' ').map(value=>+value);

    //newHead = makeTreeFromTraversal(0,leftSidePreTemp.length-1,0,leftSidePostTemp.length-1,leftSidePreTemp,leftSidePostTemp)
}
//not completed..