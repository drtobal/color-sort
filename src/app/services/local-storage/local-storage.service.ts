import { Injectable } from '@angular/core';
import { HAS_LS } from '../../constants';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  saveData<T>(slot: string, data: T): void {
    if (HAS_LS) {
      window.localStorage.setItem(slot, JSON.stringify(data));
    }
  }

  getData<T>(slot: string): T | null {
    try {
      if (HAS_LS) {
        const data = window.localStorage.getItem(slot);
        if (data) {
          return JSON.parse(data);
        }
      }
    } catch (e) { /* nothing here */ }
    return null;
  }
}
