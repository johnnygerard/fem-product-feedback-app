import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './Types/user.type';
import { Feedback } from './Types/feedback.class';
import { Subject, delay, of, retry, takeUntil, throwError } from 'rxjs';
import { FeedbackCategory } from './Types/feedback-category.enum';
import { FeedbackStatus } from './Types/feedback-status.enum';

type Data = {
  currentUser: User;
  feedback: Feedback[];
};

const defaultData: Data = {
  "currentUser": {
    "image": "./assets/user-images/image-zena.jpg",
    "name": "Zena Kelley",
    "username": "velvetround"
  },
  "feedback": []
};

// Temporary data for testing purposes
const testData: Data = {
  "currentUser": {
    "image": "./assets/user-images/image-zena.jpg",
    "name": "Zena Kelley",
    "username": "velvetround"
  },
  "feedback": [
    {
      "id": 1,
      "title": "Add tags for solutions",
      "category": FeedbackCategory.ENHANCEMENT,
      "upvotes": 112,
      "status": FeedbackStatus.SUGGESTION,
      "description": "Easier to search for solutions based on a specific stack.",
      "comments": [
        {
          "id": 1,
          "content": "Awesome idea! Trying to find framework-specific projects within the hubs can be tedious",
          "user": {
            "image": "./assets/user-images/image-suzanne.jpg",
            "name": "Suzanne Chang",
            "username": "upbeat1811"
          }
        },
        {
          "id": 2,
          "content": "Please use fun, color-coded labels to easily identify them at a glance",
          "user": {
            "image": "./assets/user-images/image-thomas.jpg",
            "name": "Thomas Hood",
            "username": "brawnybrave"
          }
        }
      ]
    },
    {
      "id": 2,
      "title": "Add a dark theme option",
      "category": FeedbackCategory.FEATURE,
      "upvotes": 99,
      "status": FeedbackStatus.SUGGESTION,
      "description": "It would help people with light sensitivities and who prefer dark mode.",
      "comments": [
        {
          "id": 3,
          "content": "Also, please allow styles to be applied based on system preferences. I would love to be able to browse Frontend Mentor in the evening after my device’s dark mode turns on without the bright background it currently has.",
          "user": {
            "image": "./assets/user-images/image-elijah.jpg",
            "name": "Elijah Moss",
            "username": "hexagon.bestagon"
          }
        },
        {
          "id": 4,
          "content": "Second this! I do a lot of late night coding and reading. Adding a dark theme can be great for preventing eye strain and the headaches that result. It’s also quite a trend with modern apps and  apparently saves battery life.",
          "user": {
            "image": "./assets/user-images/image-james.jpg",
            "name": "James Skinner",
            "username": "hummingbird1"
          },
          "replies": [
            {
              "content": "While waiting for dark mode, there are browser extensions that will also do the job. Search for 'dark theme' followed by your browser. There might be a need to turn off the extension for sites with naturally black backgrounds though.",
              "replyingTo": "hummingbird1",
              "user": {
                "image": "./assets/user-images/image-anne.jpg",
                "name": "Anne Valentine",
                "username": "annev1990"
              }
            },
            {
              "content": "Good point! Using any kind of style extension is great and can be highly customizable, like the ability to change contrast and brightness. I'd prefer not to use one of such extensions, however, for security and privacy reasons.",
              "replyingTo": "annev1990",
              "user": {
                "image": "./assets/user-images/image-ryan.jpg",
                "name": "Ryan Welles",
                "username": "voyager.344"
              }
            }
          ]
        }
      ]
    },
  ]
};

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  private data: Data = testData;
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
      next: data => this.data = data,
      error: (error: HttpErrorResponse) => {
        console.error(error);
        window.alert('An error occurred while fetching the data.');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  getFeedbackCountByStatus(status: FeedbackStatus): number {
    return this.data.feedback.filter(
      feedback => feedback.status === status
    ).length;
  }
}
