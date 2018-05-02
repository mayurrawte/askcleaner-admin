import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {DB_URL} from "../app/app.constants";

@Injectable()
export class DataService {
  db_url: string = DB_URL;
  meta;
  next_job_number: number;

  constructor(public http: HttpClient) {
    this.initApp();
  }

  initApp() {
    this.http.get(this.db_url + 'config.json')
      .subscribe((meta) => {
        this.meta = meta;
      })
  }

  postData(data) {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.db_url + 'data.json',
        data
      ).subscribe((response_data) => {
        resolve(response_data);
        console.log(response_data);
      }, (error) => {
        reject(error);
        console.log(error);
      })
    });
  }

  getData() {
    return new Promise((resolve, reject) => {
      this.http.get(
        this.db_url + 'data.json',
      ).subscribe((response_data) => {
        console.log(response_data);
        resolve(response_data);
      }, (error) => {
        reject(error);
      });
    });
  }

  getUniqueId() {
    return new Promise((resolve, reject) => {
      this.http.get(
        this.db_url + 'config/job_id.json'
      ).subscribe((response_data: any) => {
        this.next_job_number = response_data.next_job_number;
        resolve(response_data.job_id_prefix + response_data.next_job_number + response_data.job_id_suffix);
      });
    });
  }

  updateUniqueId() {
    return new Promise((resolve, reject) => {
      this.http.put(this.db_url + 'config/job_id/next_job_number.json', this.next_job_number + 1)
        .subscribe((response_data) => {
          console.log('updated next job');
        });
    });
  }

  updateData(id, job_data) {
    return new Promise((resolve, reject) => {
      this.http.put(
        this.db_url + 'data/' + id + '.json',
        job_data
      ).subscribe((response_data) => {
        resolve(response_data);
      });
    });
  }

  deleteData(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(
        this.db_url + 'data/' + id + '.json'
      ).subscribe((response_data) => {
        resolve(response_data);
      });
    });
  }
}
