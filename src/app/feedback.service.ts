import { Injectable } from '@angular/core';
import { Feedback } from './Types/feedback.class';
import { FeedbackCategory } from './Types/feedback-category.enum';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private feedback: Feedback[] = [];

  constructor() { }

  addFeedback(title: string, category: FeedbackCategory, detail: string): void {
    const feedback = new Feedback(this.feedback.length, title, category, detail);
    
    this.feedback.push(feedback);
  }
}
