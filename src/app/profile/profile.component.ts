import { Component, OnInit } from '@angular/core';
import { EmailSubscription } from './email-subscription.component';

@Component({
  selector: 'app-profile',
  template: `
    <h2 class="mb-12 text-center text-5xl text-indigo-600">Profile Settings</h2>
    <p>
      We're so glad you're here! Thanks for supporting "My Fave K-Dramas!" 🫰
    </p>
    <section class="my-3">
      <p>Sign up for our newsletter</p>
      <div class="my-9 bg-zinc-50 border border-slate-400 rounded-lg">
        <app-email-subscription (emailSubscription)="onEmailSubscription($event)"></app-email-subscription>
      </div>
    </section>
    <p class="mt-6">
      Don't forget to write automated tests! Happy coding!
    </p>
  `
})
export class ProfileComponent {

  constructor() { }

  public onEmailSubscription(signup: EmailSubscription): void {
    console.log(signup);
  }
}
