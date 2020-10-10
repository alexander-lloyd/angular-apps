import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCheckboxHarness} from '@angular/material/checkbox/testing';
import {MatListModule} from '@angular/material/list';
import {MatListHarness} from '@angular/material/list/testing';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {DateFnsModule} from 'ngx-date-fns';
import {TranslateTestingModule} from 'ngx-translate-testing';

import {TodoListComponent} from './todo-list.component';
import {TodoTask} from '../../types/todo.types';

const translations = {
  TODO_LIST_TASKS_COMPLETE_TASK_ARIA_TEXT: 'Complete Task'
};

describe('TodoListComponent', () => {
  let fixture: ComponentFixture<TodoListComponent>;
  let component: TodoListComponent;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TodoListComponent
      ],
      imports: [
        DateFnsModule,
        FontAwesomeModule,
        MatCheckboxModule,
        MatListModule,
        TranslateTestingModule.withTranslations('en', translations)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create the component', () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });

  it('should show a list of todo tasks', async () => {
    expect.assertions(1);
    const todos: TodoTask[] = [{
      id: 123,
      name: 'Task',
      completed: false,
      due: 0
    }];
    component.todos = todos;

    const matList = await loader.getHarness(MatListHarness);
    const list = await matList.getItems();

    expect(list).toHaveLength(1);
  });

  it('should emit a task completed event when a task is completed', async () => {
    expect.assertions(1);
    const todos: TodoTask[] = [{
      id: 123,
      name: 'Task',
      completed: false,
      due: 0
    }];
    component.todos = todos;
    fixture.detectChanges();

    const checkbox = await loader.getHarness(MatCheckboxHarness);

    component.taskCompleted.subscribe((task) => {
      expect(task).toStrictEqual(todos[0]);
    });

    await checkbox.check();
  });
});
