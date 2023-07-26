import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-go-back',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss']
})
export class GoBackComponent {
  constructor(private location: Location, private router: Router) { }

  protected goBack(): void {
    if (this.router.url === '/roadmap') {
      this.router.navigate(['/']);
      return;
    }
    this.location.back();
  }
}
