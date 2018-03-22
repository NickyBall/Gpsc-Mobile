import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
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
  
  icon1: string = undefined;
  icon2: string = undefined;
  icon3: string = undefined;
  cardColor1: string = undefined;
  cardColor2: string = undefined;
  cardColor3: string = undefined;
  plantData: any;
  companyName: string = undefined;
  logo: string = undefined;
  fontColor1: string = undefined;
  fontColor2: string = undefined;
  fontColor3: string = undefined;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public plantProvider: PlantProvider,
              public viewCtrl:ViewController) {

    let id = this.navParams.get('plantId');
    // let id = 5;
    
    this.viewCtrl = viewCtrl;

    this.plantProvider.requestPlant(id)
    .then(data => {
     
      this.plantData = data;
      this.companyName = this.plantData.Result.PlantInfo.CompanyName;
      console.log("home "+this.companyName);
      //this.logo = 'http://pms-api-dev.azurewebsites.net/' + this.plantData.Result.PlantInfo.CompanyLogo;
      //this.logo = 'assets/imgs/CHPP.png'
      if(this.companyName == 'CHPP'){
        this.logo = "./assets/imgs/chpphead.png";
      }
      else if(this.companyName == 'ICHINOSEKI'){
        this.logo = "./assets/imgs/ichinosekihead.png";
      }
    }); 
  }

  ionViewDidLoad() {
    // if(this.companyName == 'CHPP'){
    //   this.logo = "./assets/imgs/chpphead.png";
    // }
    // else if(this.companyName == 'ICHINOSEKI'){
    //   this.logo = "./assets/imgs/ichinosekihead.png";
    // }

    this.icon1 = "assets/imgs/b1.png";
    this.icon2 = "assets/imgs/b3.png";
    this.icon3 = "assets/imgs/b5.png";
    this.cardColor1 = '#ffffff';
    this.cardColor2 = '#ffffff';
    this.cardColor3 = '#ffffff';
    this.fontColor1 = '#afafaf';
    this.fontColor2 = '#afafaf';
    this.fontColor3 = '#afafaf';
  }

  ionViewWillEnter(){
    console.log("setting BtText");
    this.viewCtrl.setBackButtonText('');
    
    this.icon1 = "assets/imgs/b1.png";
    this.icon2 = "assets/imgs/b3.png";
    this.icon3 = "assets/imgs/b5.png";
    this.cardColor1 = '#ffffff';
    this.cardColor2 = '#ffffff';
    this.cardColor3 = '#ffffff';
    this.fontColor1 = '#afafaf';
    this.fontColor2 = '#afafaf';
    this.fontColor3 = '#afafaf';
  }

  changePage(page) {
    var nextPage;
    
    
    switch (page) {
      case 1:
        this.cardColor1 = '#75a0e5';
        this.fontColor1 = '#ffffff'; 
        this.icon1 = "assets/imgs/b2.png"; 
        nextPage = this.infoPage;
        break;
      case 2:
        this.cardColor2 = '#75a0e5';
        this.fontColor2 = '#ffffff'; 
        this.icon2 = "assets/imgs/b4.png"; 
        nextPage = this.layoutPage;
        break;
      case 3:
        this.cardColor3 = '#75a0e5';
        this.fontColor3 = '#ffffff'; 
        this.icon3 = "assets/imgs/b6.png"; 
        nextPage = this.summaryPage;
        break;
    }
    this.navCtrl.push(nextPage, {
      plantData: this.plantData
    });
  }

}
