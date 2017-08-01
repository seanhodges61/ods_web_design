/*jshint esversion: 6 */ 'use strict';

class Depth extends TermQuestion {
  generateParameters()
  {
    return ODSRandom.getRandomIntInclusive(__depthMinParam__, __depthMaxParam__);
  }

  get fullName () {
    return this.name.toLowerCase() + " = " + this.getParametersString();
  }
}
