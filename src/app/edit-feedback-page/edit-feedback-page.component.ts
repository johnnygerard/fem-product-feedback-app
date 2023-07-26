import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeedbackCategory } from '../Types/feedback-category.enum';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../data.service';
import { GoBackComponent } from '../go-back/go-back.component';
import { SelectComponent } from '../select/select.component';
import { EditFeedbackIconSvgComponent } from '../svg/edit-feedback-icon-svg.component';
import { FeedbackStatus } from '../Types/feedback-status.enum';

@Component({
  selector: 'app-edit-feedback-page',
  standalone: true,
  imports: [
    CommonModule,
    GoBackComponent,
    FormsModule,
    EditFeedbackIconSvgComponent,
    SelectComponent,
  ],
  templateUrl: './edit-feedback-page.component.html',
  styleUrls: ['./edit-feedback-page.component.scss']
})
export class EditFeedbackPageComponent implements OnInit, OnDestroy {
  #destroy$ = new Subject<void>();
  #feedbackId = 0;
  dataLoaded = false;
  originalTitle = '';
  title = '';
  category = FeedbackCategory.FEATURE;
  categories = [
    FeedbackCategory.FEATURE,
    FeedbackCategory.UI,
    FeedbackCategory.UX,
    FeedbackCategory.ENHANCEMENT,
    FeedbackCategory.BUG,
  ];
  status = FeedbackStatus.SUGGESTION;
  description = '';
  requiredError = 'Can’t be empty';
  statuses = Object.values(FeedbackStatus);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService,
  ) { }

  ngOnInit() {
    this.route.params
      .pipe(takeUntil(this.#destroy$))
      .subscribe(params => {
        this.#feedbackId = +params['id'];

        this.dataService.isLoaded$.subscribe(isLoaded => {
          if (!isLoaded) return;

          const feedback = this.dataService.getFeedback(this.#feedbackId);

          this.originalTitle = feedback.title;
          this.title = feedback.title;
          this.category = feedback.category;
          this.status = feedback.status;
          this.description = feedback.description;
          this.dataLoaded = true;
        });
      });
  }

  ngOnDestroy(): void {
    this.#destroy$.next();
    this.#destroy$.complete();
  }

  get #destination(): string {
    return this.status === FeedbackStatus.SUGGESTION ? '/' : '/roadmap';
  }

  submitForm(form: NgForm): void {
    if (form.invalid) return;

    const feedback = this.dataService.getFeedback(this.#feedbackId);

    feedback.title = this.title;
    feedback.category = this.category;
    feedback.status = this.status;
    feedback.description = this.description;

    this.router.navigate([this.#destination]);
  }

  deleteFeedback(): void {
    if (!window.confirm('Are you sure you want to delete this feedback?'))
      return;

    const feedbackIndex = this.dataService.feedback
      .findIndex(feedback => feedback.id === this.#feedbackId);

    this.dataService.feedback.splice(feedbackIndex, 1);
    this.router.navigate([this.#destination]);
  }

  cancel(): void {
    this.router.navigate([this.#destination]);
  }

  isInvalid(model: NgModel, form: NgForm): boolean | null {
    return model.invalid && (model.dirty || model.touched || form.submitted);
  }
}
