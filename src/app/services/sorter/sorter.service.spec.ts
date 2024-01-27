import { TestBed } from '@angular/core/testing';

import { SorterService } from './sorter.service';

describe('SorterService', () => {
  let service: SorterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SorterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should multiply an array n times', () => {
    expect(service.multipliArray([], 0, 0)).toEqual([]);
    expect(service.multipliArray([1, 2, 3], 0, 0)).toEqual([]);
    expect(service.multipliArray([], 1, 1)).toEqual([]);
    expect(service.multipliArray([1], 1, 1)).toEqual([1]);
    expect(service.multipliArray([1, 2, 3], 1, 1)).toEqual([1, 2, 3]);
    expect(service.multipliArray([1, 2], 2, 1)).toEqual([1, 2, 1, 2]);
    expect(service.multipliArray([1, 2], 2, 2)).toEqual([1, 2, 1, 2, 1, 2, 1, 2]);
    expect(service.multipliArray([1, 2], 2, 3)).toEqual([1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2]);
  });

  it('should move a color between bottles', () => {
    expect(service.moveColor([], [])).toBeDefined(); // default

    // full bottle, cant move
    expect(service.moveColor([1, 2, 3], [2, 2, 3], 3)).toEqual({ source: [1, 2, 3], target: [2, 2, 3], moved: false });

    // move from a to b
    expect(service.moveColor([1, 2, 3, 4], [8, 9, 10], 4)).toEqual({ source: [1, 2, 3], target: [8, 9, 10, 4], moved: true });
  });

  it('should generate bottles', () => {
    expect(service.generateBottles().length).toBeGreaterThan(1); // default
    expect(service.generateBottles(2, 2, 2).length).toBe(5); // 4 plus empty bottle
    expect(service.generateBottles(4, 2, 2).length).toBe(9);
  });

  it('it should return true if all bottles are finished', () => {
    expect(service.checkBottlesFinished([[], []])).toBeTrue();
    expect(service.checkBottlesFinished([[], []], 2)).toBeTrue();
    expect(service.checkBottlesFinished([[1, 1], [2]], 2)).toBeFalse();
    expect(service.checkBottlesFinished([[1, 1], [2, 2]], 2)).toBeTrue();
    expect(service.checkBottlesFinished([[1, 1], [2, 2], [], []], 2)).toBeTrue();
    expect(service.checkBottlesFinished([[1, 1, 1], [2, 2], [], []], 3)).toBeFalse();
    expect(service.checkBottlesFinished([[1, 1, 1], [2, 2], [3], [], []], 3)).toBeFalse();
    expect(service.checkBottlesFinished([[1, 1, 1], [2, 2, 2], [3], [], []], 3)).toBeFalse();
    expect(service.checkBottlesFinished([[1, 1, 1], [2, 2, 2], [3, 3], [], []], 3)).toBeFalse();
    expect(service.checkBottlesFinished([[1, 1, 1], [2, 2, 2], [3, 3, 3], [], []], 3)).toBeTrue();
    expect(service.checkBottlesFinished([[1, 1, 1], [2, 2, 3], [3, 3, 2], [], []], 3)).toBeFalse();
  });

  it('it should transform arrays of numbers into bottles object', () => {
    expect(service.transformBottles([1, 1, 1, 1, 1, 1], 2)).toEqual([[1, 1], [1, 1], [1, 1]]);
    expect(service.transformBottles([1, 1, 1, 1, 1, 1], 3)).toEqual([[1, 1, 1], [1, 1, 1]]);
  });

  it('it should generate a consecutive array of numbers given min and max values', () => {
    expect(service.range(0, 1)).toEqual([0, 1]);
    expect(service.range(4, 6)).toEqual([4, 5, 6]);
    expect(service.range(27, 32)).toEqual([27, 28, 29, 30, 31, 32]);
    expect(service.range(-5, -2)).toEqual([-5, -4, -3, -2]);
  });

  it('should shuffle the array', () => {
    expect(service.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]))
      .not.toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25]);
  });

  it('should find the variant color', () => {
    expect(service.getVariantColor(1, [])).toBeUndefined();
    expect(service.getVariantColor(1)).toBeTruthy();
    expect(service.getVariantColor(1, ['a', 'b'])).toBe('b');
  });
});
