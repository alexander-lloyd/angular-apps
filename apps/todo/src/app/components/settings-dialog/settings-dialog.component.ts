import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {VersionService} from '../../services/version.service';
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
  public fields = buildSettingsForm();
  public buildTime$: Observable<string>;
  public commitHash$: Observable<string>;
  public version$: Observable<string>;

  /**
   * Constructor.
   *
   * @param store NGRX Store.
   * @param versionService VersionService.
   */
  public constructor(
    private store: Store<GlobalState>,
    private versionService: VersionService
  ) {
    this.buildTime$ = this.versionService.getBuildTime();
    this.commitHash$ = this.versionService.getCommitHash();
    this.version$ = this.versionService.getVersion();
  }

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
