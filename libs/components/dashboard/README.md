# Dashboard

Build a customisable dashboard layout.

### Usage

```typescript
import {DashboardModule} from '@al/dashboard-components';

@NgModule({
  imports: [
    DashboardModule
  ]
})
export AppModule {
}
```

```html
<al-dashboard>
  <al-dashboard-header>
    <al-dashboard-header-logo> Dashboard </al-dashboard-header-logo>
  </al-dashboard-header>

  <al-dashboard-sidebar>
    <al-dashboard-sidebar-item> Sidebar Item 1 </al-dashboard-sidebar-item>
    <al-dashboard-sidebar-item> Sidebar Item 2 </al-dashboard-sidebar-item>
  </al-dashboard-sidebar>

  <al-dashboard-content> </al-dashboard-content>

  <al-dashboard-footer> </al-dashboard-footer>
</al-dashboard>
```
