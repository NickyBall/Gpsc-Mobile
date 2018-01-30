
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/*
  Generated class for the PlantProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlantProvider {

  apiUrl = 'http://pms-api-dev.azurewebsites.net/api/PowerPlant/GetPlantInfo';
  
  constructor(public http: HttpClient) {
    console.log('Hello PlantProvider Provider');
  }

  requestPlant(id){
    return new Promise(resolve => {
      this.http.post(this.apiUrl, 
        {
          UserCode: "UserCode123456",
          PlantId: id
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).subscribe(res =>{
        resolve(res);
        console.log(res);
      }, err => {
        console.log(err);
      });
    })
  }

}
