import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {DEFAULT_SETTINGS, Settings} from '../types/settings.type';
import {LocalStorageService} from './local-storage.service';

/**
 * SettingsService.
 */
@Injectable()
export class SettingsService {
  public readonly SETTINGS_KEY = 'TODO_SETTINGS';
  public readonly DEFAULT_SETTINGS: Settings = DEFAULT_SETTINGS;

  /**
   * Constructor.
   *
   * @param localStorage LocalStorage Service.
   */
  public constructor(
    private localStorage: LocalStorageService
  ) {}

  /**
   * Get the settings from local storage.
   *
   * @returns User Settings.
   */
  public getSettings(): Observable<Settings> {
    const settingsJson = this.localStorage.getItem(this.SETTINGS_KEY);
    let settings: Settings;
    if (settingsJson === undefined) {
      settings = this.DEFAULT_SETTINGS;
      // If settings don't exist save default settings.
      this.saveSettings(settings);
    } else {
      settings = JSON.parse(settingsJson);
    }

    return of(settings);
  }

  /**
   * Save Settings.
   *
   * @param settings User Settings.
   */
  public saveSettings(settings: Settings): void {
    const settingsJson = JSON.stringify(settings);
    this.localStorage.setItem(this.SETTINGS_KEY, settingsJson);
  }
}
