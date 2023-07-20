import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapViewComponent } from './roadmap-view.component';

describe('RoadmapViewComponent', () => {
  let component: RoadmapViewComponent;
  let fixture: ComponentFixture<RoadmapViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RoadmapViewComponent]
    });
    fixture = TestBed.createComponent(RoadmapViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
