import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class WeatherServiceProvider{
    appId = "&appid=9322366c87ce1ec0be478a7ed59fb417";
    city = "q=Bangkok";
    unit = "&units=metric";
    // apiUrl = "http://api.openweathermap.org/data/2.5/weather?"
    // +this.city+this.appId+this.unit;
    apiUrl = "http://api.openweathermap.org/data/2.5/forecast?"
    +this.city+this.appId+this.unit;
    
    constructor(public http: HttpClient) {
        console.log('Hello WeatherServiceProvider');
      }
      getWeather() {
        return new Promise((resolve, reject) => {
          this.http.get(this.apiUrl).subscribe(res => {
            resolve(res);
          }, (err) => {
            reject(err);
          })
        });
      }
}