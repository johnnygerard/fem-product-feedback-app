import { Reply } from "./reply.class";
import type { User } from "./user.type";

export class FeedbackComment {
  replies?: Reply[] = undefined;

  constructor(
    public readonly id: number,
    public readonly content: string,
    public readonly user: User,
  ) { }

  static countComments(comments?: FeedbackComment[]): number {
    if (!comments) return 0;
    let count = comments.length;

    for (const comment of comments)
      count += comment.replies?.length ?? 0;

    return count;
  }
}
