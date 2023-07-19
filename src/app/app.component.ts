import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProductRequestCategory } from './Types/product-request-category.enum';
import { SuggestionComponent } from './suggestion/suggestion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SuggestionComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  protected category = ProductRequestCategory.FEATURE;

  constructor(location: Location) {
    location.go('/');
  }
}
