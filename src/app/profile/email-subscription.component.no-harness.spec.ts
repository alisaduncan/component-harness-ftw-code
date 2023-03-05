import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSubscriptionComponent } from './email-subscription.component';
import { MatLegacyFormField as MatFormField, MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('EmailSubscriptionComponent without Test Harnesses', () => {
  let component: EmailSubscriptionComponent;
  let fixture: ComponentFixture<EmailSubscriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailSubscriptionComponent ],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatIconModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailSubscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an form input, slide toggle, and a subscribe button', () => {
    const emailInputEl = fixture.debugElement.query(By.css('input'));
    expect(emailInputEl).not.toBeNull();

    const slideToggleEl = fixture.debugElement.query(By.css('mat-slide-toggle'));
    expect(slideToggleEl).not.toBeNull();
    const slideToggleCheck = slideToggleEl.nativeElement.querySelector('input[type="checkbox"]');
    expect(slideToggleCheck).not.toBeNull();
    expect(slideToggleCheck.disabled).toBeTrue();

    const buttonEl = fixture.debugElement.query(By.css('button'));
    expect(buttonEl).not.toBeNull();
  });

  it('should disable subscribe button when email is empty', async () => {
    const buttonEl = fixture.debugElement.query(By.css('button'));
    expect(buttonEl).not.toBeNull();
    expect(buttonEl.nativeElement.disabled).toBeTrue();

    const emailInputEl = fixture.debugElement.query(By.css('input'));
    expect(emailInputEl).not.toBeNull();
    emailInputEl.nativeElement.value = 'email@email.email';
    emailInputEl.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(buttonEl.nativeElement.disabled).toBeFalse();
  });

  it('should emit subscription event when submitted', async () => {
    const submittedEventSpy = spyOn(component.emailSubscription, 'emit').and.stub();

    const emailInputEl = fixture.debugElement.query(By.css('input'));
    expect(emailInputEl).not.toBeNull();
    emailInputEl.nativeElement.value = 'email@email.email';
    emailInputEl.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEl = fixture.debugElement.query(By.css('button'));
    expect(buttonEl).not.toBeNull();
    buttonEl.triggerEventHandler('click', null);

    const expected = {email: component.email, subscribe: true};
    expect(submittedEventSpy).toHaveBeenCalledOnceWith(expected);
  });
});
