import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { UpvoteComponent } from '../upvote/upvote.component';
import { FeedbackCategoryComponent } from '../feedback-category.component';
import { CommentIconSvgComponent } from '../svg/comment-icon-svg.component';
import { Feedback } from '../Types/feedback.class';
import { FeedbackComment } from '../Types/feedback-comment.class';

@Component({
  selector: 'app-suggestion',
  standalone: true,
  imports: [
    CommonModule,
    UpvoteComponent,
    FeedbackCategoryComponent,
    CommentIconSvgComponent,
  ],
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent {
  @Input({ required: true }) feedbackID = 0;
  protected get feedback(): Feedback {
    return this.dataService.getFeedback(this.feedbackID);
  }

  constructor(private readonly dataService: DataService) { }

  protected countComments(comments?: FeedbackComment[]): number {
    return FeedbackComment.countComments(comments);
  }
}
