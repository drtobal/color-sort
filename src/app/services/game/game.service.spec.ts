import { TestBed } from '@angular/core/testing';
import { LAST_GAME_LEVEL_LS, LEVELS } from '../../constants';

import { GameService } from './game.service';

describe('GameService', () => {
  let service: GameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the next available level, first default', () => {
    service['localStorageService']['getData'] = jasmine.createSpy().and.returnValue(null);
    expect(service.getNextLevel()).toEqual(LEVELS[0]);

    service['localStorageService']['getData'] = jasmine.createSpy().and.returnValue({ name: 'undefined level' });
    expect(service.getNextLevel()).toEqual(LEVELS[0]);

    service['localStorageService']['getData'] = jasmine.createSpy().and.returnValue(JSON.parse(JSON.stringify(LEVELS[0])));
    expect(service.getNextLevel()).toEqual(LEVELS[1]);

    service['localStorageService']['getData'] = jasmine.createSpy().and.returnValue(JSON.parse(JSON.stringify(LEVELS[1])));
    expect(service.getNextLevel()).toEqual(LEVELS[2]);

    service['localStorageService']['getData'] = jasmine.createSpy().and.returnValue(JSON.parse(JSON.stringify(LEVELS[2])));
    expect(service.getNextLevel()).toEqual(LEVELS[3]);
  });

  it('should save level data only if it is defined', () => {
    service['localStorageService']['saveData'] = jasmine.createSpy();
    service.saveCompletedLevel('undefined level');
    expect(service['localStorageService']['saveData']).not.toHaveBeenCalled();

    service.saveCompletedLevel(LEVELS[0].name);
    expect(service['localStorageService']['saveData']).toHaveBeenCalledWith(LAST_GAME_LEVEL_LS, LEVELS[0]);
  });
});
