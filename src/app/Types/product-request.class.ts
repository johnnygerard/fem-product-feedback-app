import type { ProductRequestCategory } from "./product-request-category.enum";
import type { AppComment } from "./comment.class";
import { ProductRequestStatus } from "./product-request-status.enum";

export class ProductRequest {
  status = ProductRequestStatus.SUGGESTION;
  readonly comments: AppComment[] = [];
  
  constructor(
    public readonly id: number,
    public title: string,
    public category: ProductRequestCategory,
    public description: string,
    public upvotes = 0,
  ) { }
}
