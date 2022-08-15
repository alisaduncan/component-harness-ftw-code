import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCommentComponent } from './add-comment.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('AddCommentComponent', () => {
  let component: AddCommentComponent;
  let fixture: ComponentFixture<AddCommentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCommentComponent ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have text input and submit button', () => {
    const inputEl = fixture.debugElement.query(By.css('input'));
    expect(inputEl).not.toBeNull();

    const buttonEl = fixture.debugElement.query(By.css('button'));
    expect(buttonEl).not.toBeNull();
  });

  it('should have a disabled submit button until comment text is added', async () => {
    const buttonEl = fixture.debugElement.query(By.css('button'));
    expect(buttonEl).not.toBeNull();
    expect(buttonEl.nativeElement.disabled).toBeTrue();

    const inputEl = fixture.debugElement.query(By.css('input'));
    expect(inputEl).not.toBeNull();
    inputEl.nativeElement.value = 'Test';
    inputEl.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    expect(buttonEl.nativeElement.disabled).toBeFalse();
  });

  it('should emit an event when a comment is submitted', async () => {
    const submittedEventSpy = spyOn(component.comment, 'emit').and.stub();

    const COMMENT = 'Test';

    const inputEl = fixture.debugElement.query(By.css('input'));
    expect(inputEl).not.toBeNull();
    inputEl.nativeElement.value = COMMENT;
    inputEl.nativeElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button'));
    expect(buttonEl).not.toBeNull();
    buttonEl.triggerEventHandler('click', null);

    expect(submittedEventSpy).toHaveBeenCalledOnceWith(COMMENT);
  });
});
