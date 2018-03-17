import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class DataService {
  db_url: string = 'https://askcleaner-admin.firebaseio.com';

  constructor(public http: HttpClient) {
  }

  postData(data) {
    return new Promise((resolve, reject) => {
      this.http.post(
        this.db_url + '/data.json',
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
        this.db_url + '/data.json',
      ).subscribe((response_data) => {
        console.log(response_data);
        resolve(response_data);
      }, (error) => {
        reject(error);
      });
    });
  }

  updateData(id, job_data) {
    return new Promise((resolve, reject) => {
      this.http.put(
        this.db_url + '/data/' + id + '.json',
        job_data
      ).subscribe((response_data) => {
        resolve(response_data);
      });
    });
  }

  deleteData(id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(
        this.db_url + '/data/' + id + '.json'
      ).subscribe((response_data) => {
        resolve(response_data);
      });
    });
  }
}
