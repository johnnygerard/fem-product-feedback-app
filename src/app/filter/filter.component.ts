import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackCategory } from '../Types/feedback-category.enum';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {
  protected filterOptions = Object.values(FeedbackCategory);
  private _selectedFilter: FeedbackCategory;

  protected get selectedFilter(): FeedbackCategory {
    return this._selectedFilter;
  }

  protected set selectedFilter(value: FeedbackCategory) {
    this._selectedFilter = value;
    this.dataService.filter$.next(value);
  }

  constructor(private readonly dataService: DataService) {
    this._selectedFilter = this.dataService.filter$.value;
  }
}
