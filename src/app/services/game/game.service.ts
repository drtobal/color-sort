import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NewGame } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private _newGame = new Subject<NewGame>();

  get newGame(): Subject<NewGame> {
    return this._newGame;
  }
}
