import {Component, EventEmitter, Input, Output} from '@angular/core';
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
  @Input()
  public todos: TodoTask[];

  @Output()
  public taskCompleted = new EventEmitter<TodoTask>();

  public faCalendar = faCalendar;

  /**
   * Callback called when a task is completed.
   * Emits a taskCompleted event.
   *
   * @param task The completed task.
   */
  public _onTaskComplete(task: TodoTask): void {
    this.taskCompleted.emit(task);
  }
}
