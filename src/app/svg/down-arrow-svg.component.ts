import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-down-arrow-svg',
  standalone: true,
  imports: [CommonModule],
  template: `
<svg width="10" height="7" viewBox="0 0 10 7" fill="none">
  <path d="M1 1L5 5L9 1" stroke="#4661E6" stroke-width="2"/>
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
export class DownArrowSvgComponent {

}
