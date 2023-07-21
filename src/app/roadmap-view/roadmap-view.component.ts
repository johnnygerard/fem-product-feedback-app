import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { FeedbackStatus } from '../Types/feedback-status.enum';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-roadmap-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './roadmap-view.component.html',
  styleUrls: ['./roadmap-view.component.scss']
})
export class RoadmapViewComponent implements OnInit, OnDestroy {
  protected planned = 0;
  protected inProgress = 0;
  protected live = 0;
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.isLoaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLoaded => {
        if (!isLoaded) return;

        this.planned = this.dataService.countFeedback(FeedbackStatus.PLANNED);
        this.inProgress = this.dataService.countFeedback(FeedbackStatus.IN_PROGRESS);
        this.live = this.dataService.countFeedback(FeedbackStatus.LIVE);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
