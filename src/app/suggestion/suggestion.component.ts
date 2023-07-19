import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../data.service';
import { UpvoteComponent } from '../upvote/upvote.component';
import { ProductRequestCategoryComponent } from '../product-request-category.component';
import { CommentIconSvgComponent } from '../svg/comment-icon-svg.component';
import { ProductRequest } from '../Types/product-request.class';
import { AppComment } from '../Types/comment.class';

@Component({
  selector: 'app-suggestion',
  standalone: true,
  imports: [
    CommonModule,
    UpvoteComponent,
    ProductRequestCategoryComponent,
    CommentIconSvgComponent,
  ],
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent {
  @Input({ required: true }) productRequestID = 0;
  protected get productRequest(): ProductRequest {
    return this.dataService.getProductRequest(this.productRequestID);
  }

  constructor(private readonly dataService: DataService) { }

  protected getCommentCount(comments: AppComment[]): number {
    let count = comments.length;

    for (const comment of comments)
      count += comment.replies?.length ?? 0;

    return count;
  }
}
