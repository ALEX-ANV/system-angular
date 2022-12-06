/// <amd-module name="main" />

import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import "@angular/compiler"

bootstrapApplication(AppComponent)  .catch(err => console.error(err));
