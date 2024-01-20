import { Injectable } from '@angular/core';
import { COLORS } from '../../constants';
import { Bottle, MoveLiquidAction } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class SorterService {

  constructor() { }

  generateBottles(variants: number = 3, repeats: number = 1): Bottle[] {
    const liquids = this.transformBottles(this.suffle(this.multipliArray(this.range(1, variants), variants, repeats)), variants);
    return liquids.concat([[]]);
  }

  multipliArray<T>(items: T[], variants: number, times: number): T[] {
    const baseArray: T[] = JSON.parse(JSON.stringify(items));
    for (let x = 0; x < times; x++) {
      for (let y = 1; y < variants; y++) {
        items = items.concat(JSON.parse(JSON.stringify(baseArray)) as T[]);
      }
    }
    return items;
  }

  moveLiquid(source: Bottle, target: Bottle, limit: number = 3): MoveLiquidAction {
    let moved: boolean = false;
    if (target.length >= limit) return { source, target, moved };

    if (source.length === 0) return { source, target, moved };

    if (target.length > 0 && source[0] !== target[0]) return { source, target, moved };

    const variant = source.shift();
    if (typeof variant !== 'undefined') {
      target.unshift(variant);
      moved = true;
    }

    return { source, target, moved };
  }

  checkBottlesFinished(bottles: Bottle[], variants: number = 3): boolean {
    const bottlesLength = bottles.length;
    for (let x = 0; x < bottlesLength; x++) {
      const bottleLength = bottles[x].length;
      if (bottleLength > 0 && bottleLength !== variants) {
        return false;
      } else {
        let startVariant = bottles[x][0];
        for (let y = 1; y < variants; y++) {
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
