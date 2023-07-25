import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SortOrder } from '../Types/sort-order.enum';
import { SuggestionIconSvgComponent } from '../svg/suggestion-icon-svg.component';
import { AddFeedbackLinkComponent } from '../add-feedback-link.component';
import { FormsModule } from '@angular/forms';
import { DataService } from '../data.service';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'app-sort',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SuggestionIconSvgComponent,
    AddFeedbackLinkComponent,
    SelectComponent,
  ],
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent {
  protected get suggestionCount(): number {
    return this.dataService.suggestionCount$.value;
  }

  private _selectedOption = SortOrder.MOST_UPVOTES;

  protected get selectedOption(): SortOrder {
    return this._selectedOption;
  }

  protected set selectedOption(value: SortOrder) {
    this._selectedOption = value;
    this.dataService.sortOrder$.next(value);
  }

  protected options = Object.values(SortOrder);

  constructor(private readonly dataService: DataService) { }
}
