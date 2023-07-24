import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RoadmapPageComponent } from './roadmap/roadmap-page/roadmap-page.component';

// This dummy component is a temporary placeholder.
@Component({
  template: '<p>Dummy works!</p>'
})
export class DummyComponent { }

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'roadmap', component: RoadmapPageComponent },
  { path: 'add-feedback', component: AddFeedbackComponent },
  { path: 'feedback/:id', component: FeedbackPageComponent },
  { path: 'edit-feedback/:id', component: DummyComponent },
  { path: '**', redirectTo: '' }
];
