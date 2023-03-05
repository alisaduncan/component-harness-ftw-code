import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSubscription, EmailSubscriptionComponent } from './email-subscription.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatLegacyFormFieldHarness as MatFormFieldHarness } from '@angular/material/legacy-form-field/testing';
import { MatLegacySlideToggleHarness as MatSlideToggleHarness } from '@angular/material/legacy-slide-toggle/testing';
import { MatLegacyButtonHarness as MatButtonHarness } from '@angular/material/legacy-button/testing';
import { MatLegacyInputHarness as MatInputHarness } from '@angular/material/legacy-input/testing';

describe('EmailSubscriptionComponent with Test Harnesses', () => {
  let component: EmailSubscriptionComponent;
  let fixture: ComponentFixture<EmailSubscriptionComponent>;
  let loader: HarnessLoader;

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
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an form input, slide toggle, and a subscribe button', async () => {
    await expectAsync(loader.getHarness(MatFormFieldHarness)).toBeResolved();

    const matSlideToggleEl = await loader.getHarness(MatSlideToggleHarness);
    expect(await matSlideToggleEl.isDisabled()).toBeTrue();

    await expectAsync(loader.getHarness(MatButtonHarness)).toBeResolved();
  });

  it('should disable subscribe button when email is empty', async () => {
    const buttonEl = await loader.getHarness(MatButtonHarness);
    expect(await buttonEl.isDisabled()).toBeTrue();

    const emailInputEl = await loader.getHarness(MatInputHarness);
    await emailInputEl.setValue('email@email.email');

    expect(await buttonEl.isDisabled()).toBeFalse();
  });

  it('should emit subscription event when submitted', async () => {
    const submittedEventSpy = spyOn(component.emailSubscription, 'emit').and.stub();

    const emailInputEl = await loader.getHarness(MatInputHarness);
    await emailInputEl.setValue('email@email.email');

    const buttonEl = await loader.getHarness(MatButtonHarness);
    await buttonEl.click();

    const expected = {email: component.email, subscribe: true};
    expect(submittedEventSpy).toHaveBeenCalledOnceWith(expected);
  });
});

