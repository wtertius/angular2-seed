import { Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HustleComponent } from './hustle/hustle.component';
import { ContactComponent } from './contact/contact.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'hustle', pathMatch: 'full' },
  { path: 'hustle', component: HustleComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent }
];

