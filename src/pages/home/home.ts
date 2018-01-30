import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { LayoutPage } from '../layout/layout';
import { SummaryPage } from '../summary/summary';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  infoPage = InfoPage;
  layoutPage = LayoutPage;
  summaryPage = SummaryPage;

  plantData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.plantData = this.navParams.get('plantData');
  }

  changePage(page) {
    var nextPage;
    switch (page) {
      case 1:
        nextPage = this.infoPage;
        break;
      case 2:
        nextPage = this.layoutPage;
        break;
      case 3:
        nextPage = this.summaryPage;
        break;
    }
    this.navCtrl.push(nextPage, {
      plantData: this.plantData
    });
  }

}
