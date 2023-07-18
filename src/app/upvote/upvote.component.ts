import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpArrowSvgComponent } from '../svg/up-arrow-svg.component';
import { ProductRequest } from '../Types/product-request.class';
import { DataService } from '../data.service';

@Component({
  selector: 'app-upvote',
  standalone: true,
  imports: [CommonModule, UpArrowSvgComponent],
  templateUrl: './upvote.component.html',
  styleUrls: ['./upvote.component.scss']
})
export class UpvoteComponent {
  @Input({ required: true }) productRequestID = 0;

  private get productRequest(): ProductRequest {
    return this.dataService.getProductRequest(this.productRequestID);
  }

  protected get upvotes(): number {
    return this.productRequest.upvotes;
  }

  private set upvotes(value: number) {
    this.productRequest.upvotes = value;
  }

  protected isActive = false;

  protected toggleActiveState(): void {
    this.upvotes += this.isActive ? -1 : 1;
    this.isActive = !this.isActive;
  }

  constructor(private readonly dataService: DataService) { }
}
