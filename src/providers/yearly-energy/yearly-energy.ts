import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../SharedService';

/*
  Generated class for the HourlyEnergyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class YearlyEnergyProvider {

  apiUrl: string;
  constructor(public http: HttpClient, public shared: SharedService) {
    console.log('Hello YearlyEnergyProvider Provider');
    this.apiUrl = this.shared.BaseUrl + 'api/PowerPlant/GetYearlyEnergyGen';
  }

  requestYearlyEnergy(id){
    return new Promise(resolve => {
      this.http.post(this.apiUrl, 
        {
          CompanyId: id
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.shared.AccessToken
          }
        }
      ).subscribe(res =>{
        resolve(res);
        // console.log(res);
      }, err => {
        console.log(err);
      });
    });
  }

}
