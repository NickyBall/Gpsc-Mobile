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
    console.log("home "+this.companyName);
    if(this.companyName == 'CHPP'){
      this.logo = "./assets/imgs/chpphead.png";
    }
    else{
      this.logo = "./assets/imgs/ichinosekihead.png";
    }
    // this.logo = 'http://pms-api-dev.azurewebsites.net/' + this.plantData.Result.PlantInfo.CompanyLogo;
    //this.logo = 'assets/imgs/CHPP.png';
    let temp = this.plantData.Result.PlantInfo.Capacity;
    temp /= 1000000;
    this.power = Math.round(temp);

    this.nativeGeocoder.reverseGeocode(this.plantData.Result.Location.Lat, this.plantData.Result.Location.Lng)
          .then((result: NativeGeocoderReverseResult) => {
            this.locationName = result.administrativeArea + ', ' + result.countryName;

          })
          .catch((error: any) => console.log(error));

    let ppaYear = moment(this.plantData.Result.PlantInfo.PPA).year();
    let codYear = moment(this.plantData.Result.PlantInfo.COD).year();
    let ppaYearNow = moment().year();
    let diffYear = ppaYear - codYear;
    this.ppaData = diffYear + ' Years (End ' + ppaYear + ')';
    console.log(diffYear);

    this.pic1 = 'assets/imgs/plantInfo/pic2.png';
    this.pic2 = 'assets/imgs/plantInfo/pic1.png';
    this.pic3 = 'assets/imgs/plantInfo/pic4.png';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

  ionViewWillEnter(){
    console.log("setting BtText");
    this.viewCtrl.setBackButtonText('');
  }
}
