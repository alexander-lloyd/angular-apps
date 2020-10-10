import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

import {Settings} from '../types/settings.type';
import {LocalStorageService} from './local-storage.service';

/**
 * SettingsService.
 */
@Injectable()
export class SettingsService {
  private readonly SETTINGS_KEY = 'TODO_SETTINGS';

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
    const settings: Settings = JSON.parse(settingsJson);
    return of(settings);
  }

  /**
   * Save Settings.
   *
   * @param settings User Settings.
   */
  public saveSettings(settings: Settings): void {
    const settingsJson = JSON.stringify(settings);
    localStorage.setItem(this.SETTINGS_KEY, settingsJson);
  }
}
