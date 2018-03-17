import {Component, OnInit} from '@angular/core';
import {ModalController, NavController} from 'ionic-angular';
import {DataService} from "../../shared/data.service";
import {NewJobsComponent} from "./new/new.jobs.component";

@Component({
  selector: 'page-job-main',
  templateUrl: './job.component.html'
})
export class JobComponent implements OnInit {

  jobs_firebase_data: any;
  jobs_keys = [];
  jobs = [];

  constructor(public navCtrl: NavController, public dataService: DataService, public modalCtrl: ModalController) {
  }

  ngOnInit() {
    this.getAllJobs();
  }

  doRefresh(refresher) {
    this.getAllJobs();
    refresher.complete();
  }

  getAllJobs() {
    this.dataService.getData()
      .then((data) => {
        if (data) {
          this.jobs_firebase_data = data;
          this.jobs_keys = Object.getOwnPropertyNames(this.jobs_firebase_data);
          this.jobs = [];
          for (let key of this.jobs_keys) {
            this.jobs.push(this.jobs_firebase_data[key]);
          }
        } else {
          this.jobs = [];
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  addNewJob() {
    let profileModal = this.modalCtrl.create(NewJobsComponent);
    profileModal.present();
    profileModal.onDidDismiss(() => {
      this.getAllJobs();
    })
  }

  deleteJob(index) {
    const id = this.jobs_keys[index];
    this.dataService.deleteData(id)
      .then((result) => {
        this.getAllJobs();
      });
  }

  updateJob(event_data) {
    console.log(event_data);
    const key = this.jobs_keys[event_data.index];
    this.dataService.updateData(key, event_data.job_data)
      .then((result_data) => {
        console.log('updated');
        console.log(result_data);
      });
  }
}
