import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetectiveSvgComponent } from '../svg/detective-svg.component';
import { AddFeedbackLinkComponent } from '../add-feedback-link.component';

@Component({
  selector: 'app-no-feedback',
  standalone: true,
  imports: [CommonModule, DetectiveSvgComponent, AddFeedbackLinkComponent],
  templateUrl: './no-feedback.component.html',
  styleUrls: ['./no-feedback.component.scss']
})
export class NoFeedbackComponent {

}
