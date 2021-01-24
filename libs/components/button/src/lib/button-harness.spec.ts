import {HarnessLoader} from '@angular/cdk/testing';
import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

import {ButtonModule} from './button.module';
import {ButtonHarness} from './button-harness';

@Component({
  template: `
  <al-button id="primary" type="primary" (click)="clicked = true">Primary</al-button>
  <al-button id="primary-disabled" type="primary" disabled="true">Primary Disabled</al-button>
  `
})
class ButtonHarnessTestComponent {
  public clicked = false;
}


describe('Button Harness', () => {
  let fixture: ComponentFixture<ButtonHarnessTestComponent>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonModule],
      declarations: [ButtonHarnessTestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonHarnessTestComponent);
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should get all button harnesses', async () => {
    expect.assertions(1);
    const buttons = await loader.getAllHarnesses(ButtonHarness);
    expect(buttons).toHaveLength(2);
  });

  it('should get all buttons with exact text', async () => {
    expect.assertions(2);
    const buttons = await loader.getAllHarnesses(ButtonHarness.with({text: 'Primary'}));
    expect(buttons).toHaveLength(1);
    expect(await buttons[0].getText()).toBe('Primary');
  });

  it('should get all buttons with regex', async () => {
    expect.assertions(3);
    const buttons = await loader.getAllHarnesses(ButtonHarness.with({text: /Primary/iu}));
    expect(buttons).toHaveLength(2);
    expect(await buttons[0].getText()).toBe('Primary');
    expect(await buttons[1].getText()).toBe('Primary Disabled');
  });

  it('should get all buttons using empty predicate', async () => {
    expect.assertions(3);
    const buttons = await loader.getAllHarnesses(ButtonHarness.with());
    expect(buttons).toHaveLength(2);
    expect(await buttons[0].getText()).toBe('Primary');
    expect(await buttons[1].getText()).toBe('Primary Disabled');
  });

  it('should get disabled state', async () => {
    expect.assertions(2);
    const [enabledButton, disabledButton] =
        await loader.getAllHarnesses(ButtonHarness);

    expect(await enabledButton.isDisabled()).toBe(false);
    expect(await disabledButton.isDisabled()).toBe(true);
  });

  it('should get button text', async () => {
    expect.assertions(2);
    const [firstButton, secondButton] =
        await loader.getAllHarnesses(ButtonHarness);

    expect(await firstButton.getText()).toBe('Primary');
    expect(await secondButton.getText()).toBe('Primary Disabled');
  });

  it('should focus and blur button', async () => {
    expect.assertions(3);
    const button = await loader.getHarness(ButtonHarness.with({text: 'Primary'}));
    expect(await button.isFocused()).toBe(false);
    await button.focus();
    expect(await button.isFocused()).toBe(true);
    await button.blur();
    expect(await button.isFocused()).toBe(false);
  });

  it('should click a button', async () => {
    expect.assertions(1);
    const button = await loader.getHarness(ButtonHarness.with({text: 'Primary'}));
    await button.click();

    expect(fixture.componentInstance.clicked).toBe(true);
  });

  it('should not click a disabled button', async () => {
    expect.assertions(1);
    const button = await loader.getHarness(ButtonHarness.with({text: 'Primary Disabled'}));
    await button.click();

    expect(fixture.componentInstance.clicked).toBe(false);
  });
});
