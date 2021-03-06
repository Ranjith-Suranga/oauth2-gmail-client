import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import {MainComponent} from './main/main.component';
import {GmailService} from './service/gmail.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MyInterceptor} from './my-interceptor';
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {LoadersCssModule} from 'angular2-loaders-css';
import { ReadMailComponent } from './read-mail/read-mail.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MainComponent,
    ReadMailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PerfectScrollbarModule,
    LoadersCssModule
  ],
  providers: [
    GmailService,
    {provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true},
    {provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG}
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
