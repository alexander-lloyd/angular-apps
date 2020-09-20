import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatListModule} from '@angular/material/list';
import {MatListHarness} from '@angular/material/list/testing';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MomentModule} from 'ngx-moment';

import {TodoListComponent} from './todo-list.component';
import {TodoTask} from '../../types/todo.types';

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
        FontAwesomeModule,
        MatCheckboxModule,
        MatListModule,
        MomentModule
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
      due: new Date().toISOString()
    }];
    component.todos = todos;

    const matList = await loader.getHarness(MatListHarness);
    const list = await matList.getItems();

    expect(list).toHaveLength(1);
  });
});