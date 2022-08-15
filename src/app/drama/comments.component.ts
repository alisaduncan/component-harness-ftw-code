import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  template: `
    <h3 class="text-xl font-medium text-teal-600">Others thought</h3>
    <ul class="text-slate-600">
      <li class="border border-teal-400 rounded my-3 p-3 bg-zinc-50" *ngFor="let c of comments">
        <p>{{c}}</p>
      </li>
    </ul>
  `,
  styles: [
  ]
})
export class CommentsComponent {
  @Input() public comments: string[] = [];
}

