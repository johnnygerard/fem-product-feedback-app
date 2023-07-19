import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRequestCategory } from './Types/product-request-category.enum';

@Component({
  selector: 'app-product-request-category',
  standalone: true,
  imports: [CommonModule],
  template: `{{ category }}`,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        border-radius: 10px;
        background: #F2F4FF;
        height: 30px;
        width: fit-content;
        padding: 0 16px;

        // Typography
        color: #4661E6;
        font-size: 13px;
        font-weight: 600;
      }
    `
  ]
})
export class ProductRequestCategoryComponent {
  @Input({ required: true }) category = ProductRequestCategory.ALL;
}
