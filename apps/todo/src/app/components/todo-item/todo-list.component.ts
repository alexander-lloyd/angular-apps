import {Component, Input} from '@angular/core';
import {faCalendar} from '@fortawesome/free-solid-svg-icons';

import {TodoTask} from '../../types/todo.types';

/**
 * Todo List Component.
 */
@Component({
  selector: 'al-todo-list',
  styleUrls: ['./todo-list.component.scss'],
  templateUrl: './todo-list.component.html'
})
export class TodoListComponent {
  @Input() public todos: TodoTask[];

  public faCalendar = faCalendar;
}
