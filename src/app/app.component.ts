import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FeedbackCategory } from './Types/feedback-category.enum';
import { SortComponent } from './sort/sort.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SortComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  protected category = FeedbackCategory.FEATURE;

  constructor(location: Location) {
    location.go('/');
  }
}
