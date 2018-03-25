import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';
import { NativeGeocoder, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  private plantData: any;
  private power: number = undefined;
  private locationName: string = undefined;
  private logo: string = undefined;
  private ppaData: any = undefined;
  companyName: string = undefined;
  private pic1: string = undefined;
  private pic2: string = undefined;
  private pic3: string = undefined;
  private pic4: string = undefined;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private nativeGeocoder: NativeGeocoder,
    public viewCtrl:ViewController) {

    this.viewCtrl = viewCtrl;

    this.plantData = this.navParams.get('plantData');

    this.companyName = this.plantData.Result.PlantInfo.CompanyName;

    this.logo = "https://gpscweb.pttgrp.com/GPSC-Plant-monitoring-API_Test/" + this.plantData.Result.PlantInfo.CompanyLogo;
    this.pic1 = "https://gpscweb.pttgrp.com/GPSC-Plant-monitoring-API_Test/" + this.plantData.Result.PlantInfo.GeneralInfoImages[0];
    this.pic2 = "https://gpscweb.pttgrp.com/GPSC-Plant-monitoring-API_Test/" + this.plantData.Result.PlantInfo.GeneralInfoImages[1];
    this.pic3 = "https://gpscweb.pttgrp.com/GPSC-Plant-monitoring-API_Test/" + this.plantData.Result.PlantInfo.GeneralInfoImages[2];

    let temp = this.plantData.Result.PlantInfo.Capacity;
    temp /= 1000000;
    // this.power = Math.round(temp);
    this.power = temp;

    // this.nativeGeocoder.reverseGeocode(this.plantData.Result.Location.Lat, this.plantData.Result.Location.Lng)
    //       .then((result: NativeGeocoderReverseResult) => {
    //         this.locationName = result.administrativeArea + ', ' + result.countryName;

    //       })
    //       .catch((error: any) => console.log(error));
    this.locationName = this.plantData.Result.PlantLocation;

    let ppaYear = moment(this.plantData.Result.PlantInfo.PPA).year();
    let codYear = moment(this.plantData.Result.PlantInfo.COD).year();
    let ppaYearNow = moment().year();
    let diffYear = ppaYear - codYear;
    this.ppaData = diffYear + ' Years (End ' + ppaYear + ')';

  }

  ionViewWillEnter(){
    console.log("setting BtText");
    this.viewCtrl.setBackButtonText('');
  }
}
