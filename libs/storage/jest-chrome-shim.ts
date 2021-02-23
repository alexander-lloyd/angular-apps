/* eslint-disable max-lines-per-function */
/* eslint-env node */

type _Storage = {
  [key: string]: string;
};
type GetCallback = (result: _Storage) => void;
type SetCallback = () => void;

type Changes = { [key: string]: chrome.storage.StorageChange };
type OnChangeListener =
  (changes: Changes, areaName: chrome.storage.AreaName) => void;

const shimStorage: {[storageType: string]: {[key: string]: string}} = {
  'local': {},
  'managed': {},
  'sync': {}
};
let changeListeners: OnChangeListener[] = [];

function storage(areaName: chrome.storage.AreaName) {
  return {
    get: (keys: string | string[] | _Storage, callback: GetCallback) => {
      let result: {[key: string]: string} = {};
      if (keys === null) {
        result = shimStorage[areaName];
      } else if (typeof keys === 'string') {
        result[keys] = shimStorage[areaName][keys];
      } else if (Array.isArray(keys)) {
        keys.forEach((key) => {
          result[key] = shimStorage[areaName][key];
        });
      } else if (keys instanceof Object) {
        Object.keys(keys)
          .forEach((key) => {
            const value = shimStorage[areaName][key];
            if (value === undefined) {
              result[key] = keys[key];
            } else {
              result[key] = value;
            }
          });
      }
      callback(result);
    },
    set: (items: _Storage, callback?: SetCallback) => {
      Object.entries(items)
        .forEach(([key, value]) => {
          shimStorage[areaName][key] = value;
        });
      const changes: Changes = Object.keys(items).reduce((prev, key) => {
        prev[key] = {
          newValue: shimStorage[areaName][key]
        };
        return prev;
      }, {} as Changes);
      changeListeners.forEach((listener) => listener(changes, areaName));
      if (callback !== undefined) {
        callback();
      }
    },
    remove: (keys: string | string[], callback: SetCallback) => {
      if (typeof keys === 'string') {
        delete shimStorage[areaName][keys];
      } else if (Array.isArray(keys)) {
        keys.forEach((key) => delete shimStorage[areaName][key]);
      }
      if (callback !== undefined) {
        callback();
      }
    },
    clear: () => {
      shimStorage[areaName] = {};
    }
  };
}

const _chrome = {
  storage: {
    local: storage('local'),
    managed: storage('managed'),
    sync: storage('sync'),
    onChanged: {
      addListener: (listener: OnChangeListener): void => {
        changeListeners.push(listener);
      },
      hasListeners: (): boolean => changeListeners.length > 0
    },
    cleanup: () => {
      // Method to clean up everything.
      shimStorage.local = {};
      shimStorage.managed = {};
      shimStorage.sync = {};
      changeListeners = [];
    }
  }
};

Object.defineProperty(global, 'chrome', {
  value: _chrome
});
