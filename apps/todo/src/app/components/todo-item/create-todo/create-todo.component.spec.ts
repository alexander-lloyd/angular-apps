import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatInputHarness} from '@angular/material/input/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {CreateTodoComponent} from './create-todo.component';

describe('CreateTodoComponent', () => {
  let component: CreateTodoComponent;
  let fixture: ComponentFixture<CreateTodoComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateTodoComponent],
      imports: [FormsModule, MatButtonModule, MatFormFieldModule, MatInputModule, NoopAnimationsModule]
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
});
