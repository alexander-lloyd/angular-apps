import {LocalStorageService} from './local-storage.service';

const localStorageMock = (() => {
  let store = {};
  return {
    getItem: function getItem(key) {
      return store[key] || null;
    },
    setItem: function setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem: function removeItem(key) {
      delete store[key];
    },
    clear: function clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

describe('LocalStorageService', () => {
  const KEY = 'KEY';
  const VALUE = 'VALUE';

  let service: LocalStorageService;
  let getItemMock: jest.SpyInstance<string, string[]>;
  let setItemMock: jest.SpyInstance<void, string[]>;
  let removeItemMock: jest.SpyInstance<void, string[]>;

  beforeEach(() => {
    jest.clearAllMocks();
    getItemMock = jest.spyOn(localStorage, 'getItem');
    setItemMock = jest.spyOn(localStorageMock, 'setItem');
    removeItemMock = jest.spyOn(localStorageMock, 'removeItem');
    service = new LocalStorageService();
  });

  it('should get an item', () => {
    expect.assertions(2);

    getItemMock.mockImplementation(() => VALUE);

    expect(service.getItem(KEY)).toBe(VALUE);
    expect(getItemMock).toHaveBeenCalledWith(KEY);
  });

  it('should set an item', () => {
    expect.assertions(1);

    setItemMock.mockImplementation(() => {});

    service.setItem(KEY, VALUE);
    expect(setItemMock).toHaveBeenCalledWith(KEY, VALUE);
  });

  it('should delete a key', () => {
    expect.assertions(1);

    removeItemMock.mockImplementation(() => {});

    service.removeItem(KEY);
    expect(removeItemMock).toHaveBeenCalledWith(KEY);
  });
});
