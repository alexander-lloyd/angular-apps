import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatChipsModule} from '@angular/material/chips';
import {MatChipHarness} from '@angular/material/chips/testing';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatInputHarness} from '@angular/material/input/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {DateFnsModule} from 'ngx-date-fns';

import {CreateTodoComponent} from './create-todo.component';

const translations = {
  TODO_CREATE_FORM_CHIP_ARIA_TEXT: 'Chip Text',
  TODO_CREATE_FORM_CHIP_CANCEL_ARIA_TEXT: 'Cancel',
  TODO_CREATE_FORM_CREATE_BUTTON_TEXT: 'Create'
};

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTodoComponent],
      imports: [
        DateFnsModule,
        FormsModule,
        MatButtonModule,
        MatChipsModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        NoopAnimationsModule,
        TranslateTestingModule.withTranslations('en', translations)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTodoComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });

  it('should submit task when button is pressed', async () => {
    expect.assertions(1);
    const taskName = 'taskName';

    const input = await loader.getHarness(MatInputHarness);
    const button = await loader.getHarness(MatButtonHarness);

    component.submitTodo.subscribe(({name}) => {
      expect(name).toBe(taskName);
    });

    await input.focus();
    await input.setValue(taskName);
    await button.click();
  });

  it('should clear the text input when the task is created', async () => {
    expect.assertions(2);
    const taskName = 'taskName';

    const input = await loader.getHarness(MatInputHarness);
    const button = await loader.getHarness(MatButtonHarness);

    component.submitTodo.subscribe(({name}) => {
      expect(name).toBe(taskName);
    });

    await input.focus();
    await input.setValue(taskName);
    await button.click();
    const inputValue = await input.getValue();
    expect(inputValue).toBe('');
  });

  it('should grab the date from the string', async () => {
    expect.assertions(2);
    const taskName = 'taskName';
    const date = '2020-01-01';

    const input = await loader.getHarness(MatInputHarness);

    await input.focus();
    await input.setValue(`${taskName} ${date} `);
    const chips = await loader.getAllHarnesses(MatChipHarness);

    expect(chips).toHaveLength(1);
    const chipText = await chips[0].getText();
    expect(chipText).toBe(date);
  });

  it('should remove a chip and reset the task due date', async () => {
    expect.assertions(3);

    component.task = {
      due: 1601933458123,
      name: 'Task Name'
    };
    const date = '2020-10-05';

    fixture.detectChanges();

    const chips = await loader.getAllHarnesses(MatChipHarness);

    expect(chips).toHaveLength(1);
    const chipText = await chips[0].getText();
    expect(chipText).toBe(date);
    await (await chips[0].getRemoveButton()).click();
    expect(component.task.due).toBe(0);
  });

  it('should remove an existing chip and reset the task due date', async () => {
    expect.assertions(1);

    const input = await loader.getHarness(MatInputHarness);

    component.task = {
      due: 1600000,
      name: 'Task Name'
    };
    const date = '2020-10-05';

    fixture.detectChanges();

    await input.setValue(`${date} `);

    expect(component.task.due).toBe(Date.parse(date));
  });
});
