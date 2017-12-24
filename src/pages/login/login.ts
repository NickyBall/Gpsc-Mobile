import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { WorldPage } from '../world/world';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  worldPage = WorldPage;
  username: '';
  password: '';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginClick() {
    if (this.authen(this.username, this.password)) {
      this.navCtrl.push(this.worldPage);
    }
  }

  authen(username: string, password: string) {
    if (username == 'admin' && password == '123456') {
      return true;
    } else {
      return false;
    }
  }

}
