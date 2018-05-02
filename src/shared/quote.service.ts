import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

@Injectable()
export class QuoteService {
  API_ENDPOINT = 'https://talaikis.com/api/quotes/random/ ';

  constructor(public http: HttpClient) {
  }

  getMeAQuote() {
    return new Promise((resolve, reject) => {
      this.http.get(this.API_ENDPOINT)
        .subscribe((result) => {
          console.log(result);
          if (result) {
            resolve(result);
          }
        });
    })
  }
}
