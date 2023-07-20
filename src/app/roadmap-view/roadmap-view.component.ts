import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { FeedbackStatus } from '../Types/feedback-status.enum';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-roadmap-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './roadmap-view.component.html',
  styleUrls: ['./roadmap-view.component.scss']
})
export class RoadmapViewComponent {
  protected planned: number;
  protected inProgress: number;
  protected live: number;

  constructor(dataService: DataService) {
    this.planned = dataService.getFeedbackCountByStatus(FeedbackStatus.PLANNED);
    this.inProgress = dataService.getFeedbackCountByStatus(FeedbackStatus.IN_PROGRESS);
    this.live = dataService.getFeedbackCountByStatus(FeedbackStatus.LIVE);
  }
}
