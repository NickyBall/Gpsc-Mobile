import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CompanyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CompanyProvider {

  apiUrl = 'http://pms-api-dev.azurewebsites.net/api/PowerPlant/GetPlantByCountry/';
  constructor(public http: HttpClient) {
    console.log('Hello CompanyProvider Provider');
  }

  getAllPlants(UserCode, CountryId) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl, {
          UserCode: UserCode,
          CountryId: CountryId
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
