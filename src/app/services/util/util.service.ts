import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  static async wait(time: number): Promise<void> {
    return new Promise(success => {
      setTimeout(() => success(), time);
    });
  }

  static deepClone<T>(obj: T): T {
    if (typeof structuredClone === 'function') {
      return structuredClone(obj);
    }
    return JSON.parse(JSON.stringify(obj));
  }

  static getOffset(element: HTMLElement): { left: number, top: number } {
    const rect = element.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      top: rect.top + window.scrollY
    };
  }
}
