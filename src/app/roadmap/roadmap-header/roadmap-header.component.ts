import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from 'src/app/go-back/go-back.component';
import { AddFeedbackLinkComponent } from 'src/app/add-feedback-link.component';

@Component({
  selector: 'app-roadmap-header',
  standalone: true,
  imports: [
    CommonModule,
    GoBackComponent,
    AddFeedbackLinkComponent,
  ],
  templateUrl: './roadmap-header.component.html',
  styleUrls: ['./roadmap-header.component.scss']
})
export class RoadmapHeaderComponent {

}
