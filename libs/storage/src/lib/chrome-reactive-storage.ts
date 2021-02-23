import {BehaviorSubject, Observable} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {ReactiveStorage} from './types';

interface StorageChange<T> {
  oldValue?: T;
  newValue?: T;
}

type StorageChangeObject<T> = {
  [key: string]: StorageChange<T>
};

/**
 * ReactiveChromeStorage.
 */
export class ReactiveChromeStorage implements ReactiveStorage<string> {
  private readonly subjects: Map<string, BehaviorSubject<string | null>> = new Map();
  private readonly _length: BehaviorSubject<number> = new BehaviorSubject(0);

  /**
   * Constructor.
   *
   * @param storageType Storage Type. E.g. sync, local.
   */
  public constructor(private storageType: chrome.storage.AreaName) {
    chrome.storage.onChanged.addListener((changes, areaName) => this._storageUpdateCallback(changes, areaName));
  }

  /**
   * Return the number of items in storage.
   *
   * @returns Observable containing the number of items in storage.
   */
  public length(): Observable<number> {
    return this._length.asObservable();
  }

  /**
   * Get an item from storage.
   *
   * @param key Key.
   * @returns Observable that updates with new values.
   */
  public get(key: string): Observable<string | null> {
    let subject: BehaviorSubject<string | null>;

    if (this.subjects.has(key)) {
      // Cast because we know the key exists.
      subject = this.subjects.get(key) as BehaviorSubject<string | null>;
    } else {
      subject = new BehaviorSubject<string | null>(null);
      this.subjects.set(key, subject);
    }

    this.getStorage(this.storageType).get(key, (items) => {
      subject.next(items[key] === undefined ? null : items[key]);
    });

    return subject.asObservable();
  }

  /**
   * Does a key exist in storage?
   *
   * @param key Key.
   * @returns Observable. true if key exists.
   */
  public has(key: string): Observable<boolean> {
    return this.get(key).pipe(
      shareReplay(),
      map((item) => item !== null)
    );
  }

  /**
   * Set a value in storage.
   *
   * @param key The key.
   * @param value The value.
   * @returns Observable.
   */
  public set(key: string, value: string): Observable<string> {
    let subject: BehaviorSubject<string | null>;

    if (this.subjects.has(key)) {
      // Cast because we know the key exists.
      subject = this.subjects.get(key) as BehaviorSubject<string | null>;
    } else {
      subject = new BehaviorSubject<string | null>(null);
      this.subjects.set(key, subject);
      this._length.next(this._length.value + 1);
    }

    // The storageChange listener will update subject.
    this.getStorage(this.storageType).set({[key]: value});

    return subject.asObservable() as Observable<string>;
  }

  /**
   * Remove a value from storage.
   *
   * @param key The key to remove.
   */
  public remove(key: string): void {
    const subject = this.subjects.get(key);
    if (subject !== undefined) {
      this.getStorage(this.storageType).remove(key, () => {
        subject.next(null);
        this._length.next(this._length.value - 1);
      });
    }
  }

  /**
   * Clear the storage.
   */
  public clear(): void {
    const keys: string[] = Array.from(this.subjects.keys());
    this.getStorage(this.storageType).remove(keys, () => {
      keys.forEach((key) => {
        // We know this behavior subject exists.
        const subject: BehaviorSubject<string | null> = this.subjects.get(key) as BehaviorSubject<string | null>;
        subject.next(null);
      });
      this._length.next(0);
    });
  }

  /**
   * Callback when a storage event is sent.
   *
   * @param changes The change event
   * @param areaName The storage area type.
   */
  private _storageUpdateCallback(changes: StorageChangeObject<string>, areaName: chrome.storage.AreaName): void {
    if (areaName !== this.storageType) {
      return;
    }
    Object.entries(changes)
      .forEach(([key, value]) => this.subjects.get(key)?.next(value.newValue === undefined ? null : value.newValue));
  }

  /**
   * Get the chrome storage.
   *
   * @param areaName The area name. E.g. 'managed', 'local', 'sync'.
   * @returns The chrome storage object.
   */
  private getStorage(areaName: chrome.storage.AreaName): chrome.storage.StorageArea {
    return chrome.storage[areaName];
  }
}
