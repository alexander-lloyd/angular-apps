import {BaseHarnessFilters, ComponentHarness, HarnessPredicate} from '@angular/cdk/testing';

/**
 * CheckboxHarness.
 */
export class CheckboxHarness extends ComponentHarness {
  public static hostSelector = 'al-checkbox';

  private getCheckbox = this.locatorFor('input');

  /**
   * @param options Button filters.
   * @returns Harness Predicate.
   */
  public static with(options: BaseHarnessFilters = {}): HarnessPredicate<CheckboxHarness> {
    return new HarnessPredicate(CheckboxHarness, options);
  }

  /**
   * Is the checkbox checked?
   *
   * @returns Promise<boolean>.
   */
  public async isDisabled(): Promise<boolean> {
    return (await this.getCheckbox()).getProperty('disabled');
  }

  /**
   * Is the checkbox checked?
   *
   * @returns Promise<boolean>.
   */
  public async isChecked(): Promise<boolean> {
    return (await this.getCheckbox()).getProperty('checked');
  }

  /**
   * Toggle the checkbox.
   *
   * @returns Promise.
   */
  public async toggle(): Promise<void> {
    return (await this.getCheckbox()).click();
  }

  /**
   * Check the checkbox.
   *
   * @returns Promise.
   */
  public async check(): Promise<void> {
    if (!await this.isChecked()) {
      await this.toggle();
    }
  }

  /**
   * Uncheck the checkbox.
   *
   * @returns Promise.
   */
  public async uncheck(): Promise<void> {
    if (await this.isChecked()) {
      await this.toggle();
    }
  }
}
