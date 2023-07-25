import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SelectComponent } from './select/select.component';
import { FeedbackCategory } from './Types/feedback-category.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, SelectComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  value = FeedbackCategory.FEATURE;
  options = [
    FeedbackCategory.FEATURE,
    FeedbackCategory.UI,
    FeedbackCategory.UX,
    FeedbackCategory.ENHANCEMENT,
    FeedbackCategory.BUG,
  ]
  constructor(location: Location) {
    // location.go('/');
  }
}
