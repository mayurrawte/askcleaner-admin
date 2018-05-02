import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {EntryPage} from '../pages/entry/entry';
import {RecordPage} from '../pages/record/record';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Firebase} from "@ionic-native/firebase";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {DataService} from "../shared/data.service";
import {NewJobsComponent} from "../pages/jobs/new/new.jobs.component";
import {JobComponent} from "../pages/jobs/job.component";
import {JobListComponent} from "../pages/jobs/list/job.list.component";
import {QuoteService} from "../shared/quote.service";

@NgModule({
  declarations: [
    MyApp,
    RecordPage,
    HomePage,
    TabsPage,
    EntryPage,
    JobComponent,
    JobListComponent,
    NewJobsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    RecordPage,
    HomePage,
    TabsPage,
    EntryPage,
    JobComponent,
    JobListComponent,
    NewJobsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Firebase,
    DataService,
    QuoteService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
