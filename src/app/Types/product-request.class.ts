import type { ProductRequestCategory } from "./product-request-category.enum";
import type { Comment } from "./comment.class";
import { ProductRequestStatus } from "./product-request-status.enum";

export class ProductRequest {
  status = ProductRequestStatus.SUGGESTION;
  readonly comments: Comment[] = [];
  
  constructor(
    public readonly id: number,
    public title: string,
    public category: ProductRequestCategory,
    public description: string,
    public upvotes = 0,
    public upvoted = false // by the current user (this is a simplification)
  ) { }
}
