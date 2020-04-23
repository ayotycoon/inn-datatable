import { DatatableModule } from '../lib/index';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DatatableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
