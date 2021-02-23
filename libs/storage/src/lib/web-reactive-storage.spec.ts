import {withLatestFrom} from 'rxjs/operators';
import {ReactiveWebStorage} from './web-reactive-storage';
import {ReactiveStorage} from './types';

const localStorageMock = (() => {
  let store = {};
  const localStorage = {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
    key(_: number) {
      return null;
    }
  };
  Object.defineProperty(localStorage, 'length', {
    get() {
      return Object.keys(store).length;
    }
  });
  return localStorage as Storage;
})();

describe('Reactive Local Storage', () => {
  let storage: ReactiveStorage<string>;

  beforeEach(() => {
    localStorageMock.clear();
    storage = new ReactiveWebStorage(localStorageMock);
  });

  it('should have size 0', async () => {
    expect.assertions(1);
    const length$ = storage.length();

    await new Promise<void>((resolve) => {
      length$.subscribe((length) => {
        expect(length).toBe(0);
        resolve();
      }).unsubscribe();
    });
  });

  it('should have size 1 when an item is in storage', async () => {
    expect.assertions(1);
    storage.set('key', 'value');
    const length$ = storage.length();

    await new Promise<void>((resolve) => {
      length$.subscribe((length) => {
        expect(length).toBe(1);
        resolve();
      }).unsubscribe();
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
    localStorageMock.setItem('key', 'value');
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
    localStorageMock.setItem('key', 'value');
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
});
