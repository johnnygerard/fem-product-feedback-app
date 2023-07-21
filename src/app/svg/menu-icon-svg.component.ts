import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-icon-svg',
  standalone: true,
  imports: [CommonModule],
  template: `
<svg width="20" height="17" viewBox="0 0 20 17" fill="none">
  <rect width="20" height="3" fill="white"/>
  <rect y="7" width="20" height="3" fill="white"/>
  <rect y="14" width="20" height="3" fill="white"/>
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
export class MenuIconSvgComponent {

}
