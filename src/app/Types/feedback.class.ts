import type { FeedbackCategory } from "./feedback-category.enum";
import { FeedbackStatus } from "./feedback-status.enum";

export class Feedback {
  status = FeedbackStatus.SUGGESTION;
  comments: Comment[] = [];
  
  constructor(
    public title: string,
    public category: FeedbackCategory,
    public detail: string,
    public upvotes = 0,
    public upvoted = false // by the current user (this is a simplification)
  ) { }
}
