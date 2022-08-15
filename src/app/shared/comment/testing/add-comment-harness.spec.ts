import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { HarnessLoader } from '@angular/cdk/testing';
import { AddCommentComponent } from '../add-comment.component';
import { FormsModule } from '@angular/forms';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { AddCommentHarness } from './add-comment-harness';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';

describe('AddComment Harness', () => {
  let fixture: ComponentFixture<AddCommentHarnessTest>;
  let component: AddCommentHarnessTest;
  let loader: HarnessLoader;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCommentHarnessTest, AddCommentComponent],
      imports: [ FormsModule ]
    });

    fixture = TestBed.createComponent(AddCommentHarnessTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should load harness', async () => {
    const els = await loader.getAllHarnesses(AddCommentHarness);
    expect(els).toHaveSize(1);
  });

  it('should be invalid when no comment is added', async () => {
    const el = await loader.getHarness(AddCommentHarness);
    expect(await el.getComment()).toEqual('');
    expect(await el.isValid()).toBeFalse();
  });

  it('should be disabled when no comment is added', async () => {
    const el = await loader.getHarness(AddCommentHarness);
    expect(await el.getComment()).toEqual('');
    expect(await el.isDisabled()).toBeTrue();
  });

  it('should be valid and enabled when a comment is added', async () => {
    const expected = 'TEST TEST';
    const el = await loader.getHarness(AddCommentHarness);
    await el.setComment(expected);

    expect(await el.getComment()).toEqual(expected);
    expect(await el.isValid()).toBeTrue();
    expect(await el.isDisabled()).toBeFalse();
  });

  it('should throw when an invalid comment is added', async () => {
    const el = await loader.getHarness(AddCommentHarness);
    await expectAsync(el.setComment('     ')).toBeRejectedWithError('Comment is invalid');
  });

  it('should find a comment by value', async () => {
    const expected = 'TEST TEST';
    const el = await loader.getHarness(AddCommentHarness.with({comment: ''}));
    await el.setComment(expected);

    await expectAsync(loader.getHarness(AddCommentHarness.with({comment: expected}))).toBeResolved();
  });

  it('should find a comment by validity', async () => {
    const expected = 'TEST TEST';
    const el = await loader.getHarness(AddCommentHarness.with({valid: false}));
    await el.setComment(expected);

    await expectAsync(loader.getHarness(AddCommentHarness.with({valid: true}))).toBeResolved();
  });
});

@Component({
  template: `
    <app-add-comment (comment)="onCommented($event)"></app-add-comment>
  `
})
class AddCommentHarnessTest {
  public addedComment: string | undefined;

  public onCommented(comment: string): void {
    this.addedComment = comment;
  }
}
