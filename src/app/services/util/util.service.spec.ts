import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { UtilService } from './util.service';

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return after wait time', fakeAsync(() => {
    let result = null;
    UtilService.wait(200).then(() => result = true);
    expect(result).toBeNull();
    tick(201);
    expect(result).toBeTrue();
  }));

  it('should clone a object', () => {
    const object = { a: { b: { c: 'test' } } };
    const clone = UtilService.deepClone(object);
    object.a.b.c = 'original';
    expect(object.a.b.c).toBe('original');
    expect(clone.a.b.c).toBe('test');
  });

  it('should clone a object when does not have structured clone', () => {
    const object = { a: { b: { c: 'test' } } };
    const clone = UtilService.deepClone(object, null as any);
    object.a.b.c = 'original';
    expect(object.a.b.c).toBe('original');
    expect(clone.a.b.c).toBe('test');
  });

  it('should return the position of the div', () => {
    const div = document.createElement('div');
    div.style.position = 'fixed';
    div.style.top = '22px';
    div.style.left = '36px';
    document.body.appendChild(div);

    expect(UtilService.getOffset(div)).toEqual({ top: 22, left: 36 });
    div.remove();
  });
});
