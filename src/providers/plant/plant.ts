
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from '../SharedService';

/*
  Generated class for the PlantProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlantProvider {

  apiUrl: string;
  
  constructor(public http: HttpClient, public shared: SharedService) {
    console.log('Hello PlantProvider Provider');
    this.apiUrl =  this.shared.BaseUrl + 'api/PowerPlant/GetPlantInfo';
  }

  requestPlant(id){
    return new Promise(resolve => {
      this.http.post(this.apiUrl, 
        {
          PlantId: id
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
        // console.log(err);
      });
    });
  }

}
