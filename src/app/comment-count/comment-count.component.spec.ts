import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentCountComponent } from './comment-count.component';

describe('CommentCountComponent', () => {
  let component: CommentCountComponent;
  let fixture: ComponentFixture<CommentCountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommentCountComponent]
    });
    fixture = TestBed.createComponent(CommentCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
