import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './Types/user.type';
import { Feedback } from './Types/feedback.class';
import { BehaviorSubject, Subject, delay, of, retry, takeUntil, throwError } from 'rxjs';
import { FeedbackCategory } from './Types/feedback-category.enum';
import { FeedbackStatus } from './Types/feedback-status.enum';

type Data = {
  currentUser: User;
  feedback: Feedback[];
};

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  private data: Data = {
    "currentUser": {
      "image": "./assets/user-images/image-zena.jpg",
      "name": "Zena Kelley",
      "username": "velvetround"
    },
    "feedback": []
  };
  isLoaded$ = new BehaviorSubject(false);
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
        this.data = data;
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

  addFeedback(
    title: string,
    category: FeedbackCategory,
    description: string
  ): void {
    this.data.feedback.push(new Feedback(
      this.data.feedback.length + 1,
      title,
      category,
      description
    ));
  }

  getFeedback(id: number): Feedback {
    return this.data.feedback[id - 1];
  }

  countFeedback(status: FeedbackStatus): number {
    return this.data.feedback.filter(
      feedback => feedback.status === status
    ).length;
  }
}
