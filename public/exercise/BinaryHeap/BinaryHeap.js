class BinaryHeap extends Model {
  constructor(){
    super ();

    this.array = new __ARRAYMODULENAME__ ();
    this.tree  = new __TREEMODULENAME__ ();
  }

  generate (other) {
    if (other instanceof BinaryHeap){
      this.generate (other.array);
      this.generate (other.tree);
    } else if (other instanceof __ARRAYMODULENAME__)
      this.array.generate (other);
    else if (other instanceof __TREEMODULENAME__)
      this.tree.generate (other);
    else
      console.error ("UNKNOWN TYPE TO GENERATE: ", other);
  }

  /* ------ EXERCISE STUFF ------ */
  equals(other)
  {
    return this.array.equals (other.array)
         && this.tree.equals (other.tree);
  }

  copy()
  {
    var newHeap   = new __MODULENAME__ ();
    newHeap.array = this.array.copy ();
    newHeap.tree  = this.tree.copy ();
    return newHeap;
  }

  each (f, t)
  {
    if (!t)
      this.array.each (f);
    else
      this.tree.each (f);
  }

  contains (el)
  {
    // check if the model contains given element
    return this.array.indexOf (el) === -1;
  }

  toString(delim){
    if (!delim) delim = " ";
    return this.array.toString (delim);
  }

  toArray(){
    return this.array.get ();
  }
}
