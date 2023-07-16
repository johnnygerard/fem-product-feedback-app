import { Comment } from "./comment.class";
import type { User } from "./user.type";

export class Reply {
  constructor(
    public readonly author: User,
    public readonly text: string,
    public readonly to: User,
    public readonly comment: Comment,
    ) { }

  reply(author: User, text: string): void {
    const reply = new Reply(author, text, this.author, this.comment);

    this.comment.replies.push(reply);
  }
}
