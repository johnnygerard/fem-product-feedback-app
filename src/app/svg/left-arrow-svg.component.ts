import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-left-arrow-svg',
  standalone: true,
  imports: [CommonModule],
  template: `
<svg width="6" height="10" viewBox="0 0 6 10" fill="none">
<path id="Path 2" d="M4.33447 9L0.334473 5L4.33447 1" stroke="#4661E6" stroke-width="2"/>
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
export class LeftArrowSvgComponent {

}
