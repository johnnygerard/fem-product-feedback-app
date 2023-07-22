import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoComponent } from '../logo/logo.component';
import { FilterComponent } from '../filter/filter.component';
import { RoadmapViewComponent } from '../roadmap-view/roadmap-view.component';
import { SortComponent } from '../sort/sort.component';
import { NoFeedbackComponent } from '../no-feedback/no-feedback.component';
import { SuggestionComponent } from '../suggestion/suggestion.component';
import { DataService } from '../data.service';
import { Subject, takeUntil } from 'rxjs';
import { FeedbackCategory } from '../Types/feedback-category.enum';
import { Feedback } from '../Types/feedback.class';
import { FeedbackStatus } from '../Types/feedback-status.enum';
import { SortOrder } from '../Types/sort-order.enum';
import { FeedbackComment } from '../Types/feedback-comment.class';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    FilterComponent,
    RoadmapViewComponent,
    SortComponent,
    NoFeedbackComponent,
    SuggestionComponent,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();
  private viewPortWidth = window.innerWidth;
  protected get isMobile(): boolean {
    return this.viewPortWidth < 768;
  }
  private selectedFilter = this.dataService.filter$.value;
  private selectedSortOrder = this.dataService.sortOrder$.value;
  protected suggestions: Feedback[] = [];

  /**
   * Return the IDs of the suggestions to display and update the suggestion count.
   */
  protected get suggestionIDs(): number[] {
    const filtered = this.selectedFilter === FeedbackCategory.ALL ?
      this.suggestions :
      this.suggestions.filter(suggestion => suggestion.category === this.selectedFilter);

    this.dataService.suggestionCount$.next(filtered.length);

    const sorted = filtered.sort((a, b) => {
      switch (this.selectedSortOrder) {
        case SortOrder.MOST_UPVOTES:
          return b.upvotes - a.upvotes;
        case SortOrder.LEAST_UPVOTES:
          return a.upvotes - b.upvotes;
        case SortOrder.MOST_COMMENTS:
          return FeedbackComment.countComments(b.comments)
            - FeedbackComment.countComments(a.comments);
        case SortOrder.LEAST_COMMENTS:
          return FeedbackComment.countComments(a.comments)
            - FeedbackComment.countComments(b.comments);
      }
    });

    return sorted.map(suggestion => suggestion.id);
  }

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.isLoaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLoaded => {
        if (!isLoaded) return;
        this.suggestions = this.dataService.feedback
          .filter(feedback => feedback.status === FeedbackStatus.SUGGESTION);
      });
    this.dataService.filter$
      .pipe(takeUntil(this.destroy$))
      .subscribe(filter => this.selectedFilter = filter);
    this.dataService.sortOrder$
      .pipe(takeUntil(this.destroy$))
      .subscribe(sortOrder => this.selectedSortOrder = sortOrder);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.viewPortWidth = window.innerWidth;
  }
}
