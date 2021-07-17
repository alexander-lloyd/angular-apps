import {DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {ButtonComponent} from './button.component';

describe('ButtonComponent', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let buttonDebugElement: DebugElement;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonComponent]
    }).compileComponents();
    fixture = TestBed.createComponent(ButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    buttonDebugElement = fixture.debugElement.query(By.css('button'));
  });

  it('should create', () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });

  it('should create a primary button', () => {
    expect.assertions(2);

    component.type = 'primary';
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('button');
    expect(buttonDebugElement.nativeElement.classList).toContain('button-primary');
  });

  it('should create a secondary button', () => {
    expect.assertions(2);

    component.type = 'secondary';
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('button');
    expect(buttonDebugElement.nativeElement.classList).toContain('button-secondary');
  });

  it('should create a disabled primary button', () => {
    expect.assertions(3);

    component.type = 'primary';
    component.disabled = true;
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('button');
    expect(buttonDebugElement.nativeElement.classList).toContain('button-primary');
    expect(buttonDebugElement.nativeElement.disabled).toBe(true);
  });

  it('should create a disabled secondary button', () => {
    expect.assertions(3);

    component.type = 'secondary';
    component.disabled = true;
    fixture.detectChanges();

    expect(buttonDebugElement.nativeElement.classList).toContain('button');
    expect(buttonDebugElement.nativeElement.classList).toContain('button-secondary');
    expect(buttonDebugElement.nativeElement.disabled).toBe(true);
  });

  it('should emit click when button is clicked', async () => {
    component.type = 'primary'
    component.disabled = false;

    await new Promise<void>((resolve) => {
      component.click.subscribe(() => {
        resolve();
      });

      buttonDebugElement.nativeElement.click();
    });
  });

  it('should emit mouseup when mouse is lifted', async () => {
    component.type = 'primary'
    component.disabled = false;

    await new Promise<void>((resolve) => {
      component.mouseup.subscribe(() => {
        resolve();
      });

      (buttonDebugElement.nativeElement as HTMLButtonElement)
        .dispatchEvent(new Event('mouseup'));
    });
  });
});
