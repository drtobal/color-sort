import { Injectable } from '@angular/core';
import { COLORS, DEFAULT_BOTTLE_SIZE, DEFAULT_REPEATS, DEFAULT_VARIANTS } from '../../constants';
import { Bottle, MoveColorAction } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class SorterService {

  constructor() { }

  generateBottles(variants: number = DEFAULT_VARIANTS, repeats: number = DEFAULT_REPEATS, bottleSize: number = DEFAULT_BOTTLE_SIZE): Bottle[] {
    const colors = this.transformBottles(this.suffle(this.multipliArray(this.range(1, variants), bottleSize, repeats)), bottleSize);
    return colors.concat([[]]);
  }

  multipliArray<T>(items: T[], bottleSize: number, repeats: number): T[] {
    const baseArray: T[] = JSON.parse(JSON.stringify(items));
    for (let x = 0; x < repeats; x++) {
      for (let y = 1; y < bottleSize; y++) {
        items = items.concat(JSON.parse(JSON.stringify(baseArray)) as T[]);
      }
    }
    return items;
  }

  moveColor(source: Bottle, target: Bottle, bottleSize: number = DEFAULT_BOTTLE_SIZE): MoveColorAction {
    let moved: boolean = false;
    if (target.length >= bottleSize) return { source, target, moved };

    if (source.length === 0) return { source, target, moved };

    // if (target.length > 0 && source[0] !== target[0]) return { source, target, moved };

    const variant = source.pop();
    if (typeof variant !== 'undefined') {
      target.push(variant);
      moved = true;
    }

    return { source, target, moved };
  }

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

  transformBottles(numbers: number[], size: number): Bottle[] {
    const bottles: Bottle[] = [];
    while (numbers.length > 0) {
      bottles.push(numbers.splice(0, size));
    }
    return bottles;
  }

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

  getVariantColor(variant: number): string {
    return COLORS[variant];
  }
}
