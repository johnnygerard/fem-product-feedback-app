import type { User } from "./user.type";

export class Reply {
  constructor(
    public readonly content: string,
    public readonly replyingTo: string, // username
    public readonly user: User, // author
  ) { }
}
