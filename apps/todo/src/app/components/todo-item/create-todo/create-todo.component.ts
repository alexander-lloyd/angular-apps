import {Component, EventEmitter, Output} from '@angular/core';

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
  public submitTodo = new EventEmitter<string>();

  /**
   * Internal method called when form is submitted.
   * Calls the EventEmitter.
   *
   * @param taskName Name of task.
   */
  public _onSubmit(taskName: string): void {
    this.submitTodo.emit(taskName);
  }
}
