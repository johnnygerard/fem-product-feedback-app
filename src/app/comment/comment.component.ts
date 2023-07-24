import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { FeedbackComment } from '../Types/feedback-comment.class';
import { Reply } from '../Types/reply.class';
import { FormsModule, NgForm, NgModel } from '@angular/forms';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input({ required: true }) commentID = 0;
  @ViewChild('textarea') textarea?: ElementRef<HTMLTextAreaElement>;
  private comment = FeedbackComment.default();

  protected get comments(): Array<FeedbackComment | Reply> {
    return [this.comment, ...(this.comment.replies ?? [])];
  }

  protected replyFormID = -1;
  protected replyContent = '';

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.comment = this.dataService.getComment(this.commentID);
  }

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
