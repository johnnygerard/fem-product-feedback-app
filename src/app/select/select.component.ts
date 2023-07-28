import { AfterViewInit, Component, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgControl } from '@angular/forms';
import { UpArrowSvgComponent } from '../svg/up-arrow-svg.component';
import { DownArrowSvgComponent } from '../svg/down-arrow-svg.component';
import { CheckmarkSvgComponent } from '../svg/checkmark-svg.component';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
    UpArrowSvgComponent,
    DownArrowSvgComponent,
    CheckmarkSvgComponent,
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
/**
 * Minimal implementation of the native select element.
 * The options' labels always match their values.
 */
export class SelectComponent implements AfterViewInit {
  #pristine = true;
  open = false;
  @Input({ required: true }) options: string[] = [];
  @Input('data-sort') sort?: '';
  get selectedOption(): string {
    return this._ngControl.value;
  }
  focusedOption = '';
  constructor(
    private _ngControl: NgControl,
    private _elementRef: ElementRef,
    private _renderer: Renderer2,
  ) { }

  ngAfterViewInit() {
    this._renderer.setAttribute(this._elementRef.nativeElement, 'tabindex', '0');
  }

  select(option: string): void {
    if (this.#pristine && option !== this.selectedOption) {
      this.#pristine = false;
      this._ngControl.control?.markAsDirty();
    }

    this._ngControl.control?.setValue(option);
  }

  openList(): void {
    this.open = true;
    this.focusedOption = this.selectedOption;
  }

  closeList(): void {
    this.open = false;
  }

  toggleList(): void {
    this.open ? this.closeList() : this.openList();
  }

  @HostListener('blur')
  onBlur(): void {
    this.closeList();
  }

  @HostListener('keydown', ['$event'])
  onKeydown(event: KeyboardEvent): boolean {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft':
        this.#selectPreviousOption();
        break;
      case 'ArrowDown':
      case 'ArrowRight':
        this.#selectNextOption();
        break;
      case ' ':
        if (!this.open) this.openList();
        break;
      case 'Enter':
        if (this.open) {
          this.select(this.focusedOption);
          this.closeList();
          break;
        }
        this.openList();
        break;
      case 'Escape':
        this.closeList();
        break;
      default:
        return true;
    }

    return false;
  }

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): boolean {
    if (event.deltaY < 0) this.#selectPreviousOption();
    else if (event.deltaY > 0) this.#selectNextOption();

    return false; // Prevent scrolling the page
  }

  #selectPreviousOption(): void {
    const index = this.options.indexOf(this.open ? this.focusedOption : this.selectedOption);
    if (index > 0)
      this.select(this.focusedOption = this.options[index - 1]);
  }

  #selectNextOption(): void {
    const index = this.options.indexOf(this.open ? this.focusedOption : this.selectedOption);
    if (index < this.options.length - 1)
      this.select(this.focusedOption = this.options[index + 1]);
  }
}
