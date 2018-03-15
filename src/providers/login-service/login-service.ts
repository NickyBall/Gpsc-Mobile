import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SharedService } from '../SharedService';

@Injectable()
export class LoginServiceProvider{
    apiUrl: string;
    //apiUrl = "https://gpscweb.pttgrp.com/GPSC-Plant-monitoring-API_Test/api/Authentication/Login";
    constructor(public http: HttpClient, private sharedService: SharedService) {
        console.log('Hello LoginServiceProvider');
        this.apiUrl = sharedService.BaseUrl + "api/Authentication/Login";
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