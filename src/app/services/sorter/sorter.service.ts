import { Injectable } from '@angular/core';
import { COLORS, DEFAULT_BOTTLE_SIZE, DEFAULT_REPEATS, DEFAULT_VARIANTS } from '../../constants';
import { Bottle, MoveColorAction } from '../../types';
import { UtilService } from '../util/util.service';

/** utilities functions to interact with game bottles */
@Injectable({
  providedIn: 'root'
})
export class SorterService {
  /** generate a new array of bottles with given configuration */
  generateBottles(variants: number = DEFAULT_VARIANTS, repeats: number = DEFAULT_REPEATS, bottleSize: number = DEFAULT_BOTTLE_SIZE): Bottle[] {
    const colors = this.transformBottles(this.suffle(this.multipliArray(this.range(1, variants), bottleSize, repeats)), bottleSize);
    return colors.concat([[]]);
  }

  /** multiply array n times */
  multipliArray<T>(items: T[], bottleSize: number, repeats: number): T[] {
    const baseArray = UtilService.deepClone(items);
    items = [];
    const loops = bottleSize * repeats;
    for (let x = 0; x < loops; x++) { // repeat colors amount of bottles and repeated colors size
      items = items.concat(UtilService.deepClone(baseArray) as T[]);
    }
    return items;
  }

  /** move a color from one bottle to another */
  moveColor(source: Bottle, target: Bottle, bottleSize: number = DEFAULT_BOTTLE_SIZE): MoveColorAction {
    source = UtilService.deepClone(source);
    target = UtilService.deepClone(target);
    let moved: boolean = false;
    if (target.length >= bottleSize) return { source, target, moved };

    if (source.length === 0) return { source, target, moved };

    // TODO: restrict move a color only if last color is the same, make this a optional configuration for some levels
    // if (target.length > 0 && source[0] !== target[0]) return { source, target, moved };

    const variant = source.pop();
    if (typeof variant !== 'undefined') {
      target.push(variant);
      moved = true;
    }

    return { source, target, moved };
  }

  /** check if all bottles are completed */
  checkBottlesFinished(bottles: Bottle[], bottleSize: number = DEFAULT_BOTTLE_SIZE): boolean {
    const bottlesLength = bottles.length;
    for (let x = 0; x < bottlesLength; x++) {
      const bottleLength = bottles[x].length;
      if (bottleLength > 0 && bottleLength !== bottleSize) {
        return false;
      } else {
        let startVariant = bottles[x][0];
        for (let y = 1; y < bottleSize; y++) {
          if (bottles[x][y] !== startVariant) {
            return false;
          }
        }
      }
    }
    return true;
  }

  /** transform arrays of numbers into bottles object */
  transformBottles(numbers: number[], size: number): Bottle[] {
    const bottles: Bottle[] = [];
    while (numbers.length > 0) {
      bottles.push(numbers.splice(0, size));
    }
    return bottles;
  }

  /** generate a consecutive array of numbers given min and max values */
  range(min: number, max: number): number[] {
    const rangeArray: number[] = [];
    for (let x = min; x <= max; x++) {
      rangeArray.push(x);
    }
    return rangeArray;
  }

  /** suffle the array - modern version of the Fisher–Yates shuffle */
  suffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  /** get css color for given variant */
  getVariantColor(variant: number, colors: string[] = COLORS): string {
    return colors[variant];
  }
}
