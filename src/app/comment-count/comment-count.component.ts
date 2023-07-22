import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentIconSvgComponent } from '../svg/comment-icon-svg.component';

@Component({
  selector: 'app-comment-count',
  standalone: true,
  imports: [CommonModule, CommentIconSvgComponent],
  templateUrl: './comment-count.component.html',
  styleUrls: ['./comment-count.component.scss']
})
export class CommentCountComponent {
  @Input({ required: true }) count = 0;
}
