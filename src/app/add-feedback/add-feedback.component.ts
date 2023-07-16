import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from '../go-back/go-back.component';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { FeedbackCategory } from '../Types/feedback-category.enum';
import { Router } from '@angular/router';
import { FeedbackService } from '../feedback.service';
import { AddFeedbackIconSvgComponent } from '../svg/add-feedback-icon-svg.component';

@Component({
  selector: 'app-add-feedback',
  standalone: true,
  imports: [
    CommonModule,
    GoBackComponent,
    FormsModule,
    AddFeedbackIconSvgComponent,
  ],
  templateUrl: './add-feedback.component.html',
  styleUrls: ['./add-feedback.component.scss']
})
export class AddFeedbackComponent {
  protected title = '';
  protected category = FeedbackCategory.FEATURE;
  protected categories = [
    FeedbackCategory.FEATURE,
    FeedbackCategory.UI,
    FeedbackCategory.UX,
    FeedbackCategory.ENHANCEMENT,
    FeedbackCategory.BUG,
  ];

  protected detail = '';
  protected requiredError = 'Can’t be empty';

  constructor(
    private readonly router: Router,
    private readonly feedbackService: FeedbackService) { }

  protected submitForm(form: NgForm): void {
    if (form.invalid) return;

    this.feedbackService.addFeedback(this.title, this.category, this.detail);
    this.router.navigate(['/']);
  }

  protected cancel(): void {
    this.router.navigate(['/']);
  }

  protected isRequired(model: NgModel, form: NgForm): boolean | null {
    return model.invalid && (model.dirty || model.touched || form.submitted);
  }
}
