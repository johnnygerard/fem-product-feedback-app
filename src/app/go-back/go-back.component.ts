import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { LeftArrowSvgComponent } from '../svg/left-arrow-svg.component';

@Component({
  selector: 'app-go-back',
  standalone: true,
  imports: [CommonModule, LeftArrowSvgComponent],
  templateUrl: './go-back.component.html',
  styleUrls: ['./go-back.component.scss']
})
export class GoBackComponent {
  constructor(private readonly location: Location) {}

  protected goBack(): void {
    this.location.back();
  }
}
