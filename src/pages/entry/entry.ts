import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {Firebase} from "@ionic-native/firebase";
import {DataService} from "../../shared/data.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'page-entry',
  templateUrl: 'entry.html'
})
export class EntryPage implements OnInit {
  entry_form: FormGroup;

  constructor(public navCtrl: NavController, private firebase: Firebase, public dataService: DataService, public alertCtrl: AlertController) {
    this.entry_form = new FormGroup({
      client_name: new FormControl(null),
      mobile_number: new FormControl(null),
      address: new FormControl(null),
      order_date: new FormControl(null),
      order_completion_date: new FormControl(null),
      property_type: new FormControl(null),
      order_value: new FormControl(null),
      comments: new FormControl(null)
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.entry_form);
    if (this.entry_form.valid) {
      let request_data = this.entry_form.value;
      request_data['uid'] = this.getUniqueId();
      this.dataService.postData(request_data)
        .then((result_data) => {
          console.log(result_data);
          this.successAlert();
          this.entry_form.reset();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  successAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Data entered successfully',
      buttons: ['Cool !']
    });
    alert.present();
  }

  getUniqueId() {
    return 'RJX-' + new Date().valueOf();
  }

  onReset() {
    this.entry_form.reset();
  }
}
