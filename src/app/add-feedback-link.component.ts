import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-feedback-link',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<a routerLink="/add-feedback">+ Add Feedback</a>`,
  styles: [
    `
      :host {
        display: block;
      }

      a {
        display: flex;
        align-items: center;
        text-decoration: none;
        height: 44px;
        padding: 0 24px;
        border-radius: 10px;
        background: #AD1FEA;

        &:is(:hover, :focus-visible) {
          background: #C75AF6;
        }

        // Typography
        color: #F2F4FE;
        font-size: 14px;
        font-weight: 700;

        @media (max-width: 768px) {
          height: 40px;
          padding: 0 16px;

          // Typography
          font-size: 13px;
        }
      }
    `
  ]
})
export class AddFeedbackLinkComponent { }
