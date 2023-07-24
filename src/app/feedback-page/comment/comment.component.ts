import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { FeedbackComment } from 'src/app/Types/feedback-comment.class';
import { Reply } from 'src/app/Types/reply.class';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input({ required: true }) commentID = 0;
  @ViewChild('textarea') textarea?: ElementRef<HTMLTextAreaElement>;
  private get comment(): FeedbackComment {
    return this.dataService.getComment(this.commentID);
  }
  protected get comments(): Array<FeedbackComment | Reply> {
    return [this.comment, ...(this.comment.replies ?? [])];
  }

  protected replyFormID = -1;
  protected replyContent = '';

  constructor(private readonly dataService: DataService) { }

  protected postReply(index: number): void {
    if (!this.replyContent) return;

    (this.comment.replies ??= []).push(new Reply(
      this.replyContent,
      this.comments[index].user.username,
      this.dataService.currentUser
    ));
    this.replyContent = '';
    this.replyFormID = -1;
  }

  protected openReplyForm(index: number): void {
    this.replyFormID = index;
    setTimeout(() => this.textarea?.nativeElement.focus(), 0);
  }

  protected getReplyingToUsername(comment: FeedbackComment | Reply): string {
    return 'replyingTo' in comment ? comment.replyingTo : '';
  }

  protected isError(model: NgModel, form: NgForm): boolean | null {
    return model.invalid && (model.dirty || form.submitted);
  }
}
