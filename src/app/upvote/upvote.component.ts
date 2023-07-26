import { Component, Input, OnInit } from '@angular/core';
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
export class UpvoteComponent implements OnInit {
  @Input({ required: true }) feedbackID = 0;

  get #feedback(): Feedback {
    return this.dataService.getFeedback(this.feedbackID);
  }

  get upvotes(): number {
    return this.#feedback.upvotes;
  }

  set upvotes(value: number) {
    this.#feedback.upvotes = value;
  }

  isActive = false;

  toggleActiveState(): void {
    if (this.isActive)
      this.#userUpvotes.splice(this.#userUpvotes.indexOf(this.feedbackID), 1);
    else
      this.#userUpvotes.push(this.feedbackID);

    this.upvotes += this.isActive ? -1 : 1;
    this.isActive = !this.isActive;
  }

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    // Retrieve the upvote status for the current user
    if (this.#userUpvotes.includes(this.feedbackID))
      this.isActive = true;
  }

  get #userUpvotes(): number[] {
    return this.dataService.currentUser.upvotes;
  }
}
