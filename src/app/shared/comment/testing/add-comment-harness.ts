import { AsyncFactoryFn, ComponentHarness, HarnessPredicate, TestElement } from '@angular/cdk/testing';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AddCommentHarnessFilters } from './add-comment-harness.filters';

export class AddCommentHarness extends ComponentHarness {
  static hostSelector = 'app-add-comment';

  static with(options: AddCommentHarnessFilters): HarnessPredicate<AddCommentHarness> {
    return new HarnessPredicate(AddCommentHarness, options)
      .addOption('comment', options.comment,
        async (harness, comment) => HarnessPredicate.stringMatches(harness.getComment(), comment)
      )
      .addOption('valid', options.valid,
        async (harness, valid) => await harness.isValid() === valid);
  }

  private _commentInput: AsyncFactoryFn<TestElement> = this.locatorFor('input');
  private _submitButton: AsyncFactoryFn<TestElement> = this.locatorFor('button');

  public async getComment(): Promise<string> {
    const input = await this._commentInput();
    return await input.getProperty<string>('value');
  }

  public async setComment(comment: string): Promise<void> {
    if (comment.trim() === '') throw Error('Comment is invalid');

    const input = await this._commentInput();
    await input.clear();

    await input.sendKeys(comment);
    await input.setInputValue(comment);
  }

  public async isDisabled(): Promise<boolean> {
    const button = await this._submitButton();
    return coerceBooleanProperty(await button.getAttribute('disabled'));
  }

  public async isValid(): Promise<boolean> {
    return !(await this.isDisabled());
  }

  public async submitComment(): Promise<void> {
    if (!(await this.isValid())) throw Error('Component is invalid');

    const button = await this._submitButton();
    return button.click();
  }
}
