import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../SharedService';

/*
  Generated class for the CompanyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompanyProvider {

  apiUrl: string;
  constructor(public http: HttpClient, public shared: SharedService) {
    console.log('Hello CompanyProvider Provider');
    this.apiUrl = this.shared.BaseUrl + 'api/PowerPlant/GetPlantByCountry/';
  }

  getAllPlants(CountryId) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, {
          // UserCode: UserCode,
          CountryId: CountryId
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
