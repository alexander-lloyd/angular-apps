import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {first} from 'rxjs/operators';

import {CheckboxComponent} from './checkbox.component';

describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let checkboxDebugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckboxComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(CheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    checkboxDebugElement = fixture.debugElement.query(By.css('input'));
  });

  it('should create', () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });

  it('should create a primary checkbox', () => {
    expect.assertions(2);

    component.type = 'primary';
    fixture.detectChanges();

    expect(checkboxDebugElement.nativeElement.classList).toContain('checkbox');
    expect(checkboxDebugElement.nativeElement.classList).toContain('checkbox-primary');
  });

  it('should create a secondary checkbox', () => {
    expect.assertions(2);

    component.type = 'secondary';
    fixture.detectChanges();

    expect(checkboxDebugElement.nativeElement.classList).toContain('checkbox');
    expect(checkboxDebugElement.nativeElement.classList).toContain('checkbox-secondary');
  });

  it('should create a primary disabled checkbox', () => {
    expect.assertions(3);

    component.type = 'primary';
    component.disabled = true;
    fixture.detectChanges();

    expect(checkboxDebugElement.nativeElement.classList).toContain('checkbox');
    expect(checkboxDebugElement.nativeElement.classList).toContain('checkbox-primary');
    expect(checkboxDebugElement.nativeElement.disabled).toBe(true);
  });

  it('should create a secondary disabled checkbox', () => {
    expect.assertions(3);

    component.type = 'secondary';
    component.disabled = true;
    fixture.detectChanges();

    expect(checkboxDebugElement.nativeElement.classList).toContain('checkbox');
    expect(checkboxDebugElement.nativeElement.classList).toContain('checkbox-secondary');
    expect(checkboxDebugElement.nativeElement.disabled).toBe(true);
  });

  it('should create a primary checked checkbox', () => {
    expect.assertions(3);

    component.checked = true;
    component.type = 'primary';
    fixture.detectChanges();

    expect(checkboxDebugElement.nativeElement.classList).toContain('checkbox');
    expect(checkboxDebugElement.nativeElement.classList).toContain('checkbox-primary');
    expect(checkboxDebugElement.nativeElement.checked).toBe(true);
  });

  it('should create a secondary checked checkbox', () => {
    expect.assertions(3);

    component.checked = true;
    component.type = 'secondary';
    fixture.detectChanges();

    expect(checkboxDebugElement.nativeElement.classList).toContain('checkbox');
    expect(checkboxDebugElement.nativeElement.classList).toContain('checkbox-secondary');
    expect(checkboxDebugElement.nativeElement.checked).toBe(true);
  });

  it('should output event when checkbox is checked', () => {
    expect.assertions(1);
    let checked: boolean | undefined;

    component.type = 'secondary';
    component.onChecked.pipe(
      first()
    ).subscribe((_checked) => {
      checked = _checked;
    });
    fixture.detectChanges();

    checkboxDebugElement.triggerEventHandler('click', {
      target: {
        checked: true
      }
    });
    expect(checked).toBe(true);
  });

  it('should output event false when checkbox is unchecked', () => {
    expect.assertions(1);
    let checked: boolean | undefined;

    component.type = 'secondary';
    component.onChecked.pipe(
      first()
    ).subscribe((_checked) => {
      checked = _checked;
    });
    fixture.detectChanges();

    checkboxDebugElement.triggerEventHandler('click', {
      target: {
        checked: false
      }
    });
    expect(checked).toBe(false);
  });
});
