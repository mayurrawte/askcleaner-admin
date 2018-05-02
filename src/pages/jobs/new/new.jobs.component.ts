import {Component, OnInit} from '@angular/core';
import {AlertController, NavParams, ViewController} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../shared/data.service";
import {PROPERTY_TYPES} from "../../../app/app.constants";

@Component({
  selector: 'page-job-new',
  templateUrl: './new.jobs.component.html'
})
export class NewJobsComponent implements OnInit {
  entry_form: FormGroup;
  update_mode: boolean = false;
  property_types = PROPERTY_TYPES;

  constructor(public dataService: DataService, public alertCtrl: AlertController, public viewCtrl: ViewController, public params: NavParams) {
    this.entry_form = new FormGroup({
      key: new FormControl(null),
      uid: new FormControl(null),
      client_name: new FormControl(null, [Validators.required]),
      mobile_number: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      order_date: new FormControl(null, [Validators.required]),
      order_completion_date: new FormControl(null),
      property_type: new FormControl(null, [Validators.required]),
      order_value: new FormControl(null, [Validators.required]),
      order_source: new FormControl(null, [Validators.required]),
      order_team: new FormControl(null),
      order_tip: new FormControl(null),
      comments: new FormControl(null),
      completed: new FormControl(null),
      order_again: new FormControl(null)
    });
  }

  ngOnInit() {
    let data = this.params.get('job');
    if (data) {
      if (!data['order_completion_date']) {
        data['order_completion_date'] = '';
      }
      if (!data['completed']) {
        data['completed'] = false;
      }
      if (!data['comments']) {
        data['comments'] = '';
      }
      if (!data['order_tip']) {
        data['order_tip'] = '';
      }
      if (!data['order_team']) {
        data['order_team'] = '';
      }
      if (!data['order_again']) {
        data['order_again'] = '';
      }
      this.entry_form.setValue(data);
      this.update_mode = true;
    }
  }


  onSubmit() {
    if (this.entry_form.valid) {
      let request_data = this.entry_form.value;
      if (this.update_mode) {
        this.viewCtrl.dismiss(request_data);
      } else {
        request_data['uid'] = this.dataService.getUniqueId();
        this.dataService.getUniqueId()
          .then((unique_id) => {
            request_data['uid'] = unique_id;
            this.dataService.postData(request_data)
              .then((result_data) => {
                this.successAlert();
                this.entry_form.reset();
                this.dataService.updateUniqueId();
              })
              .catch((error) => {
                console.log(error);
              });
          });
      }

    } else {
      console.log(this.entry_form);
      let alert = this.alertCtrl.create({
        title: 'Incomplete details',
        subTitle: 'Please fill in all the details',
        buttons: ['Dismiss']
      });
      alert.present();
    }
  }

  successAlert() {
    let alert = this.alertCtrl.create({
      title: 'Success',
      subTitle: 'Data entered successfully',
      buttons: ['Cool !']
    });
    alert.present();
    alert.onDidDismiss(() => {
      this.viewCtrl.dismiss();
    });
  }


  onReset() {
    this.entry_form.reset();
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
