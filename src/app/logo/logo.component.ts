import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  protected viewPortWidth = window.innerWidth;

  protected get isMobile(): boolean {
    return this.viewPortWidth < 768;
  }

  protected get isTablet(): boolean {
    return this.viewPortWidth >= 768 && this.viewPortWidth < 1440;
  }

  protected get isDesktop(): boolean {
    return this.viewPortWidth >= 1440;
  }

  @HostListener('window:resize')
  onResize(): void {
    this.viewPortWidth = window.innerWidth;
  }
}
