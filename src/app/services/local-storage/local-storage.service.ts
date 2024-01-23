import { Injectable } from '@angular/core';
import { HAS_LS } from '../../constants';

/** utilities to interact with local storage */
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  /** save any data to local storage */
  saveData<T>(slot: string, data: T, ls: boolean = HAS_LS): void {
    if (ls) {
      window.localStorage.setItem(slot, JSON.stringify(data));
    }
  }

  /** retrieve data from local storage */
  getData<T>(slot: string, ls: boolean = HAS_LS): T | null {
    try {
      if (ls) {
        const data = window.localStorage.getItem(slot);
        if (data) {
          return JSON.parse(data);
        }
      }
    } catch (e) { /* nothing here */ }
    return null;
  }
}
