import { Routes } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HustleSchemeComponent } from './hustle/hustle.scheme.component';
import { HustleElementsComponent } from './hustle/hustle.elements.component';
import { ContactComponent } from './contact/contact.component';

export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'hustle_scheme', pathMatch: 'full' },
  { path: 'hustle_scheme', component: HustleSchemeComponent },
  { path: 'hustle_elements', component: HustleElementsComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent }
];

