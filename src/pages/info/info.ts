import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as moment from 'moment';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.plantData = this.navParams.get('plantData');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

}
