class DLListBase extends Model {
  constructor(){
    super ();

    var dummy = new Node ();
    dummy.next = dummy;
    dummy.prev = dummy;

    this.dummy = dummy;
    this.n     = 0;
  }

  /* --- PRIVATE HELPERS --- */
  _getNode (i, f) {
    // optional function to call on each iteration
    if (!f) f = function(){};

    var p = null;
    if (i < this.n / 2) {
      p = this.dummy;
      for (let j = 0; j <= i; j++) {
        p = p.next;
        if (f) f(p);
      }
    } else {
      p = this.dummy;
      for (let j = this.n; j > i; j--){
        if (f) f(p);
        p = p.prev;
      }
    }

    return p;
  }

  _removeNode (w) {
    w.prev.next = w.next;
    w.next.prev = w.prev;
    this.n --;

    return w;
  }

  _addBefore (w, x) {
    var newNode = new Node (x);
    newNode.prev      = w.prev;
    newNode.next      = w;
    newNode.prev.next = newNode;
    newNode.next.prev = newNode;

    this.n ++;
    return newNode;
  }

  /* --- OPERATIONS --- */
  get (i) {
    if (i < 0 || i >= this.n) return null;
    return this._getNode (i).data;
  }

  set (i, x) {
    if (i < 0 || i >= this.n) return null;
    var node = this._getNode (i);

    var prev = node.data;
    node.data = x;
    return prev;
  }

  add (i, x) {
    if (!x){
      x = i;
      i = this.n;
    }

    if (i < 0 || i > this.n) return false;
    this._addBefore (this._getNode (i), x);
    return true;
  }

  remove (i) {
    if (i < 0 || i >= this.n) return false;
    return this._removeNode (this._getNode (i)).data;
  }
}
