import { Reply } from "./reply.class";
import type { User } from "./user.type";

export class Comment {
  replies?: Reply[] = undefined;

  constructor(
    public readonly id: number,
    public readonly content: string,
    public readonly user: User,
    ) { }

    /**
     * Reply to the comment or one of its replies
     * @param content Content of the reply
     * @param replyingTo Username of the comment's author or a reply's author
     * @param user Current user
     */
    reply(content: string, replyingTo: string, user: User): void {
      if (!this.replies) this.replies = [];
      this.replies.push(new Reply(content, replyingTo, user));
    }
}
