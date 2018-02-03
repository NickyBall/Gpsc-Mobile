import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { WorldPage } from '../world/world';
import { LoginServiceProvider } from '../../providers/login-service/login-service';

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
  resultCode: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginService: LoginServiceProvider) {
       this.loginService;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginClick() {
    if (this.username != null && this.password != null){
      this.authen(this.username, this.password);
    }
    else{
      alert("Username or Password must not be empty");
    }
  }

  authen(username: string, password: string){
    let Username = username;
    let Password = password;
    console.log("prepairParams:"+username+password);
    this.loginService.getAuthen(Username, Password).then(data =>{
      let response = JSON.stringify(data); // Convert {any} data to {string}
      let json = JSON.parse(response); // Convert Json string to JavaScript Key-Value Object
      console.log(json['ResultCode']);
      if (json['ResultCode'] == 200) {
        console.log(json['UserCode']);
        this.navCtrl.push(this.worldPage);
      } else {
        alert("Invalid Username or Password");
      }
    });

  }
  // authen(username: string, password: string) {
  //   if (username == 'admin' && password == '123456') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

}
