import { Component, HostBinding, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Feedback } from 'src/app/Types/feedback.class';
import { DataService } from 'src/app/data.service';
import { UpvoteComponent } from 'src/app/upvote/upvote.component';
import { FeedbackCategoryComponent } from 'src/app/feedback-category.component';
import { CommentCountComponent } from 'src/app/comment-count/comment-count.component';
import { FeedbackComment } from 'src/app/Types/feedback-comment.class';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-roadmap-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FeedbackCategoryComponent,
    UpvoteComponent,
    CommentCountComponent,
  ],
  templateUrl: './roadmap-item.component.html',
  styleUrls: ['./roadmap-item.component.scss']
})
export class RoadmapItemComponent {
  @Input({ required: true }) feedbackID = 0;

  @HostBinding('attr.data-status')
  get status(): string {
    return this.feedback.status.toLowerCase();
  }

  protected get feedback(): Feedback {
    return this.dataService.getFeedback(this.feedbackID);
  }

  protected get commentCount(): number {
    return FeedbackComment.countComments(this.feedback.comments);
  }

  constructor(private readonly dataService: DataService) { }
}
