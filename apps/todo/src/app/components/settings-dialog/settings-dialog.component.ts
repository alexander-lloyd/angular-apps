import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {TranslateService} from '@ngx-translate/core';
import {GlobalState} from '../../store/todo.types';
import * as actions from '../../store/todo.actions';
import * as selectors from '../../store/todo.selectors';
import {Settings} from '../../types/settings.type';

import {buildSettingsForm} from './settings-form';

/**
 * Settings Dialog.
 */
@Component({
  selector: 'al-settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss']
})
export class SettingsDialogComponent implements OnInit {
  public form = new FormGroup({});
  public model: Settings;
  public fields = buildSettingsForm(this.translate);

  /**
   * Constructor.
   *
   * @param store NGRX Store.
   * @param translate Translation Service.
   */
  public constructor(
    private store: Store<GlobalState>,
    private translate: TranslateService
  ) {}

  /**
   * Called when component is initialised.
   *
   * Set up the store selectors.
   */
  public ngOnInit(): void {
    this.store.select(selectors.selectSettings).subscribe((settings) => {
      this.model = {
        ...settings
      };
    });
  }

  /**
   * Called when the settings form is submitted.
   * Submits new setting to ngrx store.
   *
   * @param settings New Settings Model.
   */
  public onSubmit(settings: Settings): void {
    this.store.next(actions.saveSettings({
      settings
    }));
  }
}
