import {Component, ChangeDetectionStrategy, ViewEncapsulation, HostListener, ElementRef, ViewChild, OnInit, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {distinctUntilChanged, filter, takeUntil, withLatestFrom} from 'rxjs/operators'

/**
 * Dashboard Component.
 */
@Component({
  selector: 'al-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom
})
export class DashboardComponent implements OnInit, OnDestroy {
    private readonly destroy$: Subject<void> = new Subject();
    public readonly sidebarOpen$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    private readonly toggleSidebar$ = new BehaviorSubject<Event | null>(null);

    @ViewChild('sidebar', {static: true})
    public sidebar!: ElementRef<HTMLElement>;

    @ViewChild('sidebarToggle', {read: ElementRef})
    public sidebarToggle!: ElementRef<HTMLElement>;

    public ngOnInit(): void {
      this.toggleSidebar$.pipe(
        withLatestFrom(this.sidebarOpen$),
        distinctUntilChanged(),
        takeUntil(this.destroy$),
        filter(([event, sidebarOpen]) => !!event
          && !sidebarOpen
          // Not clicking on sidebar or sidebar toggle button
          && event.composedPath().indexOf(this.sidebar.nativeElement) == -1
          && event.composedPath().indexOf(this.sidebarToggle.nativeElement) == -1
        )).subscribe(() => {
          this.closeSidebar()
      });
    }

    public ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }

    /**
     * Dismiss the sidebar if user clicks outside of menu
     * while we are considered a mobile device and sidebar is open.
     */
    @HostListener('document:click', ['$event'])
    public dismissSidebar(event: MouseEvent) {
      this.toggleSidebar$.next(event);
    }

    /**
     * Toggle the sidebar.
     */
    public toggleSidebar(): void {
      this.sidebarOpen$.next(!this.sidebarOpen$.value);
    }

    /**
     * Toggle the sidebar.
     */
    public closeSidebar(): void {
      this.sidebarOpen$.next(false);
    }
}
