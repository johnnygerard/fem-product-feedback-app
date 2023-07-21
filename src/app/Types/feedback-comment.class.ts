import { Reply } from "./reply.class";
import type { User } from "./user.type";

export class FeedbackComment {
  replies?: Reply[] = undefined;

  constructor(
    public readonly id: number,
    public readonly content: string,
    public readonly user: User,
  ) { }
}
