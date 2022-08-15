import { Component } from '@angular/core';
import { SigninService } from '../signin.service';

@Component({
  selector: 'app-nav',
  template: `
    <nav class="mx-3 mat-typography">
      <ul class="flex justify-end text-slate-500">
        <li>
          <a mat-button class="hover:bg-indigo-100" routerLink="/dramas" routerLinkActive="font-semibold text-indigo-500">HOME</a>
        </li>
        <li *ngIf="this.signinService.isLoggedIn">
          <a mat-button class="hover:bg-indigo-100" routerLink="/profile" routerLinkActive="font-semibold text-indigo-500">PROFILE</a>
        </li>
        <li *ngIf="!this.signinService.isLoggedIn">
          <button mat-button class="hover:text-indigo-500" (click)="login()">LOG IN</button>
        </li>
        <li *ngIf="this.signinService.isLoggedIn">
          <button mat-button class="hover:text-indigo-500" (click)="logout()">LOG OUT</button>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    li+li {
      margin-left: 1.5rem;
    }
  `]
})
export class NavComponent {

  constructor(public signinService: SigninService) { }

  public login(): void {
    this.signinService.login();
  }

  public logout(): void {
    this.signinService.logout();
  }
}
