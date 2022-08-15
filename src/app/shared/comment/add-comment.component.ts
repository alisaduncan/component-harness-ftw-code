import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-comment',
  template: `
    <p class="text-xl text-slate-500 mb-3">Your thoughts?</p>
    <div class="flex items-center mb-6">
      <input
        type="text"
        [(ngModel)]="commentInput"
        placeholder="Add a comment"
        class="focus:ring-2 focus:ring-teal-300 focus:outline-none w-1/2 text-sm text-slate-900 placeholder-slate-400 rounded p-2 ring-1 ring-slate-400 bg-zinc-50"
      />
      <button
        type="button"
        [disabled]="!commentInput"
        class="ml-3 enabled:text-white bg-gray-300 enabled:bg-gradient-to-r enabled:from-teal-400 enabled:via-teal-500 enabled:to-teal-600 enabled:hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-4 py-2 text-center inline-flex items-center mr-1 disabled:opacity-50"
        (click)="onAdded()"
      >
        <svg aria-hidden="true" class="mr-2 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        Add
      </button>
    </div>
  `,
  styles: [
  ]
})
export class AddCommentComponent {
  @Output() comment: EventEmitter<string> = new EventEmitter<string>();
  public commentInput: string|undefined;

  constructor() { }

  public onAdded(): void {
    this.comment.emit(this.commentInput);
    this.commentInput = '';
  }
}
