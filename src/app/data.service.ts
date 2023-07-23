import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Feedback } from './Types/feedback.class';
import { BehaviorSubject, Subject, delay, of, retry, takeUntil, throwError } from 'rxjs';
import { FeedbackCategory } from './Types/feedback-category.enum';
import { FeedbackStatus } from './Types/feedback-status.enum';
import { SortOrder } from './Types/sort-order.enum';
import { Data } from './data.type';
import { testData } from 'src/assets/test-data';
import { FeedbackComment } from './Types/feedback-comment.class';

const defaultData: Data = {
  "currentUser": {
    "image": "./assets/user-images/image-zena.jpg",
    "name": "Zena Kelley",
    "username": "velvetround"
  },
  "feedback": []
};

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  private data: Data = testData;
  private nextFeedbackID = 0;
  private nextCommentID = 0;
  isLoaded$ = new BehaviorSubject(false);
  filter$ = new BehaviorSubject(FeedbackCategory.ALL);
  sortOrder$ = new BehaviorSubject(SortOrder.MOST_UPVOTES);
  suggestionCount$ = new BehaviorSubject(0);
  private readonly destroy$ = new Subject<void>();

  constructor(http: HttpClient) {
    http.get<Data>('assets/data.json').pipe(
      retry({
        count: 3,
        delay: (error: HttpErrorResponse, retryCount: number) => {
          // Propagate the error if it's a client or a server error
          if (error.status >= 400) return throwError(() => error);

          // Retry network errors after an exponential delay (1, 10 and 100ms)
          return of(0).pipe(delay(10 ** (retryCount - 1)));
        }
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: data => {
        const max = (a: number, b: number) => Math.max(a, b);

        this.data = data;
        this.nextFeedbackID = data.feedback
          .map(feedback => feedback.id)
          .reduce(max, 0) + 1;
        this.nextCommentID = data.feedback
          .flatMap(feedback => feedback.comments ?? [])
          .map(comment => comment.id)
          .reduce(max, 0) + 1;
        this.isLoaded$.next(true);
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
        window.alert('An error occurred while fetching the data.');
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.isLoaded$.complete();
  }

  get feedback(): Feedback[] {
    return this.data.feedback;
  }

  addFeedback(
    title: string,
    category: FeedbackCategory,
    description: string
  ): void {
    this.data.feedback.push(new Feedback(
      this.nextFeedbackID++,
      title,
      category,
      description
    ));
  }

  getFeedback(id: number): Feedback {
    const feedback = this.data.feedback.find(feedback => feedback.id === id);

    if (!feedback) throw Error(`Feedback with ID ${id} not found.`);
    return feedback;
  }

  countFeedback(status: FeedbackStatus): number {
    return this.data.feedback.filter(
      feedback => feedback.status === status
    ).length;
  }

  postComment(feedbackID: number, content: string): void {
    const comment = new FeedbackComment(
      this.nextCommentID++,
      content,
      this.data.currentUser
    );

    (this.getFeedback(feedbackID).comments ??= []).push(comment);
  }
}
