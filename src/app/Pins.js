class PinsController {
  constructor() {
    this.pinsStanding = 10;
  }

  getPins() {
    return (new Array(this.pinsStanding));
  }
}

export const Pins = {
  template: require('./Pins.html'),
  controller: PinsController,
  bindings: {
    pinsStanding: '<'
  }
};
