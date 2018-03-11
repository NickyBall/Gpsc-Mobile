import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginServiceProvider{
    apiUrl = "http://pms-api-dev.azurewebsites.net/api/Authentication/Login";
    // apiUrl = "https://gpscweb.pttgrp.com/GPSC-Plant-monitoring-API_Test/api/Authentication/Login";
    constructor(public http: HttpClient) {
        console.log('Hello LoginServiceProvider');
      }
      getAuthen(Username, Password) {
        return new Promise((resolve, reject) => {
          this.http.post(this.apiUrl, 
            {
              Username: Username,
              Password: Password
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