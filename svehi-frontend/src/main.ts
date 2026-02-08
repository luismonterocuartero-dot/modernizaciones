import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { appConfig } from './app/app.config';

console.log('Main.ts starting... - DEBUG');

bootstrapApplication(App, appConfig).catch(err => {
  console.error('Bootstrap error:', err);
  document.body.innerHTML = 'Bootstrap Error: ' + err;
});
