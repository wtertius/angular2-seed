import './polyfills.browser';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import {enableProdMode} from '@angular/core';

export const platformRef = platformBrowserDynamic();

export function main() {
  if (process.env.NODE_ENV === "production") {
      enableProdMode();
  }

  return platformRef.bootstrapModule(AppModule)
    .catch(err => console.error(err));
}

// support async tag or hmr
switch (document.readyState) {
  case 'interactive':
  case 'complete':
    main();
    break;
  case 'loading':
  default:
    document.addEventListener('DOMContentLoaded', () => main());
}
