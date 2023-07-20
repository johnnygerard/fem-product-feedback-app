import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortOrder } from '../Types/sort-order.enum';
import { SuggestionIconSvgComponent } from '../svg/suggestion-icon-svg.component';
import { AddFeedbackLinkComponent } from '../add-feedback-link.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SuggestionIconSvgComponent,
    AddFeedbackLinkComponent,
  ],
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent {
  @Input({ required: true }) suggestionCount = 0;
  @Output() sortOrderEvent = new EventEmitter<SortOrder>();
  private _selectedOption = SortOrder.MOST_UPVOTES;

  protected get selectedOption(): SortOrder {
    return this._selectedOption;
  }

  protected set selectedOption(value: SortOrder) {
    this._selectedOption = value;
    this.sortOrderEvent.emit(value);
  }

  protected options = Object.values(SortOrder);
}
