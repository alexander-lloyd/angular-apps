/* eslint-disable @typescript-eslint/no-explicit-any,prefer-rest-params */
/* istanbul ignore file */
import {enableProdMode, ViewEncapsulation} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

declare global {
  interface Window {
    dataLayer: any[];
  }
}

window.dataLayer = window.dataLayer || [];

/**
 * Gtag Function.
 *
 * @param _ Arguments
 */
function gtag(..._: any[]): void {
  window.dataLayer.push(arguments);
}

if (environment.production) {
  enableProdMode();
}

if (environment.gaCode) {
  gtag('js', new Date());
  gtag('config', 'UA-109095621-3');
}

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    defaultEncapsulation: ViewEncapsulation.Native
  })
  // eslint-disable-next-line no-console
  .catch((err: Error) => console.error(err));
