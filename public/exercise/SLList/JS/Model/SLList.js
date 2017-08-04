/*
  Singly Linked List ...
*/

const HEAD_NODE_ID = 0;
const TAIL_NODE_ID = 1;

class SinglyLinkedList extends Model {
  constructor(){
    super ();

    this.head = null;
    this.tail = null;
    this.n    = 0;

    this.nodes = { };
  }

  /* ---- PRIVATE ---- */
  _create (value, next) {
      var newNode = new Node (value, next);
      this.nodes [newNode.id] = newNode;
      return newNode;
  }

  _specialId (id) {
    return id === HEAD_NODE_ID || id === TAIL_NODE_ID;
  }

  /* ---- OPERATIONS ----- */
  push (data) {
    var newNode = this._create (data, this.head)
    this.head   = newNode;

    if (!this.n)
      this.tail = newNode;

    this.n++;
    return data;
  }

  pop () {
    if (!this.n) return null;

    var retVal = this.head.data;
    this.head  = this.head.next;

    if (! (--this.n)) // n -= 1; n != 0
      this.tail = null;

    return retVal;
  }

  remove () {
    return this.pop ();
  }

  add (data) {
    var newNode = this._create (data);

    if (!this.n)
      this.head = newNode;
    else
      this.tail.next = newNode;

    this.tail = newNode;
    this.n ++;

    return data;
  }

  /* ---- USER MODEL ---- */
  _findById(id) { return this.nodes [id] || null; }

  connect (sourceId, targetId) {
    console.log(sourceId);

    var n1 = this._findById (sourceId);
    var n2 = this._findById (targetId);

    if (!n1 && !this._specialId (sourceId)) return;

    console.log ("oh, hey");

    // We have three cases here: Head node, Tail node, or an actual node ...
    switch (sourceId) {
      case HEAD_NODE_ID:
        this.head = n2;
        break;
      case TAIL_NODE_ID:
        this.tail = n2;
        break;
      default:
        n1.next = n2;
        break;
    }
  }

  create (value){ return this._create(value); }
  makeHeadNode(){ return HEAD_NODE_ID; }
  makeTailNode(){ return TAIL_NODE_ID; }

  // map nodes from this sllist to another sllist
  mapTo (newList) {
    var cur = newList.head;
    var results = { };

    this.each ((data,node)=>{
      if (!cur){
        results = null;
        return false;
      }

      results [node.id] = cur.id;
      cur = cur.next;
    });

    return results;
  }

  // path exists to nodes
  nodesInList () {
    var results = [ ];
    this.each((data,node)=>{
      results.push(node);
    });

    if (results.indexOf (this.tail) === -1)
      results.push (this.tail);

    return results;
  }

  // path does not exist to nodes
  nodesOut () {
    var nodesIn = this.nodesInList ();
    var results = [ ];

    for (var i in this.nodes)
      if (nodesIn.indexOf (this.nodes [i]) === -1)
        results.push (this.nodes [i]);

    return results;
  }

  /* ------ HELPERS ------ */
  each (f) {
    var curNode = this.head;
    while (curNode) {
      var r = f (curNode.data, curNode);

      if (r === false) return;

      curNode = curNode.next;
    }
  }

  /* REQUIRED BY MODEL */
  equals(other)
  {
    var checkNode = function (n1, n2) {
      if (!n1 && n2) return false;
      if (!n2 && n1) return false;
      if (!n1 && !n2) return true;
      return n1.data === n2.data;
    }

    // make sure the two tails match ...
    if (!checkNode (this.tail, other.tail))
      return false;
    
    // compare every node, in order, to ensure they're the same
    var equal = true;
    var n2 = other.head;
    this.each ((d1, n1)=>{
      if (!checkNode (n1, n2)){
        equal = false;
        return false;
      }
      n2 = n2.next;
    })

    // only true if we didn't find a difference in the nodes
    //  & there's no more elements in other (after going through self)
    return equal && !n2;
  }

  copy()
  {
    var newList = new SinglyLinkedList ();

    this.each ((d) => {
        newList.add (d);
    });

    return newList;
  }



  toString (delim)
  {
    delim = delim || " ";
    var s = "";

    this.each ((d)=>{
      s += d + delim;
    });

    return s;
  }

  contains (x)
  {
    var res = false;

    this.each ((d)=>{
      if (d === x){
        res = true;
        return false;
      }
    });

    return res;
  }
}
