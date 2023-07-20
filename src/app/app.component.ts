import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FilterComponent } from './filter/filter.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FilterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(location: Location) {
    location.go('/');
  }
}
