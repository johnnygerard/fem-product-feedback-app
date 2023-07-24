import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { GoBackComponent } from '../go-back/go-back.component';
import { SuggestionComponent } from '../suggestion/suggestion.component';
import { AddCommentComponent } from './add-comment/add-comment.component';
import { CommentComponent } from './comment/comment.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-feedback-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    GoBackComponent,
    SuggestionComponent,
    CommentComponent,
    AddCommentComponent,
  ],
  templateUrl: './feedback-page.component.html',
  styleUrls: ['./feedback-page.component.scss']
})
export class FeedbackPageComponent implements OnInit, OnDestroy {
  protected feedbackID = 0;
  protected get commentIDs(): number[] {
    return this.dataService.getCommentIDs(this.feedbackID);
  }
  protected get commentCount(): string {
    const count = this.dataService.countComments(this.feedbackID);
    return `${count} Comment${count === 1 ? '' : 's'}`;
  }
  private readonly destroy$ = new Subject<void>();
  constructor(
    private readonly route: ActivatedRoute,
    private readonly dataService: DataService,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => this.feedbackID = +params['id']);
  }
}
