import { TestBed } from '@angular/core/testing';

import { LocalStorageService } from './local-storage.service';

describe('LocalStorageService', () => {
  let service: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('it should save data', () => {
    window.localStorage.setItem = jasmine.createSpy();
    service.saveData('a', 'a', false); // LS not enabled
    expect(window.localStorage.setItem).not.toHaveBeenCalled();

    window.localStorage.setItem = jasmine.createSpy();
    service.saveData('a', { a: 'b' });
    expect(window.localStorage.setItem).toHaveBeenCalledWith('a', '{"a":"b"}');
  });

  it('it should return the data', () => {
    expect(service.getData('a', false)).toBeNull(); // ls not enabled

    window.localStorage.getItem = jasmine.createSpy().and.returnValue(null); // no data
    expect(service.getData('a')).toBeNull();

    window.localStorage.getItem = jasmine.createSpy().and.returnValue('{"a": "b"}'); // return data
    expect(service.getData('a')).toEqual({ a: 'b' });
  });
});
