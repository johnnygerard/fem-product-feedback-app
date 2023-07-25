import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkmark-svg',
  standalone: true,
  imports: [CommonModule],
  template: `
<svg width="13" height="11" viewBox="0 0 13 11" fill="none">
  <path d="M1 5.23287L4.52154 9L12 1" stroke="#AD1FEA" stroke-width="2"/>
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
export class CheckmarkSvgComponent {

}
