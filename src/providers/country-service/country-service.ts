import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../SharedService';

/*
  Generated class for the CountryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CountryServiceProvider {

  apiUrl: string;
  constructor(public http: HttpClient, public shared: SharedService) {
    console.log('Hello CountryServiceProvider Provider');
    this.apiUrl = this.shared.BaseUrl + 'api/PowerPlant/GetAllCountry';
  }

  getAllCountry(AccessToken) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, 
        {
          // UserCode: UserCode
        }, 
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.shared.AccessToken
          }
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    });
  }

}
