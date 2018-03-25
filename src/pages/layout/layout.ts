import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LayoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-layout',
  templateUrl: 'layout.html',
})
export class LayoutPage {

  plantData: any;
  logo: string;
  companyName: string = undefined;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController) {

    this.viewCtrl = viewCtrl;


    this.plantData = this.navParams.get('plantData');
    this.logo = "https://gpscweb.pttgrp.com/GPSC-Plant-monitoring-API_Test/" + this.plantData.Result.PlantInfo.CompanyLogo;
    // this.logo = 'http://pms-api-dev.azurewebsites.net/' + this.plantData.Result.PlantInfo.CompanyLogo;
    //this.logo = 'assets/imgs/CHPP.png'
    this.companyName = this.plantData.Result.PlantInfo.CompanyName;
    console.log("home "+this.companyName);
    // if(this.companyName == 'CHPP'){
    //   this.logo = "./assets/imgs/chpphead.png";
    // }
    // else{
    //   this.logo = "./assets/imgs/ichinosekihead.png";
    // }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LayoutPage');
  }
  
  ionViewWillEnter(){
    console.log("setting BtText");
    this.viewCtrl.setBackButtonText('');
  }
}
