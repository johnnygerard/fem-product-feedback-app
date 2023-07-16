import type { FeedbackCategory } from "./feedback-category.enum";
import type { FeedbackStatus } from "./feedback-status.enum";

export type Feedback = {
  id: number;
  title: string;
  category: FeedbackCategory;
  status: FeedbackStatus;
  description: string;
  upvotes: number;
  comments: Comment[];
}
