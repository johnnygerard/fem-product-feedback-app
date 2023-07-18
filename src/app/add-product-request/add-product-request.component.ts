import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from '../go-back/go-back.component';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { ProductRequestCategory } from '../Types/product-request-category.enum';
import { Router } from '@angular/router';
import { AddProductRequestIconSvgComponent } from '../svg/add-product-request-icon-svg.component';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-product-request',
  standalone: true,
  imports: [
    CommonModule,
    GoBackComponent,
    FormsModule,
    AddProductRequestIconSvgComponent,
  ],
  templateUrl: './add-product-request.component.html',
  styleUrls: ['./add-product-request.component.scss']
})
export class AddProductRequestComponent {
  protected title = '';
  protected category = ProductRequestCategory.FEATURE;
  protected categories = [
    ProductRequestCategory.FEATURE,
    ProductRequestCategory.UI,
    ProductRequestCategory.UX,
    ProductRequestCategory.ENHANCEMENT,
    ProductRequestCategory.BUG,
  ];

  protected description = '';
  protected requiredError = 'Can’t be empty';

  constructor(
    private readonly router: Router,
    private readonly dataService: DataService,
  ) { }

  protected submitForm(form: NgForm): void {
    if (form.invalid) return;

    this.dataService.addProductRequest(
      this.title,
      this.category,
      this.description
    );
    this.router.navigate(['/']);
  }

  protected cancel(): void {
    this.router.navigate(['/']);
  }

  protected isInvalid(model: NgModel, form: NgForm): boolean | null {
    return model.invalid && (model.dirty || model.touched || form.submitted);
  }
}
