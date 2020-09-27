import {Component, EventEmitter, Output} from '@angular/core';
import {TodoTask} from '../../../types/todo.types';

/**
 * Create Todo Form Component.
 */
@Component({
  selector: 'al-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent {
  public value = '';

  @Output()
  public submitTodo = new EventEmitter<TodoTask>();

  /**
   * Internal method called when form is submitted.
   * Calls the EventEmitter.
   *
   * @param name Name of task.
   */
  public _onSubmit(name: string): void {
    const task: TodoTask = {
      completed: false,
      due: '',
      id: 1,
      name
    };
    this.submitTodo.emit(task);
  }
}
