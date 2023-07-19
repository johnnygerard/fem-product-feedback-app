import type { FeedbackCategory } from "./feedback-category.enum";
import type { AppComment } from "./comment.class";
import { FeedbackStatus } from "./feedback-status.enum";

export class Feedback {
  status = FeedbackStatus.SUGGESTION;
  readonly comments: AppComment[] = [];
  
  constructor(
    public readonly id: number,
    public title: string,
    public category: FeedbackCategory,
    public description: string,
    public upvotes = 0,
  ) { }
}
