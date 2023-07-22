import { Feedback } from "./Types/feedback.class";
import { User } from "./Types/user.type";

export type Data = {
  currentUser: User;
  feedback: Feedback[];
};
