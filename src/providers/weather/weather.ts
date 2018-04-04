import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherServiceProvider{
    appId = "&appid=9322366c87ce1ec0be478a7ed59fb417";
    //city = "q=Chanthaburi";
    unit = "&units=metric";
    // apiUrl = "http://api.openweathermap.org/data/2.5/weather?"
    // +this.city+this.appId+this.unit;
    apiUrl = "http://api.openweathermap.org/data/2.5/forecast?";
    //+this.city+this.appId+this.unit;
    //http://dataservice.accuweather.com/currentconditions/v1/2402925?apikey=7vsiJ74L43UG8veuB28gq1cWEDPxLr8X&language=en-us&details=true

    url ="";
    
    constructor(public http: HttpClient) {
        console.log('Hello WeatherServiceProvider');
      }
      getWeather(cityName) {
        if(cityName == "Ichinoseki"){
          this.url = "http://dataservice.accuweather.com/currentconditions/v1/2402925?apikey=7vsiJ74L43UG8veuB28gq1cWEDPxLr8X&language=en-us&details=true";
          console.log(this.url);
          return new Promise((resolve, reject) => {
            this.http.get(this.url).subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            })
          });
        }
        else if(cityName == "Chanthaburi"){
          this.url = "http://dataservice.accuweather.com/currentconditions/v1/317490?apikey=jGzygGfyqgIZQ2FFjOihAF9XjaOYpCwF&language=en-us&details=true";
          console.log(this.url);
          return new Promise((resolve, reject) => {
            this.http.get(this.url).subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            })
          });
        }
        else{
          return new Promise((resolve, reject) => {
            this.http.get(this.apiUrl+"q="+cityName+this.appId+this.unit).subscribe(res => {
              resolve(res);
            }, (err) => {
              reject(err);
            })
          });
        }
        // return new Promise((resolve, reject) => {
        //   this.http.get(this.apiUrl+"q="+cityName+this.appId+this.unit).subscribe(res => {
        //     resolve(res);
        //   }, (err) => {
        //     reject(err);
        //   })
        // });
      }
}