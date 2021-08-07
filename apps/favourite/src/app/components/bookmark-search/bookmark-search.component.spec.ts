import {ComponentFixture, TestBed} from '@angular/core/testing';

import {BookmarkSearchComponent} from './bookmark-search.component';

describe('BookmarkSearchComponent', () => {
  let component: BookmarkSearchComponent;
  let fixture: ComponentFixture<BookmarkSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookmarkSearchComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });
});
