import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpArrowSvgComponent } from '../svg/up-arrow-svg.component';
import { Feedback } from '../Types/feedback.class';
import { DataService } from '../data.service';

@Component({
  selector: 'app-upvote',
  standalone: true,
  imports: [CommonModule, UpArrowSvgComponent],
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.scss']
})
export class UpvoteComponent {
  @Input({ required: true }) feedbackID = 0;

  private get feedback(): Feedback {
    return this.dataService.getFeedback(this.feedbackID);
  }

  protected get upvotes(): number {
    return this.feedback.upvotes;
  }

  private set upvotes(value: number) {
    this.feedback.upvotes = value;
  }

  protected isActive = false;

  protected toggleActiveState(): void {
    this.upvotes += this.isActive ? -1 : 1;
    this.isActive = !this.isActive;
  }

  constructor(private readonly dataService: DataService) { }
}
