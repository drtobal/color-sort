import { Injectable } from '@angular/core';

/** util functions for app */
@Injectable({
  providedIn: 'root'
})
export class UtilService {
  /** wait a custom time, this could be useful for chain movements and animations */
  static async wait(time: number): Promise<void> {
    return new Promise(success => {
      setTimeout(() => success(), time);
    });
  }

  /** deep clone a entire object, be careful with objects that have functions or are recursive */
  static deepClone<T>(obj: T): T {
    if (typeof structuredClone === 'function') {
      return structuredClone(obj);
    }
    return JSON.parse(JSON.stringify(obj));
  }

  /** get offset position of given html element from screen */
  static getOffset(element: HTMLElement): { left: number, top: number } {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }
}
