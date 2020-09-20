import {Component, Input} from '@angular/core';
import {TestBed, async} from '@angular/core/testing';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {of} from 'rxjs';

import {LoggerModule} from '@al/logger';
import {AppComponent} from './app.component';
import {TodoService} from './services/todo.service';
import {TodoTask} from './types/todo.types';


@Component({
  selector: 'al-todo-list',
  template: ''
})
class TodoListComponentStub {
  @Input() public todos;
}

@Component({
  selector: 'al-create-todo',
  template: ''
})
class CreateTodoComponentStub {
}

class TodoServiceStub {
  public getTodos(): void {}
}

describe('AppComponent', () => {
  let todoService: TodoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        }
      ]
    }).compileComponents();

    todoService = TestBed.inject(TodoService);
  }));

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

  it('should sort list of todos', async () => {
    expect.assertions(1);
    const todos: TodoTask[] = [
      {
        name: 'def',
        due: '2020-06-28T08:40:10.567Z',
        completed: false,
        id: 456
      },
      {
        name: 'abc',
        due: '2020-05-28T08:40:10.567Z',
        completed: false,
        id: 123
      }
    ];
    jest.spyOn(todoService, 'getTodos')
      .mockImplementation(() => of(todos));

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    await new Promise((resolve) => app.todos$.subscribe((sortedTodos) => {
      expect(sortedTodos).toStrictEqual([
        {
          name: 'abc',
          due: '2020-05-28T08:40:10.567Z',
          completed: false,
          id: 123
        },
        {
          name: 'def',
          due: '2020-06-28T08:40:10.567Z',
          completed: false,
          id: 456
        }
      ]);
      resolve();
    }));
  });

  it('should call change detection when screen size changes', () => {
    expect.assertions(1);
    jest.spyOn(todoService, 'getTodos')
      .mockImplementation(() => of([]));

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const component = fixture.componentInstance;
    const {changeDetectorRef, _mobileQueryListener} = component;
    const changeDetectorSpy = jest.spyOn(changeDetectorRef, 'detectChanges');
    _mobileQueryListener();
    expect(changeDetectorSpy).toHaveBeenCalledTimes(1);
  });
});
