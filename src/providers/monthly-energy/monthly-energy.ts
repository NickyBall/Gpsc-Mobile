import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HourlyEnergyProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MonthlyEnergyProvider {

  apiUrl = 'http://pms-api-dev.azurewebsites.net/api/PowerPlant/GetMonthlyEnergyGen';
  constructor(public http: HttpClient) {
    console.log('Hello MonthlyEnergyProvider Provider');
  }

  requestMonthlyEnergy(id){
    return new Promise(resolve => {
      this.http.post(this.apiUrl, 
        {
          UserCode: "UserCode123456",
          CompanyId: id
        },
        {
          headers: {
            'Content-Type': 'application/json'
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