import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MemoizedSelector} from '@ngrx/store';
import {provideMockStore, MockStore} from '@ngrx/store/testing';

import {MediaControlComponent} from './media-control.component';
import {selectors, SpotifyState} from './store';


describe('MediaControlComponent', () => {
  let component: MediaControlComponent;
  let fixture: ComponentFixture<MediaControlComponent>;
  let mockStore: MockStore;
  let mockPlayingSelector: MemoizedSelector<{spotify: SpotifyState}, boolean>;
  let loader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MediaControlComponent],
      imports: [
        FontAwesomeModule,
        MatButtonModule,
        MatIconModule,
        MatProgressBarModule
      ],
      providers: [
        provideMockStore()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MediaControlComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.get(MockStore);
    mockPlayingSelector = mockStore.overrideSelector(selectors.isPlaying, false);
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect.assertions(1);
    expect(component).toBeTruthy();
  });

  it('should have a play button', async () => {
    expect.assertions(1);
    const button = await loader.getHarness(MatButtonHarness.with({
      selector: '.al-media-player-button-play'
    }));

    const playMethodSpy = jest.spyOn(component, 'play');
    await button.click();

    expect(playMethodSpy).toHaveBeenCalledTimes(1);
  });

  it('should have a pause button', async () => {
    expect.assertions(1);
    mockPlayingSelector.setResult(true);
    mockStore.refreshState();
    fixture.detectChanges();

    const button = await loader.getHarness(MatButtonHarness.with({
      selector: '.al-media-player-button-pause'
    }));

    const playMethodSpy = jest.spyOn(component, 'pause');
    await button.click();

    expect(playMethodSpy).toHaveBeenCalledTimes(1);
  });

  it('should dispatch previous action when previous button is pressed', async () => {
    expect.assertions(1);

    const button = await loader.getHarness(MatButtonHarness.with({
      selector: '.al-media-player-button-previous'
    }));

    const previousMethodSpy = jest.spyOn(component, 'previousTrack');
    await button.click();

    expect(previousMethodSpy).toHaveBeenCalledTimes(1);
  });

  it('should dispatch skip action when skip  button is pressed', async () => {
    expect.assertions(1);

    const button = await loader.getHarness(MatButtonHarness.with({
      selector: '.al-media-player-button-skip'
    }));

    const skipMethodSpy = jest.spyOn(component, 'skipTrack');
    await button.click();

    expect(skipMethodSpy).toHaveBeenCalledTimes(1);
  });
});
