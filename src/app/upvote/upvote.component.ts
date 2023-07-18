import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackService } from '../feedback.service';
import { UpArrowSvgComponent } from '../svg/up-arrow-svg.component';
import { Feedback } from '../Types/feedback.class';

@Component({
  selector: 'app-upvote',
  standalone: true,
  imports: [CommonModule, UpArrowSvgComponent],
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.scss']
})
export class UpvoteComponent {
  @Input() feedbackID = -1;

  private get feedback(): Feedback {
    return this.feedbackService.getFeedback(this.feedbackID);
  }

  protected get upvotes(): number {
    return this.feedback.upvotes;
  }

  private set upvotes(value: number) {
    this.feedback.upvotes = value;
  }

  protected get isActive(): boolean {
    return this.feedback.upvoted;
  }

  private set isActive(value: boolean) {
    this.feedback.upvoted = value;
  }

  protected toggleActiveState(): void {
    this.upvotes += this.isActive ? -1 : 1;
    this.isActive = !this.isActive;
  }

  constructor(private readonly feedbackService: FeedbackService) { }
}
