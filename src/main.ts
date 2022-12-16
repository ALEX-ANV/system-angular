/// <amd-module name="main" />

import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import "@angular/compiler";
import { importProvidersFrom } from '@angular/core'

bootstrapApplication(AppComponent, {
    providers: []
})  .catch(err => console.error(err));
