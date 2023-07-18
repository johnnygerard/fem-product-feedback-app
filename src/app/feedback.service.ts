import { Injectable } from '@angular/core';
import { Feedback } from './Types/feedback.class';
import { FeedbackCategory } from './Types/feedback-category.enum';

type FeedbackID = number;

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedback: Feedback[] = [];

  get feedbackCount(): number {
    return this.feedback.length;
  }

  constructor() {
    this.addFeedback(new Feedback(
      'I love this app!',
      FeedbackCategory.FEATURE,
      'This app is awesome!',
      3,
      true
    ));
  }

  getFeedback(feedbackID: number): Feedback {
    if (feedbackID < 0 || feedbackID >= this.feedbackCount)
      throw Error(`Feedback ID ${feedbackID} is out of range.`);

    return this.feedback[feedbackID];
  }

  addFeedback(feedback: Feedback): FeedbackID {
    this.feedback.push(feedback);

    return this.feedback.length - 1;
  }
}
