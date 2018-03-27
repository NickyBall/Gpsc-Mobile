import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class SharedService {

  BaseUrl: string;
  AccessToken: string;
  isRunOnDevice: boolean;

  // BluePrintList Picture form GetPlantInfo
  BluePrintPictureList: any;

  // Lastest Weather
  LastestWeather: any;

  // Capacity of Company
  CapacitySummary: any;

  constructor() {

    // this.BaseUrl = "http://pms-api-dev.azurewebsites.net/";
    this.BaseUrl = "https://gpscweb.pttgrp.com/GPSC-Plant-monitoring-API_Test/";
    this.isRunOnDevice = true;
  }
}
