import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-add-comment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent {
  @Input({ required: true }) feedbackId = 0;
  protected comment: string | null = '';
  protected readonly MAX_COMMENT_LENGTH = 250;
  protected get charactersLeft(): number {
    return this.MAX_COMMENT_LENGTH - (this.comment?.length ?? 0);
  }
  constructor(private readonly dataService: DataService) { }
  protected postComment(form: NgForm): void {
    if (!this.comment) return;

    this.dataService.postComment(this.feedbackId, this.comment);
    form.resetForm();
  }

  protected isError(model: NgModel, form: NgForm): boolean | null {
    return model.invalid && (model.dirty || model.touched || form.submitted);
  }
}
