import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CountryServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CountryServiceProvider {

  apiUrl = 'http://pms-api-dev.azurewebsites.net/api/PowerPlant/GetAllCountry';
  constructor(public http: HttpClient) {
    console.log('Hello CountryServiceProvider Provider');
  }

  getAllCountry(UserCode) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, 
        {
          UserCode: UserCode
        }, 
        {
          headers: {
            'Content-Type': 'application/json'
          }
      }).subscribe(res => {
        resolve(res);
      }, (err) => {
        reject(err);
      })
    });
  }

}
