import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpvoteComponent } from './upvote.component';
import { FeedbackCategory } from '../Types/feedback-category.enum';
import { DataService } from '../data.service';

describe('UpvoteComponent', () => {
  let component: UpvoteComponent;
  let hostElement: HTMLElement;
  let fixture: ComponentFixture<UpvoteComponent>;
  let dataService: DataService;

  beforeEach(() => {
    dataService = TestBed.inject(DataService);
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
      dataService.addFeedback('title', FeedbackCategory.FEATURE, 'description');

      const feedback = dataService.getFeedback(component.feedbackID);

      hostElement.click();
      expect(feedback.upvotes).toEqual(upvotes + (upvoted ? -1 : 1));

      hostElement.click();
      expect(feedback.upvotes).toEqual(upvotes);
    });
  }
});
