import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoadmapHeaderComponent } from '../roadmap-header/roadmap-header.component';
import { RoadmapItemComponent } from '../roadmap-item/roadmap-item.component';
import { DataService } from 'src/app/data.service';
import { FeedbackStatus } from 'src/app/Types/feedback-status.enum';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-roadmap-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RoadmapHeaderComponent,
    RoadmapItemComponent,
  ],
  templateUrl: './roadmap-page.component.html',
  styleUrls: ['./roadmap-page.component.scss']
})
export class RoadmapPageComponent implements OnInit {
  protected selectedStatus = FeedbackStatus.PLANNED;
  protected isMobile = window.innerWidth < 768;

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile = window.innerWidth < 768;
  }

  protected readonly roadmapStatuses = [
    FeedbackStatus.PLANNED,
    FeedbackStatus.IN_PROGRESS,
    FeedbackStatus.LIVE,
  ];
  protected roadmapItemIDs: number[][] = this.roadmapStatuses.map(() => []);
  protected statusMessages: { [key: string]: string } = {
    [FeedbackStatus.PLANNED]: 'Ideas prioritized for research',
    [FeedbackStatus.IN_PROGRESS]: 'Currently being developed',
    [FeedbackStatus.LIVE]: 'Released features',
  };

  constructor(private readonly dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.isLoaded$.subscribe(isLoaded => {
      if (!isLoaded) return;

      this.roadmapItemIDs = this.roadmapStatuses
        .map(status => this.dataService.feedback
          .filter(feedback => feedback.status === status)
          .sort((a, b) => b.upvotes - a.upvotes)
          .map(feedback => feedback.id)
        );
    });
  }

  protected getTitle(index: number): string {
    const count = this.roadmapItemIDs[index].length;
    const status = this.roadmapStatuses[index];

    return `${status} (${count})`;
  }
}
