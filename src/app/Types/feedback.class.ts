import type { FeedbackCategory } from "./feedback-category.enum";
import { FeedbackStatus } from "./feedback-status.enum";

export class Feedback {
  status = FeedbackStatus.SUGGESTION;
  upvotes = 0;
  comments: Comment[] = [];
  
  constructor(
    public id: number,
    public title: string,
    public category: FeedbackCategory,
    public detail: string,
  ) { }
}
