import { Reply } from "./reply.class";
import type { User } from "./user.type";

export class Comment {
  readonly replies: Reply[] = [];

  constructor(
    public readonly author: User,
    public readonly text: string,
  ) { }

  reply(author: User, text: string): void {
    const reply = new Reply(author, text, this.author, this);
    
    this.replies.push(reply);
  }
}
