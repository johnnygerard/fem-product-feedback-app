import { Routes } from '@angular/router';
import { AddFeedbackComponent } from './add-feedback/add-feedback.component';
import { EditFeedbackPageComponent } from './edit-feedback-page/edit-feedback-page.component';
import { FeedbackPageComponent } from './feedback-page/feedback-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RoadmapPageComponent } from './roadmap/roadmap-page/roadmap-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'roadmap', component: RoadmapPageComponent },
  { path: 'add-feedback', component: AddFeedbackComponent },
  { path: 'feedback/:id', component: FeedbackPageComponent },
  { path: 'edit-feedback/:id', component: EditFeedbackPageComponent },
  { path: '**', redirectTo: '' }
];
