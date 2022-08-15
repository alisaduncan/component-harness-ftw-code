import { Component, EventEmitter, Output } from '@angular/core';

export interface EmailSubscription {
  email: string,
  subscribe: boolean
}

@Component({
  selector: 'app-email-subscription',
  template: `
    <div class="mat-typography my-6 mx-3 flex justify-start items-center">
      <mat-form-field color="primary">
        <mat-label>Email</mat-label>
        <input matInput type="email" [(ngModel)]="email">
      </mat-form-field>
      <mat-slide-toggle [(ngModel)]="isSubscribed" [disabled]="!email" class="ml-6 mr-3">Subscribe me!</mat-slide-toggle>
      <button mat-icon-button color="accent" [disabled]="!email" (click)="onEmailSubscriptionChange()">
        <mat-icon>add_box</mat-icon>
      </button>
    </div>
  `,
  styles: [`
    mat-form-field.mat-form-field {
      font-size: 16px;
    }
  `]
})
export class EmailSubscriptionComponent {
  @Output() emailSubscription: EventEmitter<EmailSubscription> = new EventEmitter<EmailSubscription>();
  public email: string|undefined;
  public isSubscribed = true;

  public onEmailSubscriptionChange() {
    this.emailSubscription.emit({email: this.email, subscribe: this.isSubscribed} as EmailSubscription);
  }

}
