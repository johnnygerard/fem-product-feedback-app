import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuIconSvgComponent } from '../svg/menu-icon-svg.component';
import { CrossIconSvgComponent } from '../svg/cross-icon-svg.component';
import { FilterComponent } from '../filter/filter.component';
import { RoadmapViewComponent } from '../roadmap-view/roadmap-view.component';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [
    CommonModule,
    MenuIconSvgComponent,
    CrossIconSvgComponent,
    FilterComponent,
    RoadmapViewComponent,
  ],
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {
  protected isSidebarOpen = false;
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

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
