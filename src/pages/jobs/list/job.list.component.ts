import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {AlertController, ModalController, NavController} from 'ionic-angular';
import {NewJobsComponent} from "../new/new.jobs.component";

@Component({
  selector: 'page-job-list',
  templateUrl: './job.list.component.html'
})
export class JobListComponent implements OnInit, OnChanges {
  @Input() jobs;
  @Output() deleteJobEmitter: EventEmitter<any> = new EventEmitter();
  @Output() updateJobEmitter: EventEmitter<any> = new EventEmitter();
  completed_jobs;
  active_jobs;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public alertCtrl: AlertController) {
  }

  ngOnInit() {
    this.processJobsList();
  }

  ngOnChanges() {
    this.processJobsList();
  }

  resetPrevJobs() {
    this.completed_jobs = [];
    this.active_jobs = [];
  }

  processJobsList() {
    this.resetPrevJobs();
    for (let job of this.jobs) {
      if (job.completed) {
        this.completed_jobs.push(job);
      } else {
        this.active_jobs.push(job)
      }
    }
  }

  updateJob(index, job) {
    let profileModal = this.modalCtrl.create(NewJobsComponent, {'job': job});
    profileModal.present();
    profileModal.onDidDismiss((result) => {
      if (result) {
        this.updateJobEmitter.emit({index: index, job_data: result});
      }
    });
  }

  deleteJob(index) {
    this.confirmDelete(index);
  }

  confirmDelete(index) {
    let alert = this.alertCtrl.create({
      title: 'Delete',
      message: 'Do you really want to delete this job?',
      buttons: [
        {
          text: 'Yes boss',
          role: 'cancel',
          handler: () => {
            this.deleteJobEmitter.emit(index);
          }
        },
        {
          text: 'Nope ! Just kidding ',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }
}
