import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {QuoteService} from "../../shared/quote.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  todays_quote;

  constructor(public navCtrl: NavController, public quoteService: QuoteService) {
    this.quoteService.getMeAQuote()
      .then((result_data) => {
        this.todays_quote = result_data;
      });
  }

}
