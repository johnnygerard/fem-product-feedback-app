import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-up-arrow-svg',
  standalone: true,
  imports: [CommonModule],
  template: `
<svg width="9" height="7" viewBox="0 0 9 7" fill="none">
  <path d="M0 6L4 2L8 6" stroke-width="2"/>
</svg>
  `,
  styles: [
    `
      :host {
        display: block;

        &.active path {
          stroke: #FFF;
        }
      }

      path {
        stroke: #4661E6;
      }
    `
  ]
})
export class UpArrowSvgComponent {

}
