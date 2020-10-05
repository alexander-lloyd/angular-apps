import {SPACE} from '@angular/cdk/keycodes';
import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import {v4 as uuidv4} from 'uuid';
import {TodoTask} from '../../types/todo.types';

interface CreateTodoFormInput {
  name: string;
  due: number;
}

/**
 * Create Todo Form Component.
 */
@Component({
  selector: 'al-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent {
  public readonly separatorKeysCodes: number[] = [SPACE];

  public task: CreateTodoFormInput = {
    due: 0,
    name: ''
  };

  @Output()
  public submitTodo = new EventEmitter<TodoTask>();

  @ViewChild('taskNameInput')
  public input: ElementRef<HTMLInputElement>;

  /**
   * Internal method called when form is submitted.
   * Calls the EventEmitter.
   */
  public _onSubmit(): void {
    const task: TodoTask = {
      ...this.task,
      id: uuidv4(),
      completed: false
    };

    this.submitTodo.emit(task);
    // Clear the input
    this.task.name = '';
    this.task.due = 0;
  }

  /**
   * Add a chip.
   *
   * @param event MatChipEvent. The value of the input.
   */
  public add(event: MatChipInputEvent): void {
    const parsedInput = this.parseDate(event.value);
    this.task = {
      due: parsedInput.due,
      name: `${parsedInput.name} `
    };
  }

  /**
   * Remove the chip.
   */
  public remove(): void {
    this.task.due = 0;
  }

  /**
   * Parse the date from the form input.
   *
   * @param input Raw Input.
   * @returns Parsed Input.
   */
  private parseDate(input: string): CreateTodoFormInput {
    let parsedDate = 0;
    const parsedInput = input.split(String.fromCharCode(SPACE))
      .map((word) => {
        if (word.match(/\d{4}-\d{2}-\d{2}/u) !== null) {
          parsedDate = Date.parse(word);
          // Remove the word;
          return '';
        }
        return word;
      });

    return {
      name: parsedInput.join(' '),
      due: parsedDate
    };
  }
}
