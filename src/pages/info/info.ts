import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private nativeGeocoder: NativeGeocoder) {
    this.plantData = this.navParams.get('plantData');
    console.log(this.plantData);
    this.logo = 'http://pms-api-dev.azurewebsites.net/' + this.plantData.Result.PlantInfo.CompanyLogo;
    let temp = this.plantData.Result.PlantInfo.Capacity;
    temp /= 1000000;
    this.power = Math.round(temp);

    this.nativeGeocoder.reverseGeocode(this.plantData.Result.Location.Lat, this.plantData.Result.Location.Lng)
          .then((result: NativeGeocoderReverseResult) => {
            this.locationName = result.administrativeArea
          })
          .catch((error: any) => console.log(error));

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

}
