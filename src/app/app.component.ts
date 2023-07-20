import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LogoComponent } from './logo/logo.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, LogoComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(location: Location) {
    location.go('/');
  }
}
