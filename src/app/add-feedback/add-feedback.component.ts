import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FeedbackCategory } from '../Types/feedback-category.enum';
import { DataService } from '../data.service';
import { GoBackComponent } from '../go-back/go-back.component';
import { SelectComponent } from '../select/select.component';
import { AddFeedbackIconSvgComponent } from '../svg/add-feedback-icon-svg.component';

@Component({
  selector: 'app-add-feedback',
  standalone: true,
  imports: [
    CommonModule,
    GoBackComponent,
    FormsModule,
    AddFeedbackIconSvgComponent,
    SelectComponent,
  ],
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent implements OnDestroy {
  protected title = '';
  protected category = FeedbackCategory.FEATURE;
  protected categories = [
    FeedbackCategory.FEATURE,
    FeedbackCategory.UI,
    FeedbackCategory.UX,
    FeedbackCategory.ENHANCEMENT,
    FeedbackCategory.BUG,
  ];

  protected description = '';
  protected requiredError = 'Can’t be empty';
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly router: Router,
    private readonly dataService: DataService,
  ) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected submitForm(form: NgForm): void {
    if (form.invalid) return;

    this.dataService.isLoaded$
      .pipe(takeUntil(this.destroy$))
      .subscribe(isLoaded => {
        if (!isLoaded) return;

        this.dataService.addFeedback(this.title, this.category, this.description);
        this.router.navigate(['/']);
      });
  }

  protected cancel(): void {
    this.router.navigate(['/']);
  }

  protected isInvalid(model: NgModel, form: NgForm): boolean | null {
    return model.invalid && (model.dirty || model.touched || form.submitted);
  }
}
