import {Component, OnInit} from '@angular/core';
import {AlertController, NavParams, ViewController} from 'ionic-angular';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../../shared/data.service";

@Component({
  selector: 'page-job-new',
  templateUrl: './new.jobs.component.html'
})
export class NewJobsComponent implements OnInit {
  entry_form: FormGroup;
  update_mode: boolean = false;

  constructor(public dataService: DataService, public alertCtrl: AlertController, public viewCtrl: ViewController, public params: NavParams) {
    this.entry_form = new FormGroup({
      uid: new FormControl(null),
      client_name: new FormControl(null, [Validators.required]),
      mobile_number: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      order_date: new FormControl(null, [Validators.required]),
      order_completion_date: new FormControl(null),
      property_type: new FormControl(null, [Validators.required]),
      order_value: new FormControl(null, [Validators.required]),
      comments: new FormControl(null),
      completed: new FormControl(null)
    });
  }

  ngOnInit() {
    let data = this.params.get('job');
    console.log(data);
    if (data) {
      if (!data['order_completion_date']) {
        data['order_completion_date'] = '';
      }
      if (!data['completed']) {
        data['completed'] = false;
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
        request_data['uid'] = this.getUniqueId();
        this.dataService.postData(request_data)
          .then((result_data) => {
            this.successAlert();
            this.entry_form.reset();
          })
          .catch((error) => {
            console.log(error);
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

  getUniqueId() {
    return 'RJX-' + new Date().valueOf();
  }

  onReset() {
    this.entry_form.reset();
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
