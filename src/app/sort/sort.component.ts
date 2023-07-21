import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortOrder } from '../Types/sort-order.enum';
import { SuggestionIconSvgComponent } from '../svg/suggestion-icon-svg.component';
import { AddFeedbackLinkComponent } from '../add-feedback-link.component';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { FeedbackStatus } from '../Types/feedback-status.enum';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SuggestionIconSvgComponent,
    AddFeedbackLinkComponent,
  ],
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit, OnDestroy {
  @Output() sortOrderEvent = new EventEmitter<SortOrder>();
  protected suggestionCount = 0;
  private _selectedOption = SortOrder.MOST_UPVOTES;

  protected get selectedOption(): SortOrder {
    return this._selectedOption;
  }

  protected set selectedOption(value: SortOrder) {
    this._selectedOption = value;
    this.sortOrderEvent.emit(value);
  }

  protected options = Object.values(SortOrder);
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.isLoaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLoaded => {
        if (isLoaded)
          this.suggestionCount = this.dataService.countFeedback(FeedbackStatus.SUGGESTION);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
