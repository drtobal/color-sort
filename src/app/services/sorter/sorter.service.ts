import { Injectable } from '@angular/core';
import { COLORS } from '../../constants';
import { Bottle } from '../../types';

@Injectable({
  providedIn: 'root'
})
export class SorterService {

  constructor() { }

  generateBottles(variants: number = 3, repeats: number = 1): Bottle[] {
    const liquids = this.transformBottles(this.suffle(this.multipliArray(this.range(1, variants), variants, repeats)), variants);
    return [...liquids, ...[]];
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
