import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-feedback-icon-svg',
  standalone: true,
  imports: [CommonModule],
  template: `
<svg width="56" height="56" viewBox="0 0 56 56" fill="none">
  <circle cx="28" cy="28" r="28" fill="url(#paint0_radial_0_2017)"/>
  <path d="M30.3425 36V30.1657H36.0295V25.8637H30.3425V20H25.7459V25.8637H20V30.1657H25.7459V36H30.3425Z" fill="white"/>
  <defs>
    <radialGradient id="paint0_radial_0_2017" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(58.184 -5.81647) rotate(129.411) scale(93.4169)">
      <stop stop-color="#E84D70"/>
      <stop offset="0.530886" stop-color="#A337F6"/>
      <stop offset="1" stop-color="#28A7ED"/>
    </radialGradient>
  </defs>
</svg>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `
  ]
})
export class AddFeedbackIconSvgComponent {

}