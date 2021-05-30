import {HarnessLoader} from '@angular/cdk/testing';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

import {CheckboxModule} from './checkbox.module';
import {CheckboxHarness} from './checkbox-harness';

@Component({
  template: `
  <al-checkbox id="primary" type="primary" (click)="checked = true">Primary</al-checkbox>
  <al-checkbox id="primary-disabled" type="primary" disabled="true" checked="true">Primary Disabled</al-checkbox>
  `
})
class CheckboxHarnessTestComponent {
  public checked = false;
}

describe('CheckboxHarness', () => {
  let fixture: ComponentFixture<CheckboxHarnessTestComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxModule],
      declarations: [CheckboxHarnessTestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckboxHarnessTestComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should get all checkbox harnesses', async () => {
    expect.assertions(1);
    const checkboxes = await loader.getAllHarnesses(CheckboxHarness);
    expect(checkboxes).toHaveLength(2);
  });

  it('should get all buttons with empty predicate', async () => {
    expect.assertions(1);
    const checkboxes = await loader.getAllHarnesses(CheckboxHarness.with());
    expect(checkboxes).toHaveLength(2);
  });

  it('should get disabled state', async () => {
    expect.assertions(2);
    const [enabledCheckbox, disabledCheckbox] =
        await loader.getAllHarnesses(CheckboxHarness);

    expect(await enabledCheckbox.isDisabled()).toBe(false);
    expect(await disabledCheckbox.isDisabled()).toBe(true);
  });

  it('should get checked state', async () => {
    expect.assertions(2);
    const [unCheckedCheckbox, checkedCheckbox] =
        await loader.getAllHarnesses(CheckboxHarness);

    expect(await unCheckedCheckbox.isChecked()).toBe(false);
    expect(await checkedCheckbox.isChecked()).toBe(true);
  });

  it('should toggle checked state', async () => {
    expect.assertions(2);
    const [checkbox1, checkbox2] =
        await loader.getAllHarnesses(CheckboxHarness);

    await checkbox1.toggle();
    await checkbox2.toggle();

    expect(await checkbox1.isChecked()).toBe(true);
    expect(await checkbox2.isChecked()).toBe(false);
  });

  it('should check unchecked checkbox', async () => {
    expect.assertions(2);
    const [checkbox1, checkbox2] =
        await loader.getAllHarnesses(CheckboxHarness);

    await checkbox1.check();
    await checkbox2.check();

    expect(await checkbox1.isChecked()).toBe(true);
    expect(await checkbox2.isChecked()).toBe(true);
  });

  it('should uncheck checked checkbox', async () => {
    expect.assertions(2);
    const [checkbox1, checkbox2] =
        await loader.getAllHarnesses(CheckboxHarness);

    await checkbox1.uncheck();
    await checkbox2.uncheck();

    expect(await checkbox1.isChecked()).toBe(false);
    expect(await checkbox2.isChecked()).toBe(false);
  });
});
