import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';

// This dummy component is a temporary placeholder.
@Component({
  template: '<p>Dummy works!</p>'
})
export class DummyComponent { }

export const routes: Routes = [
  { path: '', component: DummyComponent },
  { path: 'roadmap', component: DummyComponent },
  { path: 'add-feedback', component: AddFeedbackComponent },
  { path: 'feedback/:id', component: DummyComponent },
  { path: 'edit-feedback/:id', component: DummyComponent },
  { path: '**', redirectTo: '' }
];
