import {Component} from '@angular/core';

import {EntryPage} from '../entry/entry';
import {RecordPage} from '../record/record';
import {HomePage} from '../home/home';
import {JobComponent} from "../jobs/job.component";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = JobComponent;
  tab3Root = RecordPage;

  constructor() {

  }
}
