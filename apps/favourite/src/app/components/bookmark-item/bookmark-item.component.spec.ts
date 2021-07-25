import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkItemComponent } from './bookmark-item.component';

describe('BookmarkItemComponent', () => {
  let component: BookmarkItemComponent;
  let fixture: ComponentFixture<BookmarkItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmarkItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
