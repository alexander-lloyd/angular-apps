import {BaseHarnessFilters, ComponentHarness, HarnessPredicate} from '@angular/cdk/testing';

/**
 * ButtonHarnessFilters.
 */
export interface ButtonHarnessFilters extends BaseHarnessFilters {
  text?: string | RegExp;
}

/**
 * ButtonHarness.
 */
export class ButtonHarness extends ComponentHarness {
  public static hostSelector = 'al-button';

  private getButton = this.locatorFor('button');

  /**
   * @param options Button filters.
   * @returns Harness Predicate.
   */
  public static with(options: ButtonHarnessFilters = {}): HarnessPredicate<ButtonHarness> {
    return new HarnessPredicate(ButtonHarness, options)
      .addOption('text', options.text,
        (harness, text) => HarnessPredicate.stringMatches(harness.getText(), text));
  }

  /**
   * Click on the button.
   *
   * @returns Promise.
   */
  public async click(): Promise<void> {
    return (await this.getButton()).click();
  }

  /**
   * Focus the button.
   *
   * @returns Promise.
   */
  public async focus(): Promise<void> {
    return (await this.getButton()).focus();
  }

  /**
   * Blur the button.
   *
   * @returns Promise.
   */
  public async blur(): Promise<void> {
    return (await this.getButton()).blur();
  }

  /**
   * Get the button text.
   *
   * @returns Button text.
   */
  public async getText(): Promise<string> {
    return (await this.getButton()).text();
  }

  /**
   * Is the button disabled?
   *
   * @returns Promise.
   */
  public async isDisabled(): Promise<boolean> {
    return (await this.getButton()).getProperty('disabled');
  }

  /**
   * Is the button focused?
   *
   * @returns Promise.
   */
  public async isFocused(): Promise<boolean> {
    return (await this.getButton()).isFocused();
  }
}
