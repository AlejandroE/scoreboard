import angular from 'angular';

import {MainSection} from './app/MainSection';
import {RollButton} from './app/RollButton';
import {ScoreBoard} from './app/ScoreBoard';

import './index.scss';

export const app = 'app';

angular
  .module(app, [])
  .component('app', MainSection)
  .component('rollButton', RollButton)
  .component('scoreBoard', ScoreBoard);
