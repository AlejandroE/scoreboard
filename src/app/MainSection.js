class MainSectionController {
  /** @ngInject */
  constructor() {
    this.frames = [];
    this.previousIndex = 0;
    this.currentIndex = 0;
    this.maxRoll = 10;
    this.flatRollList = [];
    this.partialScore = 0;
    this.gameOver = false;
  }

  updateFrame(pinsDown) {
    if (!this.gameOver) {
      this.countRoll(pinsDown);
      this.addUpBonuses(this.previousIndex);
      this.updateScore();
      this.checkTurn();
    } else {
      this.resetScore();
    }
  }

  countRoll(pinsDown) {
    this.previousIndex = this.currentIndex;
    // if we are begining a new frame
    if (!this.frames[this.currentIndex]) {
      if (pinsDown === 10) {
        this.frames[this.currentIndex] = {
          firstRoll: 'X',
          secondRoll: '',
          scoreSum: '-'
        };
        this.currentIndex++;
      } else {
        this.frames[this.currentIndex] = { firstRoll: pinsDown };
        this.maxRoll = 10 - pinsDown;
      }
    } else {
      this.frames[this.currentIndex].secondRoll = pinsDown;
      if (this.frames[this.currentIndex].firstRoll + this.frames[this.currentIndex].secondRoll === 10){
        this.frames[this.currentIndex].scoreSum = '-';
      } else {
        this.frames[this.currentIndex].scoreSum = this.frames[this.currentIndex].firstRoll + this.frames[this.currentIndex].secondRoll;
      }
      this.maxRoll = 10;
      this.currentIndex++;
    }
    this.flatRollList.push(pinsDown);
  }

  addUpBonuses(index) {
    const lastFrame = this.frames[index-1];
    const preLastFrame = this.frames[index-2];
    const rollsLength = this.flatRollList.length
    // if last one was spare add bonus
    if ( !!lastFrame && lastFrame.scoreSum === '-' && lastFrame.firstRoll !== 'X') {
      lastFrame.scoreSum = this.flatRollList[rollsLength-1] + 10;
    }
    //if last frame was a strike
    if ( !!lastFrame && lastFrame.firstRoll === 'X') {
      // check previous frame
      if (!!preLastFrame && preLastFrame.firstRoll === 'X') {
        preLastFrame.scoreSum = this.flatRollList[rollsLength-1] + 20;
      } else {
        if (this.frames[index].hasOwnProperty('secondRoll') && this.frames[index].firstRoll !== 'X') {
          lastFrame.scoreSum = this.flatRollList[rollsLength-1] + this.flatRollList[rollsLength-2] + 10;
        }
      }
    }
  }

  updateScore(){
    this.partialScore = this.frames.reduce( (prev, next, index) =>{
      if (!!next.scoreSum && !isNaN(parseInt(next.scoreSum))) {
        return prev + next.scoreSum;
      } else {
        return prev;
      }
    }, 0);
  }

  checkTurn() {
    if (this.currentIndex > 9 ) {
      this.gameOver = true;
    }
  }

  resetScore() {
    this.frames = [];
    this.previousIndex = 0;
    this.currentIndex = 0;
    this.maxRoll = 10;
    this.flatRollList = [];
    this.partialScore = 0;
    this.gameOver = false;
  }

}

export const MainSection = {
  template: require('./MainSection.html'),
  controller: MainSectionController,
  bindings: {}
};
