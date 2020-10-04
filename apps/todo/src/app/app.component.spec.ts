import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {provideMockStore, MockStore} from '@ngrx/store/testing';
import {of} from 'rxjs';

import {LoggerModule} from '@al/logger';
import {AppComponent} from './app.component';
import {TodoService} from './services/todo.service';
import * as actions from './store/todo.actions';
import * as selectors from './store/todo.selectors';
import {GlobalState} from './store/todo.types';
import {TodoTask} from './types/todo.types';


@Component({
  selector: 'al-todo-list',
  template: ''
})
class TodoListComponentStub {
  @Input() public todos;
  @Output()
  public taskCompleted = new EventEmitter<TodoTask>();
}

@Component({
  selector: 'al-create-todo',
  template: ''
})
class CreateTodoComponentStub {
  @Output()
  public submitTodo = new EventEmitter<TodoTask>();
}

class TodoServiceStub {
  public getTodos(): void {}
}

describe('AppComponent', () => {
  const initialState: GlobalState = {
    todo: {
      todos: []
    }
  };
  let todoService: TodoService;
  let mockStore: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CreateTodoComponentStub,
        TodoListComponentStub
      ],
      imports: [
        FontAwesomeModule,
        LoggerModule,
        MatSidenavModule,
        MatToolbarModule,
        NoopAnimationsModule
      ],
      providers: [
        {
          provide: TodoService,
          useClass: TodoServiceStub
        },
        provideMockStore({initialState})
      ]
    }).compileComponents();

    todoService = TestBed.inject(TodoService);
    mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(selectors.selectOpenTasks, []);
  });

  it('should create the app', () => {
    expect.assertions(1);
    jest.spyOn(todoService, 'getTodos')
      .mockImplementation(() => of([]));

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have title \'Todo App\'', () => {
    expect.assertions(1);
    jest.spyOn(todoService, 'getTodos')
      .mockImplementation(() => of([]));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('mat-toolbar').textContent).toContain('Todo App');
  });

  it('should call change detection when screen size changes', () => {
    expect.assertions(1);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const {changeDetectorRef, _mobileQueryListener} = component;
    const changeDetectorSpy = jest.spyOn(changeDetectorRef, 'detectChanges');
    _mobileQueryListener();
    expect(changeDetectorSpy).toHaveBeenCalledTimes(1);
  });

  it('should dispatch add todo action when button is pressed', () => {
    expect.assertions(2);
    const task: TodoTask = {
      id: 1,
      completed: false,
      due: 1,
      name: 'a'
    };
    const fixture = TestBed.createComponent(AppComponent);
    const createTodoFixture = fixture.debugElement.query(By.directive(CreateTodoComponentStub));
    const createTodoComponent = createTodoFixture.componentInstance as CreateTodoComponentStub;
    fixture.detectChanges();

    const storeEmitSpy = jest.spyOn(mockStore, 'dispatch');

    createTodoComponent.submitTodo.emit(task);

    expect(storeEmitSpy).toHaveBeenCalledTimes(1);
    expect(storeEmitSpy).toHaveBeenCalledWith(actions.addTask({task}));
  });

  it('should dispatch complete task action when  is pressed', () => {
    expect.assertions(2);
    const task: TodoTask = {
      id: 1,
      completed: false,
      due: 1,
      name: 'a'
    };
    const fixture = TestBed.createComponent(AppComponent);
    const todoListFixture = fixture.debugElement.query(By.directive(TodoListComponentStub));
    const todoListComponent = todoListFixture.componentInstance as TodoListComponentStub;
    fixture.detectChanges();

    const storeEmitSpy = jest.spyOn(mockStore, 'dispatch');

    todoListComponent.taskCompleted.emit(task);

    expect(storeEmitSpy).toHaveBeenCalledTimes(1);
    expect(storeEmitSpy).toHaveBeenCalledWith(actions.completeTask({task}));
  });
});
