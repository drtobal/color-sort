import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LAST_GAME_LEVEL_LS, LEVELS } from '../../constants';
import { NewGame } from '../../types';
import { LocalStorageService } from '../local-storage/local-storage.service';

/** singleton service for global storage */
@Injectable({
  providedIn: 'root'
})
export class GameService {
  /** new game request suscriber */
  private _newGame = new Subject<NewGame>();

  /** service constructor */
  constructor(
    private localStorageService: LocalStorageService,
  ) { /* do nothing */ }

  /** get the new game subscriber */
  get newGame(): Subject<NewGame> {
    return this._newGame;
  }

  /** get the next level available, first if can't get it */
  getNextLevel(): NewGame {
    const lastLevel = this.localStorageService.getData<NewGame>(LAST_GAME_LEVEL_LS);
    if (lastLevel) {
      const levelIndex = LEVELS.findIndex(l => l.name === lastLevel.name);

      if (levelIndex > -1 && levelIndex < LEVELS.length - 1) {
        return LEVELS[levelIndex + 1];
      }
    }

    return LEVELS[0];
  }

  saveCompletedLevel(levelName: string): void {
    const level = LEVELS.find(l => l.name === levelName);
    if (level) {
      this.localStorageService.saveData(LAST_GAME_LEVEL_LS, level);
    }
  }
}
