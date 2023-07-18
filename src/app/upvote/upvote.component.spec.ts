import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpvoteComponent } from './upvote.component';
import { FeedbackService } from '../feedback.service';
import { ProductRequest } from '../Types/product-request.class';
import { ProductRequestCategory } from '../Types/product-request-category.enum';

describe('UpvoteComponent', () => {
  let component: UpvoteComponent;
  let hostElement: HTMLElement;
  let fixture: ComponentFixture<UpvoteComponent>;
  let feedbackService: FeedbackService;

  beforeEach(() => {
    feedbackService = TestBed.inject(FeedbackService);
    fixture = TestBed.createComponent(UpvoteComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  for (const upvoted of [true, false]) {
    it('should toggle state on click', () => {
      const upvotes = 17;
      component.productRequestID = feedbackService.addFeedback(new ProductRequest(
        'title',
        ProductRequestCategory.FEATURE,
        'detail',
        upvotes,
        upvoted
      ));

      const feedback = feedbackService.getFeedback(component.productRequestID);

      hostElement.click();
      expect(feedback.upvotes).toEqual(upvotes + (upvoted ? -1 : 1));
      expect(feedback.upvoted).toEqual(!upvoted);

      hostElement.click();
      expect(feedback.upvotes).toEqual(upvotes);
      expect(feedback.upvoted).toEqual(upvoted);
    });
  }
});
