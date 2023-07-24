import { Reply } from "./reply.class";
import type { User } from "./user.type";

export class FeedbackComment {
  replies?: Reply[] = undefined;

  constructor(
    public readonly id: number,
    public readonly content: string,
    public readonly user: User,
  ) { }

  static default(): FeedbackComment {
    return new FeedbackComment(0, '', { username: '', name: '', image: '' });
  }

  /**
   * Count the number of comments and replies in a feedback.
   */
  static countComments(comments?: FeedbackComment[]): number {
    if (!comments) return 0;
    let count = comments.length;

    for (const comment of comments)
      count += comment.replies?.length ?? 0;

    return count;
  }
}
