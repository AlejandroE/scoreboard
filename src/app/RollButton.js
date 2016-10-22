class RollButtonController {
  constructor() {
    this.editing = false;
  }

  rollRandom() {
    const pinsDown = this.getRandomInt(0, this.maxRoll);
    this.onRoll({$event: {score: pinsDown}});
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max + 1 - min)) + min;
  }

}

export const RollButton = {
  template: require('./RollButton.html'),
  controller: RollButtonController,
  bindings: {
    onRoll: '&',
    maxRoll: '<',
    gameOver: '<'
  }
};
