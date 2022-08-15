import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCommentComponent } from './comment/add-comment.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AddCommentComponent
  ],
  exports: [
    AddCommentComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
