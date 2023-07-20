import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackCategory } from '../Types/feedback-category.enum';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  filter$ = new BehaviorSubject<FeedbackCategory>(FeedbackCategory.ALL);
  protected filterOptions = Object.values(FeedbackCategory);
  private _selectedFilter = FeedbackCategory.ALL;

  protected get selectedFilter(): FeedbackCategory {
    return this._selectedFilter;
  }

  protected set selectedFilter(value: FeedbackCategory) {
    this._selectedFilter = value;
    this.filter$.next(value);
  }
}
