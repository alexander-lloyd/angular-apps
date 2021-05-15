import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonHarness} from '@angular/material/button/testing';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressBarHarness} from '@angular/material/progress-bar/testing';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MemoizedSelector} from '@ngrx/store';
import {provideMockStore, MockStore} from '@ngrx/store/testing';

import {MediaControlComponent} from './media-control.component';
import {selectors, SpotifyState} from './store';
import {FormatTimePipe} from './pipes/format-time.pipe';


describe('MediaControlComponent', () => {
  let component: MediaControlComponent;
  let fixture: ComponentFixture<MediaControlComponent>;
  let mockStore: MockStore;
  let mockPlayingSelector: MemoizedSelector<{spotify: SpotifyState}, boolean>;
  let mockProgressSelector: MemoizedSelector<{spotify: SpotifyState}, number>;
  let mockLengthSelector: MemoizedSelector<{spotify: SpotifyState}, number>;
  let loader: HarnessLoader;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MediaControlComponent,
        FormatTimePipe
      ],
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
    mockStore = TestBed.inject(MockStore);
    mockPlayingSelector = mockStore.overrideSelector(selectors.selectPlaying, false);
    mockProgressSelector = mockStore.overrideSelector(selectors.selectSongProgress, 0);
    mockLengthSelector = mockStore.overrideSelector(selectors.selectSongLength, 0);
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
  });

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

  it('should set progress bar position', async () => {
    expect.assertions(1);

    const progressBar = await loader.getHarness(MatProgressBarHarness.with({
      selector: '.al-media-player-progress-element'
    }));

    mockProgressSelector.setResult(50);
    mockLengthSelector.setResult(100);
    mockStore.refreshState();

    expect(await progressBar.getValue()).toBe(50);
  });

  it('should set the textual progress and length', async () => {
    expect.assertions(2);

    const progressElement: HTMLParagraphElement = fixture.nativeElement.querySelector('[data-testid=song-progress]');
    const lengthElement: HTMLParagraphElement = fixture.nativeElement.querySelector('[data-testid=song-length]');

    mockProgressSelector.setResult(60000);
    mockLengthSelector.setResult(120000);
    mockStore.refreshState();

    fixture.detectChanges();
    await fixture.whenStable();

    expect(progressElement.textContent).toContain('1:00');
    expect(lengthElement.textContent).toContain('2:00');
  });
});
