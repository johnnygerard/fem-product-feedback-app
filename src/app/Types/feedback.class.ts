import type { FeedbackCategory } from "./feedback-category.enum";
import type { FeedbackComment } from "./feedback-comment.class";
import { FeedbackStatus } from "./feedback-status.enum";

export class Feedback {
  status = FeedbackStatus.SUGGESTION;
  comments?: FeedbackComment[];

  constructor(
    public readonly id: number,
    public title: string,
    public category: FeedbackCategory,
    public description: string,
    public upvotes = 0,
  ) { }
}
