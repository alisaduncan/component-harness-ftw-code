import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { SigninService } from '../signin.service';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HarnessLoader, parallel } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatButtonHarness } from '@angular/material/button/testing';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let loader: HarnessLoader;

  let signinServiceSpy = jasmine.createSpyObj<SigninService>(
    ['login', 'logout'],
    ['isLoggedIn']
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        MatButtonModule
      ],
      declarations: [ NavComponent ],
      providers: [
        { provide: SigninService, useValue: signinServiceSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show \'HOME\' and \'LOG IN\' when user is not signed in', async () => {
    (Object.getOwnPropertyDescriptor(signinServiceSpy, 'isLoggedIn')?.get as jasmine.Spy).and.returnValue(false);
    fixture.detectChanges();

    const buttonEls = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttonEls).toHaveSize(2);

    const buttonTexts = await parallel(() => buttonEls.map(btn => btn.getText()));

    const expected = ['HOME', 'LOG IN'];
    expect(buttonTexts).toEqual(expected);
  });

  it('should show \'HOME\', \'PROFILE\', and \'LOG OUT\' when user is signed in', async () => {
    (Object.getOwnPropertyDescriptor(signinServiceSpy, 'isLoggedIn')?.get as jasmine.Spy).and.returnValue(true);
    fixture.detectChanges();

    const buttonEls = await loader.getAllHarnesses(MatButtonHarness);
    expect(buttonEls).toHaveSize(3);
    const buttonTexts = await parallel(() => buttonEls.map(btn => btn.getText()));

    const expected = ['HOME', 'PROFILE', 'LOG OUT'];
    expect(buttonTexts).toEqual(expected);
  });

});
