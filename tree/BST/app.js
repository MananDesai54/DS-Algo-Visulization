let tree;
let nodes = [50,41,89,20,56,42,78,4,53,19,15,14,99,72];
let canvas = document.querySelector('canvas');
canvas.style.background = '#222';
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let context = canvas.getContext('2d');

window.addEventListener('resize',()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;    
    setUp();
})

function setUp() {
    tree = new Tree();
    createTree();
    tree.inorder();
    setTimeout(()=>{
        tree.delete(50);
    },1000);
    setTimeout(()=>{
        tree.addNode(3);
        tree.inorder();
    },2000);
}
function createTree() {
    for(let i=0;i<nodes.length;i++) {
        tree.addNode(nodes[i]);
    }
}

function Node(value=null) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.x = 0;
    this.y = 0;
    this.level = 0;
    this.parentX = 0;
    this.parentY = 0;
}

function Tree() {
    this.root = null;
}

Node.prototype.addNode = function(node) {
    if(node.value<this.value) {
        if(this.left===null){
            this.left = node;
            this.left.level = this.level+1;
            this.left.x = (this.x)-(200/this.left.level);
            this.left.y = this.y+40+(this.left.level*5);
            this.left.parentX = this.x;
            this.left.parentY = this.y;
        }else {
            this.left.addNode(node,this);
        }
    }else if(node.value>this.value) {
        if(this.right===null){
            this.right = node;
            this.right.level = this.level+1;
            this.right.x = (this.x)+(200/this.right.level);
            this.right.y = this.y+40+(this.right.level*5);
            this.right.parentX = this.x;
            this.right.parentY = this.y;
        }else {
            this.right.addNode(node,this);
        }
    }
}
Node.prototype.inorder = function() {
    if(this.left !== null) {
        this.left.inorder();
    }
    console.log(this.value);
    this.createHTML(this.value);
    if(this.right !== null) {
        this.right.inorder();
    }
}
Node.prototype.preorder = function() {
    console.log(this.value);
    if(this.left !== null) {
        this.left.preorder();
    }
    if(this.right !== null) {
        this.right.preorder();
    }
}
Node.prototype.postorder = function() {
    if(this.left !== null) {
        this.left.postorder();
    }
    if(this.right !== null) {
        this.right.postorder();
    }
    console.log(this.value);
}
Node.prototype.find = function(value) {
    if(this.value===value) {
        return this;
    }else if(value<this.value && this.left!==null) {
        return this.left.find(value);
    }else if(value>this.value && this.right!==null) {
        return this.right.find(value);
    }else {
        return null;
    }
}
Node.prototype.createHTML = function(value) {
    context.beginPath();
    if(parent!==null) {
        context.strokeStyle = '#eee';
        context.moveTo(this.parentX,this.parentY);
        context.lineTo(this.x,this.y);
        context.stroke();
    }else {
        context.strokeStyle = '#eee';
        context.moveTo(this.x,0);
        context.lineTo(this.x,this.y);
        context.stroke();
    }
    context.closePath();
    context.beginPath();
    context.fillStyle = '#eee';
    context.arc(this.x,this.y,15,0,Math.PI*2,false);
    context.fill();
    context.closePath();
    context.fillStyle = '#222';
    context.font = '20px Verdana'
    context.fillText(value,this.x-12,this.y+8);
}
Node.prototype.delete = function(value) {
    if(this===null) {
        return this;
    }else if(this.value>value) {
        this.left = this.left.delete(value);
    }else if(this.value<value) {
        this.right = this.right.delete(value);
    }else if(this.value===value){
        if(this.left===null) {
            return this.right;
        }else if(this.right===null) {
            return this.left;
        }
        const node = this.right.findMin();
        this.value = node.value;
        this.right.delete(node.value);
    }
    return this;
}
Node.prototype.findMin = function() {
    if(this.left===null) {
        return this;
    }
    return this.left.findMin();
}
Node.prototype.findMax = function() {
    if(this.right===null) {
        return this;
    }
    return this.right.findMax();
}


Tree.prototype.addNode =  function (value) {
    let node = new Node(value);
    if (this.root===null) {
        this.root = node;
        this.root.x = canvas.width/2;
        this.root.y = 70;
        this.root.parentX = canvas.width/2;
        this.root.parentY = 0;
        this.root.level = 1;
    }else {
        this.root.addNode(node,this.root);
    }
}
Tree.prototype.inorder = function() {
    this.root.inorder();
}
Tree.prototype.preorder = function() {
    this.root.preorder();
}
Tree.prototype.postorder = function() {
    this.root.postorder();
}
Tree.prototype.search = function(value) {
    const found = this.root.find(value);
    return found;
}
Tree.prototype.delete = function(value) {
    const found = this.root.find(value);
    if(found) {
        tree.root = this.root.delete(value);
        context.clearRect(0,0,window.innerWidth,window.innerHeight);
        tree.inorder();
    }else {
        console.log('Tree has no such value');
    }
}
Tree.prototype.findMin = function() {
    const value = this.root.findMin();
    console.log(value);
}
Tree.prototype.findMax = function() {
    const value = this.root.findMax();
    console.log(value);
}

setUp();