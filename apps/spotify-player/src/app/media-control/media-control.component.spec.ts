import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import {MediaControlComponent} from './media-control.component';

describe('MediaControlComponent', () => {
  let component: MediaControlComponent;
  let fixture: ComponentFixture<MediaControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaControlComponent],
      imports: [
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });
});
