import {ReactiveStorage} from './types';
import {ReactiveChromeStorage} from './chrome-reactive-storage';
import {withLatestFrom} from 'rxjs/operators';

interface ChromeShim {
  cleanup(): void;
}

describe('Chrome Reactive Storage', () => {
  let storage: ReactiveStorage<string>;
  beforeEach(() => {
    (chrome.storage as unknown as ChromeShim).cleanup();
    storage = new ReactiveChromeStorage('local');
  });

  it('should have chrome object defined', () => {
    expect.assertions(2);
    expect(chrome).toBeDefined();
    expect(chrome.storage.local).toBeDefined();
  });


  it('should create chrome reactive storage object', () => {
    expect.assertions(1);
    expect(storage).toBeTruthy();
  });

  it('should register change listener', () => {
    expect.assertions(1);
    expect(chrome.storage.onChanged.hasListeners()).toBeTruthy();
  });

  it('should have length 0 when no items exist in storage', async () => {
    expect.assertions(1);

    await new Promise<void>((resolve) => {
      storage.length().subscribe((length) => {
        expect(length).toBe(0);
        resolve();
      })
        .unsubscribe();
    });
  });

  it('should have size 1 when an item is in storage', async () => {
    expect.assertions(1);

    storage.set('key', 'value');

    await new Promise<void>((resolve) => {
      storage.length().subscribe((length) => {
        expect(length).toBe(1);
        resolve();
      })
        .unsubscribe();
    });
  });

  it('should have size 1 when an item is in storage 2', async () => {
    expect.assertions(1);
    const length$ = storage.length();
    // After length$ is called
    storage.set('key', 'value');

    await new Promise<void>((resolve) => {
      length$.subscribe((length) => {
        expect(length).toBe(1);
        resolve();
      }).unsubscribe();
    });
  });

  it('should have size 0 when an item is added and removed', async () => {
    expect.assertions(1);
    const length$ = storage.length();
    storage.set('key', 'value');
    storage.remove('key');

    await new Promise<void>((resolve) => {
      length$.subscribe((length) => {
        expect(length).toBe(0);
        resolve();
      }).unsubscribe();
    });
  });

  it('should return Observable with null when item does not exist in storage', async () => {
    expect.assertions(1);
    const value$ = storage.get('key');

    await new Promise<void>((resolve) => {
      value$.subscribe((value) => {
        expect(value).toBeNull();
        resolve();
      }).unsubscribe();
    });
  });

  it('should return Observable with value when item does exist in storage', async () => {
    expect.assertions(1);
    chrome.storage.local.set({key: 'value'});
    const value$ = storage.get('key');

    await new Promise<void>((resolve) => {
      value$.subscribe((value) => {
        expect(value).toBe('value');
        resolve();
      }).unsubscribe();
    });
  });

  it('should return the same Observable when get called multiple times', async () => {
    expect.assertions(2);
    chrome.storage.local.set({key: 'value'});
    const value$ = storage.get('key');
    const value2$ = storage.get('key');

    expect(value$).toStrictEqual(value2$);
    await new Promise<void>((resolve) => {
      value$.pipe(
        withLatestFrom(value2$)
      ).subscribe(([value, value2]) => {
        expect(value).toBe(value2);
        resolve();
      })
        .unsubscribe();
    });
  });

  it('should return false if the key does not exist', async () => {
    expect.assertions(1);

    const keyExists$ = storage.has('key');

    await new Promise<void>((resolve) => {
      keyExists$.subscribe((exists) => {
        expect(exists).toBe(false);
        resolve();
      }).unsubscribe();
    });
  });

  it('should return true if the key does exist', async () => {
    expect.assertions(1);
    storage.set('key', 'value');
    const keyExists$ = storage.has('key');

    await new Promise<void>((resolve) => {
      keyExists$.subscribe((exists) => {
        expect(exists).toBe(true);
        resolve();
      }).unsubscribe();
    });
  });

  it('should return true if the key does exist 2', async () => {
    expect.assertions(1);
    const keyExists$ = storage.has('key');
    // After has call.
    storage.set('key', 'value');

    await new Promise<void>((resolve) => {
      keyExists$.subscribe((exists) => {
        expect(exists).toBe(true);
        resolve();
      }).unsubscribe();
    });
  });

  it('should return false if has is called multiple times', async () => {
    expect.assertions(1);
    storage.has('key');
    const keyExists$ = storage.has('key');

    await new Promise<void>((resolve) => {
      keyExists$.subscribe((exists) => {
        expect(exists).toBe(false);
        resolve();
      }).unsubscribe();
    });
  });

  it('should return false if is added and removed', async () => {
    expect.assertions(1);
    const keyExists$ = storage.has('key');
    storage.set('key', 'value');
    storage.remove('key');

    await new Promise<void>((resolve) => {
      keyExists$.subscribe((exists) => {
        expect(exists).toBe(false);
        resolve();
      }).unsubscribe();
    });
  });

  it('should set an item', async () => {
    expect.assertions(1);
    storage.set('key', 'value');
    const item$ = storage.get('key');

    await new Promise<void>((resolve) => {
      item$.subscribe((value) => {
        expect(value).toBe('value');
        resolve();
      }).unsubscribe();
    });
  });

  it('should set an item to null if undefined', async () => {
    expect.assertions(1);
    storage.set('key', 'value');
    storage.set('key', undefined);
    const item$ = storage.get('key');

    await new Promise<void>((resolve) => {
      item$.subscribe((value) => {
        expect(value).toBeNull();
        resolve();
      }).unsubscribe();
    });
  });

  it('should update when value is updated', async () => {
    expect.assertions(1);
    const value$ = storage.set('key', 'value');
    storage.set('key', 'value2');

    await new Promise<void>((resolve) => {
      value$.subscribe((value) => {
        expect(value).toBe('value2');
        resolve();
      }).unsubscribe();
    });
  });


  it('should ignore updates for keys we are not tracking', async () => {
    expect.assertions(1);
    chrome.storage.local.set('key');
    chrome.storage.local.remove('key');

    const value$ = storage.get('key');

    await new Promise<void>((resolve) => {
      value$.subscribe((value) => {
        expect(value).toBeNull();
        resolve();
      }).unsubscribe();
    });
  });

  it('should remove a value from storage', async () => {
    expect.assertions(1);
    const value$ = storage.set('key', 'value');
    storage.remove('key');

    await new Promise<void>((resolve) => {
      value$.subscribe((value) => {
        expect(value).toBeNull();
        resolve();
      }).unsubscribe();
    });
  });

  it('should remove a non-existent value', async () => {
    expect.assertions(1);
    const value$ = storage.get('key');
    storage.remove('key');

    await new Promise<void>((resolve) => {
      value$.subscribe((value) => {
        expect(value).toBeNull();
        resolve();
      }).unsubscribe();
    });
  });

  it('should remove a non-existent value 2', async () => {
    expect.assertions(1);
    storage.remove('key');
    const value$ = storage.get('key');

    await new Promise<void>((resolve) => {
      value$.subscribe((value) => {
        expect(value).toBeNull();
        resolve();
      }).unsubscribe();
    });
  });

  it('should clear storage', async () => {
    expect.assertions(2);
    const value$ = storage.set('key', 'value');
    const length$ = storage.length();
    storage.clear();

    await new Promise<void>((resolve) => {
      value$.pipe(
        withLatestFrom(length$)
      ).subscribe(([value, length]) => {
        expect(value).toBeNull();
        expect(length).toBe(0);
        resolve();
      });
    });
  });

  it('should ignore updates for irrelevant storage type', async () => {
    expect.assertions(1);

    const managedStorage = new ReactiveChromeStorage('managed');
    managedStorage.set('key', 'value');
    storage.set('key', 'value2');

    await new Promise<void>((resolve) => {
      storage.get('key').subscribe((value) => {
        expect(value).toBe('value2');
        resolve();
      });
    });
  });
});
