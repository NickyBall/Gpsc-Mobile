import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { LayoutPage } from '../layout/layout';
import { SummaryPage } from '../summary/summary';
import { PlantProvider } from '../../providers/plant/plant';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  infoPage = InfoPage;
  layoutPage = LayoutPage;
  summaryPage = SummaryPage;

  plantData: any;
  companyName: string = undefined;
  logo: string = undefined;

  constructor(public navCtrl: NavController, public navParams: NavParams, public plantProvider: PlantProvider) {
    let id = this.navParams.get('plantId');
    this.plantProvider.requestPlant(id)
    .then(data => {
      this.plantData = data;
      this.companyName = this.plantData.PlantInfo.CompanyName;
      this.logo = this.plantData.PlantInfo.CompanyLogo;
    });
    
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
