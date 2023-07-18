import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './Types/user.type';
import { ProductRequest } from './Types/product-request.class';
import { BehaviorSubject, Subject, delay, of, retry, takeUntil, throwError } from 'rxjs';
import { ProductRequestCategory } from './Types/product-request-category.enum';

type Data = {
  currentUser: User;
  productRequests: ProductRequest[];
};

const defaultData: Data = {
  "currentUser": {
    "image": "./assets/user-images/image-zena.jpg",
    "name": "Zena Kelley",
    "username": "velvetround"
  },
  "productRequests": []
};

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy {
  readonly data$ = new BehaviorSubject<Data>(defaultData);
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly http: HttpClient) {
    this.http.get<Data>('assets/data.json').pipe(
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
      next: data => this.data$.next(data),
      error: error => {
        console.error(error);
        window.alert('An error occurred while fetching the data.');
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addProductRequest(
    title: string,
    category: ProductRequestCategory,
    description: string
  ): void {
    const data = this.data$.value;

    data.productRequests.push(new ProductRequest(
      data.productRequests.length + 1,
      title,
      category,
      description
    ));
  }

  getProductRequest(id: number): ProductRequest {
    const productRequests = this.data$.value.productRequests;

    return id > 0 && id <= productRequests.length ?
      productRequests[id - 1] :
      new ProductRequest(-1, '', ProductRequestCategory.FEATURE, '');
  }
}
