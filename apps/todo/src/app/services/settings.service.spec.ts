import {TestBed} from '@angular/core/testing';
import {Settings} from '../types/settings.type';
import {LocalStorageService} from './local-storage.service';
import {SettingsService} from './settings.service';

const defaultSettings: Settings = {
  language: 'en'
};

class LocalStorageServiceStub {
  public getItem() {}
  public setItem() {}
}

describe('SettingsService', () => {
  let service: SettingsService;
  let localStorageService: LocalStorageService;
  let getItemSpy: jest.SpyInstance<string, [string]>;
  let setItemSpy: jest.SpyInstance<void, [string, string]>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        SettingsService,
        {
          provide: LocalStorageService,
          useClass: LocalStorageServiceStub
        }
      ]
    }).compileComponents();
    service = TestBed.inject(SettingsService);
    localStorageService = TestBed.inject(LocalStorageService);
    getItemSpy = jest.spyOn(localStorageService, 'getItem');
    setItemSpy = jest.spyOn(localStorageService, 'setItem');
  });

  it('should be truthy', () => {
    expect.assertions(1);
    expect(service).toBeTruthy();
  });

  it('should get the settings', async () => {
    expect.assertions(2);
    getItemSpy.mockImplementation(() => JSON.stringify(defaultSettings));
    const settings = await service.getSettings().toPromise();
    expect(settings).toStrictEqual(defaultSettings);
    expect(getItemSpy).toHaveBeenCalledTimes(1);
  });

  it('should save and return default settings if settings key does not exist', async () => {
    expect.assertions(3);
    getItemSpy.mockImplementation(() => null);
    const settings = await service.getSettings().toPromise();
    expect(settings).toStrictEqual(service.DEFAULT_SETTINGS);
    expect(getItemSpy).toHaveBeenCalledTimes(1);
    expect(setItemSpy).toHaveBeenCalledTimes(1);
  });

  it('should save settings', () => {
    expect.assertions(2);
    const settings: Settings = {
      language: 'fr'
    };
    service.saveSettings(settings);
    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(setItemSpy).toHaveBeenCalledWith(service.SETTINGS_KEY, JSON.stringify(settings));
  });
});
