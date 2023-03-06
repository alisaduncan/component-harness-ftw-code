import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { SigninService } from '../signin.service';
import { MatButtonModule } from '@angular/material/button';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  let signinServiceSpy = jasmine.createSpyObj<SigninService>(
    ['login', 'logout'],
    ['isLoggedIn']
  );
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show \'HOME\' and \'LOG IN\' when user is not signed in', async () => {
    (Object.getOwnPropertyDescriptor(signinServiceSpy, 'isLoggedIn')?.get as jasmine.Spy).and.returnValue(false);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEls = fixture.debugElement.queryAll(By.css('*[mat-button]'));
    expect(buttonEls).toHaveSize(2);
    const buttonTexts = buttonEls.map(b => b.nativeElement.innerText);

    const expected = ['HOME', 'LOG IN'];
    expect(buttonTexts).toEqual(expected);
  });

  it('should show \'HOME\', \'PROFILE\', and \'LOG OUT\' when user is signed in', async () => {
    (Object.getOwnPropertyDescriptor(signinServiceSpy, 'isLoggedIn')?.get as jasmine.Spy).and.returnValue(true);
    fixture.detectChanges();
    await fixture.whenStable();

    const buttonEls = fixture.debugElement.queryAll(By.css('*[mat-button]'));
    expect(buttonEls).toHaveSize(3);
    const buttonTexts = buttonEls.map(b => b.nativeElement.innerText);

    const expected = ['HOME', 'PROFILE', 'LOG OUT'];
    expect(buttonTexts).toEqual(expected);
  });
});
