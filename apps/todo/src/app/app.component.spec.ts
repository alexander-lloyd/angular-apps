import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {provideMockStore, MockStore} from '@ngrx/store/testing';
import {TranslateService} from '@ngx-translate/core';
import {TranslateTestingModule} from 'ngx-translate-testing';
import {of} from 'rxjs';

import {LoggerModule} from '@al/logger';
import {AppComponent} from './app.component';
import {TodoService} from './services/todo.service';
import * as actions from './store/todo.actions';
import * as selectors from './store/todo.selectors';
import {GlobalState} from './store/todo.types';
import {TodoTask} from './types/todo.types';
import {DEFAULT_SETTINGS} from './types/settings.type';
import {SettingsDialogComponent} from './components/settings-dialog/settings-dialog.component';

const translations = {
  TODO_APP_NAME: 'Todo App',
  TODO_SIDEBAR_BUTTON_ARIA_TEXT: 'Toggle Menu Sidebar',
  TODO_SETTINGS_BUTTON_ARIA_TEXT: 'Open Settings Dialog'
};


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

class MatDialogStub {
  public open() {}
}

describe('AppComponent', () => {
  const initialState: GlobalState = {
    todo: {
      todos: [],
      settings: DEFAULT_SETTINGS
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
        MatDialogModule,
        MatSidenavModule,
        MatToolbarModule,
        NoopAnimationsModule,
        TranslateTestingModule.withTranslations('en', translations)
      ],
      providers: [
        {
          provide: TodoService,
          useClass: TodoServiceStub
        },

        provideMockStore({initialState}),
        {
          provide: MatDialog,
          useClass: MatDialogStub
        }
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

  it('should open the modal when the settings button is pressed', () => {
    expect.assertions(2);

    const dialog = TestBed.inject(MatDialog);
    const dialogOpenSpy = jest.spyOn(dialog, 'open');
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.componentInstance;

    component.openSettingsDialog();

    expect(dialogOpenSpy).toHaveBeenCalledTimes(1);
    expect(dialogOpenSpy).toHaveBeenCalledWith(SettingsDialogComponent);
  });

  it('should try use the browser default language', () => {
    expect.assertions(3);
    const translateService = TestBed.inject(TranslateService);

    const language = 'fr';
    const getBrowserLangSpy = jest.spyOn(translateService, 'getBrowserLang')
      .mockReturnValue(language);
    const useSpy = jest.spyOn(translateService, 'use');

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(getBrowserLangSpy).toHaveBeenCalledTimes(1);
    expect(useSpy).toHaveBeenCalledTimes(2);
    expect(useSpy).toHaveBeenCalledWith(language);
  });

  it('should fallback to english if language is not supported', () => {
    expect.assertions(3);
    const translateService = TestBed.inject(TranslateService);

    const language = 'unknown-language';
    const getBrowserLangSpy = jest.spyOn(translateService, 'getBrowserLang')
      .mockReturnValue(language);
    const useSpy = jest.spyOn(translateService, 'use');

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(getBrowserLangSpy).toHaveBeenCalledTimes(1);
    expect(useSpy).toHaveBeenCalledTimes(2);
    expect(useSpy).toHaveBeenCalledWith('en');
  });
});
