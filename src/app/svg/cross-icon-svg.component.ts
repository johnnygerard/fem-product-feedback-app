import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cross-icon-svg',
  standalone: true,
  imports: [CommonModule],
  template: `
<svg width="18" height="17" viewBox="0 0 18 17" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M8.99989 6.37857L2.98948 0.368164L0.868164 2.48948L6.87857 8.49989L0.868164 14.5103L2.98948 16.6316L8.99989 10.6212L15.0103 16.6316L17.1316 14.5103L11.1212 8.49989L17.1316 2.48948L15.0103 0.368164L8.99989 6.37857Z" fill="white"/>
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
export class CrossIconSvgComponent {

}
