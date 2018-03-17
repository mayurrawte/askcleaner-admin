import {Component, OnInit} from '@angular/core';
import {NavController} from 'ionic-angular';
import {DataService} from "../../shared/data.service";

@Component({
  selector: 'page-record',
  templateUrl: 'record.html'
})
export class RecordPage implements OnInit {
  records: any;
  records_encrypted_keys = [];

  constructor(public navCtrl: NavController, public dataService: DataService) {
  }

  ngOnInit() {
    this.onGetRecords();
  }

  onGetRecords() {

  }
}
