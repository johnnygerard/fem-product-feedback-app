import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackCategory } from './Types/feedback-category.enum';

@Component({
  selector: 'app-feedback-category',
  standalone: true,
  imports: [CommonModule],
  template: `{{ category }}`,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        border-radius: 10px;
        background: #F2F4FF;
        height: 30px;
        padding: 0 16px;

        // Typography
        color: #4661E6;
        font-size: 13px;
        font-weight: 600;
      }
    `
  ]
})
export class FeedbackCategoryComponent {
  @Input({ required: true }) category = FeedbackCategory.ALL;
}
