import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {DB_URL} from "../app/app.constants";

@Injectable()
export class InitService {
  db_url = DB_URL;
  meta = {};

  constructor(public http: HttpClient) {
    this.initialize();
  }

  initialize() {
    this.http.get(this.db_url + '/config.json')
      .subscribe((meta) => {
        this.meta = meta;
      })
  }
}
