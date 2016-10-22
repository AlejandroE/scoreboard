class ScoreBoardController {
  constructor() {
    this.score = 0;
  }
}

export const ScoreBoard = {
  template: require('./ScoreBoard.html'),
  controller: ScoreBoardController,
  bindings: {
    score: '<'
  }
};
