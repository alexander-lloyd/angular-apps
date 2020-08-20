import {Injectable} from '@angular/core';

/**
 * Local Storage Service.
 */
@Injectable()
export class LocalStorageService {
  /**
   * Get an item from local storage.
   *
   * @param key Key to get from local storage.
   * @returns The value to get from local storage.
   */
  public getItem(key: string): string {
    return localStorage.getItem(key);
  }

  /**
   * Set a key value pair in local storage.
   *
   * @param key Key to set in local storage.
   * @param value Value to set in local storage.
   */
  public setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  /**
   * Clear a key from local storage.
   *
   * @param key The key to remove from local storage.
   */
  public removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
