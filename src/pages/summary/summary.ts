import { Component, ViewChild } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Chart } from 'chart.js';
import * as HighCharts from 'highcharts';
import * as moment from 'moment';
import * as HighchartsMore from 'highcharts/highcharts-more';
import { WeatherServiceProvider } from '../../providers/weather/weather';
import { HourlyEnergyProvider } from '../../providers/hourly-energy/hourly-energy';
import { DailyEnergyProvider } from '../../providers/daily-energy/daily-energy';
import { MonthlyEnergyProvider } from '../../providers/monthly-energy/monthly-energy';
import { YearlyEnergyProvider } from '../../providers/yearly-energy/yearly-energy';
import { SharedService } from '../../providers/SharedService';
import { now } from 'moment';

HighchartsMore(HighCharts);

@IonicPage()
@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {

  @ViewChild('hourlyCanvas') hourlyCanvas;
  @ViewChild('dailyCanvas') dailyCanvas;
  @ViewChild('monthlyCanvas') monthlyCanvas;
  @ViewChild('yearlyCanvas') yearlyCanvas;

  selectedSection = 'powerGenerationTab';
  selectedEnergySection = 'hourlyTab';

  powerChart: any;
  powerData: any;
  powerOnGraph: number;
  powerIcon: string;
  powerMax: number;
  powerMin: number;
  powerScale: number;

  irradiationChart: any;
  irradiationData: any;
  irradiationOnGraph: number;
  irradiationIcon: string;
  irradiationMax: number;
  irradiationMin: number;
  irradiationScale: number;
  private leftposition: string;
  private topposition: string;
  private valueScaleDown: string;
  private unitScaleDown: string;

  ambientTemperatureChart: any;
  ambientTempData: any;
  ambientTempOnGraph: number;
  ambientIcon: string;
  ambientMax: number;
  ambientMin: number;
  ambientScale: number;

  hourlyMax: number;
  hourlyMin: number;
  hourlyScale: number;

  dailyMax: number;
  dailyMin: number;
  dailyScale: number;

  monthlyMax: number;
  monthlyMin: number;
  monthlyScale: number;

  yearlyMax: number;
  yearlyMin: number;
  yearlyScale: number;

  hourly: any;
  hourlyData: any;
  dialy: any;
  dialyData: any;
  monthly: any;
  monthlyData: any;
  yearly: any;
  yearlyData: any;

  generationSummaryChart: any;
  generationSummaryData: any;
//   summaryToday: number = 234432
//   summaryMTDActual: number = 7654098;
//   summaryMTDPlan: number = 10000000;
//   summaryYTDActual: number = 18324394;
//   summaryYTDPlan: number = 20000000;
  summaryToday: any;
  summaryMTDActual: any;
  summaryMTDPlan: any;
  summaryYTDActual: any;
  summaryYTDPlan: any;

  cityName: any;
  currentTemp: any;
  stringCurrent: any;
  maxTemp: any;
  minTemp: any;
  weatherDescription: any;
  currentDay: any;
  dayList: any;
  futureDay1Name: any;
  futureDay1Temp: any;
  futureDay1minT: any;
  futureDay1maxT: any;
  futureDay1Icon: any;
  futureDay2Name: any;
  futureDay2Temp: any;
  futureDay2minT: any;
  futureDay2maxT: any;
  futureDay2Icon: any;
  futureDay3Name: any;
  futureDay3Temp: any;
  futureDay3minT: any;
  futureDay3maxT: any;
  futureDay3Icon: any;
  futureDay4Name: any;
  futureDay4Temp: any;
  futureDay4minT: any;
  futureDay4maxT: any;
  futureDay4Icon: any;
  minTempList: any;
  maxTempList: any;
  currentTime: any;
  currentDate: any;
  lastestUpdate: any;
  lastestUpdateTime: any;
  timezoneApi: any;
  futureList:any;
  testArr: any[];
  currentIconWeather: any;
  todayDateGeneration: any;

  loader: any;

  logo: string = undefined;
  plantData: any;
  companyName: string = undefined;

  constructor(public navCtrl: NavController,
            public navParams: NavParams,
            public weatherServiceProvider: WeatherServiceProvider,
            public hourlyEnergyProvider: HourlyEnergyProvider,
            public dailyEnergyProvider: DailyEnergyProvider,
            public monthlyEnergyProvider: MonthlyEnergyProvider,
            public yearlyEnergyProvider: YearlyEnergyProvider,
            public loadingCtrl: LoadingController,
            public viewCtrl:ViewController,
            public shared: SharedService) {
                
                this.viewCtrl = viewCtrl;
                this.loader = this.loadingCtrl.create({
                    content: "Loading..."
                  });
                this.loader.present();
                this.plantData = this.navParams.get('plantData');
                console.log('data', this.plantData);
                this.logo = "https://gpscweb.pttgrp.com/GPSC-Plant-monitoring-API_Test/" + this.plantData.Result.PlantInfo.CompanyLogo;
                // this.logo = 'http://pms-api-dev.azurewebsites.net/' + this.plantData.Result.PlantInfo.CompanyLogo;
                //this.logo = 'assets/imgs/CHPP.png'
                this.companyName = this.plantData.Result.PlantInfo.CompanyName;
                console.log("testPT");
                console.log(this.plantData.Result);
                console.log("endtestPT")

                // console.log("cityName is:"+this.companyName);
                if(this.companyName == 'CHPP'){
                //   this.logo = "./assets/imgs/chpphead.png";
                  this.cityName = "Chanthaburi"
                  //this.currentDate = new Date(this.plantData.Result.UpdatedAt);
                  //this.currentDate = new Date();
                  this.lastestUpdate = new Date((this.plantData.Result.UpdatedAt).toString().substring(0,10));
                  this.todayDateGeneration = new Date((this.plantData.Result.UpdatedAt).toString().substring(0,10));
                  this.todayDateGeneration.setHours(0);
                  this.todayDateGeneration.setMinutes(0);
                  this.todayDateGeneration.setSeconds(0);
                  this.timezoneApi = this.plantData.Result.TimeZone;
                  //console.log("currentDate:"+this.currentDate);
                  this.lastestUpdateTime = (this.plantData.Result.UpdatedAt).toString().substring(11,19);
                  console.log("lastestTime:"+this.plantData.Result.UpdatedAt);
                  console.log("lastestUpdate:"+this.lastestUpdate);
                  console.log(this.timezoneApi);
                }
                else if(this.companyName == 'ICHINOSEKI'){
                //   this.logo = "./assets/imgs/ichinosekihead.png";
                  this.cityName = "Ichinoseki"
                  //this.currentDate = new Date(this.plantData.Result.UpdatedAt);
                  //this.currentDate.setHours(this.currentDate.getHours()+2);
                  //this.currentDate = new Date();
                  //this.currentDate.setUTCHours(17);
                  //this.currentDate.setHours(this.currentDate.getHours()+2);
                  this.lastestUpdate = new Date((this.plantData.Result.UpdatedAt).toString().substring(0,10));
                  this.todayDateGeneration = new Date((this.plantData.Result.UpdatedAt).toString().substring(0,10));
                  this.todayDateGeneration.setHours(0);
                  this.todayDateGeneration.setMinutes(0);
                  this.todayDateGeneration.setSeconds(0);
                  //this.lastestUpdate.setHours(this.lastestUpdate.getHours()+2);
                  this.timezoneApi = this.plantData.Result.TimeZone;
                  //console.log("currentDate:"+this.currentDate);
                  this.lastestUpdateTime = (this.plantData.Result.UpdatedAt).toString().substring(11,19);
                  console.log("lastestTime:"+this.plantData.Result.UpdatedAt);
                  console.log("lastestUpdate:"+this.lastestUpdate);
                  console.log(this.timezoneApi);
                }

                let id = this.plantData.Result.PlantId;

                this.hourlyEnergyProvider.requestHourlyEnergy(id)
                    .then(data => {
                        this.hourlyData = data;
                        console.log("callHourlyProviderxxx");
                    }).catch(error => {
                        console.log(error);
                    });

                this.dailyEnergyProvider.requestDailyEnergy(id)
                .then(data => {
                    this.dialyData = data;
                    console.log("callDailyProviderxxx");
                }).catch(error => {
                    console.log("callDailyProviderCatch");
                    console.log(error);
                });

                this.monthlyEnergyProvider.requestMonthlyEnergy(id)
                .then(data => {
                    this.monthlyData = data;
                    console.log("callMonthlyProviderxxx");
                }).catch(error => {
                    console.log(error);
                });

                this.yearlyEnergyProvider.requestYearlyEnergy(id)
                .then(data => {
                    this.yearlyData = data;
                    console.log("callYearlyProviderxxx");
                }).catch(error => {
                    console.log(error);
                });
                
                this.powerIcon = "assets/imgs/Elect.png";
                this.irradiationIcon = "assets/imgs/Sun.png";
                this.ambientIcon = "assets/imgs/Temp.png";
                this.loader.dismiss(); 
  }

  ionViewWillEnter(){
    console.log("setting BtText");
    this.viewCtrl.setBackButtonText('');
  }

//   ionViewDidLoad(){
    //   this.loader.present();
    //   this.getWeather();
    //   this.generationSummary();
    //   console.log("daily foreach");
    //   console.log(this.dialyData.Result);
//   }

//   ionViewDidEnter() {
    ionViewDidLoad(){
    

    this.powerGenGraph();
    // this.hourlyGraph(1);
    this.powerData = parseFloat(this.plantData.Result.PowerGen)/parseInt(this.plantData.Result.UnitScale);
    
    //this.powerData = Math.floor(parseFloat(this.shared.CapacitySummary) / 100000) / 10;
    // this.irradiationData = Math.floor(parseFloat(this.plantData.Result.Irradiation) / 100000) / 10;
    //this.irradiationData = parseFloat(this.plantData.Result.Irradiation).toFixed(1);
    this.powerMax = parseInt(this.plantData.Result.PowerGenPeriod.Max);
    this.powerMin = parseInt(this.plantData.Result.PowerGenPeriod.Min);
    this.powerScale = parseInt(this.plantData.Result.PowerGenPeriod.Scale);
    this.powerOnGraph = parseFloat(this.powerData.toFixed(1));
    console.log("powerOnGraph" + this.powerOnGraph);
    
    if (this.powerData > this.powerMax) this.powerOnGraph = this.powerMax;
    else if (this.powerData < this.powerMin) this.powerOnGraph = this.powerMin;

    this.irradiationData = parseFloat(this.plantData.Result.Irradiation);
    this.irradiationMax = parseInt(this.plantData.Result.IrradiationPeriod.Max);
    this.irradiationMin = parseInt(this.plantData.Result.IrradiationPeriod.Min);
    this.irradiationScale = parseInt(this.plantData.Result.IrradiationPeriod.Scale);
    this.irradiationOnGraph = parseFloat(this.irradiationData.toFixed(1));
    if (this.irradiationData > this.irradiationMax) this.irradiationOnGraph = this.irradiationMax;
    else if (this.irradiationData < this.irradiationMin) this.irradiationOnGraph = this.irradiationMin;

    this.ambientTempData = this.plantData.Result.AMB_Temp;
    this.ambientMax = parseInt(this.plantData.Result.AMB_TempPeriod.Max);
    this.ambientMin = parseInt(this.plantData.Result.AMB_TempPeriod.Min);
    this.ambientScale = parseInt(this.plantData.Result.AMB_TempPeriod.Scale);
    this.ambientTempOnGraph = parseFloat(this.ambientTempData.toFixed(1));
    if (this.ambientTempData > this.ambientMax) this.ambientTempOnGraph = this.ambientMax;
    else if (this.ambientTempData < this.ambientMin) this.ambientTempOnGraph = this.ambientMin;

    this.hourlyMax = parseInt(this.plantData.Result.HourlyPeriod.Max);
    this.hourlyMin = parseInt(this.plantData.Result.HourlyPeriod.Min);
    this.hourlyScale = parseInt(this.plantData.Result.HourlyPeriod.Scale);

    this.dailyMax = parseInt(this.plantData.Result.DailyPeriod.Max);
    this.dailyMin = parseInt(this.plantData.Result.DailyPeriod.Min);
    this.dailyScale = parseInt(this.plantData.Result.DailyPeriod.Scale);

    this.monthlyMax = parseInt(this.plantData.Result.MonthlyPeriod.Max);
    this.monthlyMin = parseInt(this.plantData.Result.MonthlyPeriod.Min);
    this.monthlyScale = parseInt(this.plantData.Result.MonthlyPeriod.Scale);

    this.yearlyMax = parseInt(this.plantData.Result.YearlyPeriod.Max);
    this.yearlyMin = parseInt(this.plantData.Result.YearlyPeriod.Min);
    this.yearlyScale = parseInt(this.plantData.Result.YearlyPeriod.Scale);

    this.getWeather();
    //this.generationSummary();
    
  }
  getWeather(){
    console.log("getWeather");
    
    //#region Current Weather
    //console.log(this.shared.LastestWeather);
    let response = JSON.stringify(this.shared.LastestWeather); // Convert {any} data to {string}
    let json = JSON.parse(response); // Convert Json string to JavaScript Key-Value Object
    let jsonfinal = JSON.parse(json);
    //console.log(this.currentDate);
    console.log((jsonfinal[0]['LocalObservationDateTime']).toString().substring(0,10));
    this.currentDate = new Date((jsonfinal[0]['LocalObservationDateTime']).toString().substring(0,10));
    this.currentTime = (jsonfinal[0]['LocalObservationDateTime']).toString().substring(11,16);

    let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"];
    let weekdaysBig = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY",
        "THURSDAY", "FRIDAY", "SATURDAY"];
    //console.log(this.currentDate.getDay());
    this.currentDay = weekdaysBig[this.currentDate.getDay()];

    //console.log(jsonfinal[0]['Temperature']['Metric']['Value']);
    this.currentTemp = parseInt(jsonfinal[0]['Temperature']['Metric']['Value']);
    //console.log(jsonfinal[0]['WeatherIcon']);
    this.currentIconWeather = jsonfinal[0]['WeatherIcon']
    //console.log(jsonfinal[0]['WeatherText']);
    this.weatherDescription = jsonfinal[0]['WeatherText']
    //console.log(jsonfinal[0]['TemperatureSummary']['Past6HourRange']['Minimum']['Metric']['Value']);
    this.minTemp = parseInt(jsonfinal[0]['TemperatureSummary']['Past6HourRange']['Minimum']['Metric']['Value']);
    //console.log(jsonfinal[0]['TemperatureSummary']['Past6HourRange']['Maximum']['Metric']['Value']);
    this.maxTemp = parseInt(jsonfinal[0]['TemperatureSummary']['Past6HourRange']['Maximum']['Metric']['Value']);
    //#endregion

    //#region Forecast Weather
    let responseForecast = JSON.stringify(this.shared.ForeCastWeather); // Convert {any} data to {string}
    let jsonForecast = JSON.parse(responseForecast); // Convert Json string to JavaScript Key-Value Object
    let jsonfinalForcast = JSON.parse(jsonForecast);
    //console.log(jsonfinalForcast);

    // Day1
    this.futureDay1minT = jsonfinalForcast['DailyForecasts'][1]['Temperature']['Minimum']['Value']
    this.futureDay1maxT = jsonfinalForcast['DailyForecasts'][1]['Temperature']['Maximum']['Value']
    this.futureDay1Temp = (this.futureDay1maxT+this.futureDay1minT)/2;
    this.futureDay1Temp = parseInt(this.futureDay1Temp);
    let forecastday1 = new Date(jsonfinalForcast['DailyForecasts'][1]['Date']);
    this.futureDay1Name = weekdays[forecastday1.getDay()]
    this.futureDay1Icon = jsonfinalForcast['DailyForecasts'][1]['Day']['Icon'];

    // Day2
    this.futureDay2minT = jsonfinalForcast['DailyForecasts'][2]['Temperature']['Minimum']['Value']
    this.futureDay2maxT = jsonfinalForcast['DailyForecasts'][2]['Temperature']['Maximum']['Value']
    this.futureDay2Temp = (this.futureDay2maxT+this.futureDay2minT)/2;
    this.futureDay2Temp = parseInt(this.futureDay2Temp);
    let forecastday2 = new Date(jsonfinalForcast['DailyForecasts'][2]['Date']);
    this.futureDay2Name = weekdays[forecastday2.getDay()]
    this.futureDay2Icon = jsonfinalForcast['DailyForecasts'][2]['Day']['Icon'];

    // Day3
    this.futureDay3minT = jsonfinalForcast['DailyForecasts'][3]['Temperature']['Minimum']['Value']
    this.futureDay3maxT = jsonfinalForcast['DailyForecasts'][3]['Temperature']['Maximum']['Value']
    this.futureDay3Temp = (this.futureDay3maxT+this.futureDay3minT)/2;
    this.futureDay3Temp = parseInt(this.futureDay3Temp);
    let forecastday3 = new Date(jsonfinalForcast['DailyForecasts'][3]['Date']);
    this.futureDay3Name = weekdays[forecastday3.getDay()]
    this.futureDay3Icon = jsonfinalForcast['DailyForecasts'][3]['Day']['Icon'];

    // Day4
    this.futureDay4minT = jsonfinalForcast['DailyForecasts'][4]['Temperature']['Minimum']['Value']
    this.futureDay4maxT = jsonfinalForcast['DailyForecasts'][4]['Temperature']['Maximum']['Value']
    this.futureDay4Temp = (this.futureDay4maxT+this.futureDay4minT)/2;
    this.futureDay4Temp = parseInt(this.futureDay4Temp);
    let forecastday4 = new Date(jsonfinalForcast['DailyForecasts'][4]['Date']);
    this.futureDay4Name = weekdays[forecastday4.getDay()]
    this.futureDay4Icon = jsonfinalForcast['DailyForecasts'][4]['Day']['Icon'];
    //#endregion

}

  powerGenGraph() {
      setTimeout(() => {
        this.powerChart = HighCharts.chart('power-chart', {

            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                height: '100%',
                margin: [0, 0, 0, 0],
                plotShadow: false
            },

            title: {
                text: ''
            },

            pane: {
                startAngle: -100,
                endAngle: 100,
                background: {
                    backgroundColor: '#efefef',
                    borderWidth: 0,
                    outerRadius: '104%',
                    innerRadius: '107%',
                    shape: 'squre'
                }
            },

            // the value axis
            yAxis: {
              min: this.powerMin,
              max: this.powerMax,
              lineColor: '#efefef',
              tickColor: '#efefef',
              minorTickColor: 'transparent',
              tickPixelInterval: this.powerScale,
              tickInterval: this.powerScale,
              lineWidth: 2,
              labels: {
                  distance: -20,
                  rotation: 0
              },
              tickLength: 15,
              minorTickLength: 5,
              endOnTick: false,
                plotBands: [{
                    from: this.powerMin,
                    to: this.powerMax,
                    color:  {
                      linearGradient: { x1: 0, y1: 0.5, x2: 1, y2: 0.5 },
                      stops: [
                          [0, '#19f3ff'],
                          [1, '#1847ff']
                      ]
                  }
                }]
            },

            series: [{
                name: 'Power',
                data: [this.powerOnGraph],
                dataLabels: false,
                tooltip: {
                    valueSuffix: ' MW'
                }
            }],

            credits: {
                enabled: false
            },
            loading: false

        });
      }, 100);
  }

  irradiationGraph() {
      let irrData = Math.round(this.irradiationData);

      this.leftposition = '5%';
      this.topposition = '-7vh';
    
  
      let count =  this.irradiationData.toString().length;
      if(count >= 4){
          this.leftposition = '3%';
          this.topposition = '-7.5vh';
          this.valueScaleDown = '4.5vh';
          this.unitScaleDown = '2.8vh';
      }
      
      if(this.irradiationData >= 1000){
        this.leftposition = '0%';
      }
 
      setTimeout(() => {
        this.irradiationChart = HighCharts.chart('irradiation-chart', {

            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                height: '100%',
                margin: [0, 0, 0, 0],
                plotShadow: false
            },

            title: {
                text: ''
            },

            pane: {
                startAngle: -100,
                endAngle: 100,
                background: {
                    backgroundColor: '#efefef',
                    borderWidth: 0,
                    outerRadius: '104%',
                    innerRadius: '107%',
                    shape: 'squre'
                }
            },

            // the value axis
            yAxis: {
              min: this.irradiationMin,
              max: this.irradiationMax,
              lineColor: '#efefef',
              tickColor: '#efefef',
              minorTickColor: 'transparent',
              tickPixelInterval: this.irradiationScale,
              tickInterval: this.irradiationScale,
              lineWidth: 2,
              labels: {
                  distance: -25,
                  rotation: 0
              },
              tickLength: 15,
              minorTickLength: 5,
              endOnTick: false,
                plotBands: [{
                    from: this.irradiationMin,
                    to: this.irradiationMax,
                    color:  {
                      linearGradient: { x1: 0, y1: 0.5, x2: 1, y2: 0.5 },
                      stops: [
                          [0, '#19f3ff'],
                          [1, '#1847ff']
                      ]
                  }
                }]
            },

            series: [{
                name: 'Irradiation',
                data: [this.irradiationOnGraph],
                // data: [irrData],
                dataLabels: false,
                tooltip: {
                    valueSuffix: ' W/M<sup>2</sup>'
                }
            }],

            credits: {
                enabled: false
            },
            loading: false

        });
      }, 100);

  }

  ambientTemperatureGraph() {
      setTimeout(() => {
        this.ambientTemperatureChart = HighCharts.chart('ambient-chart', {

            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                height: '100%',
                margin: [0, 0, 0, 0],
                plotShadow: false
            },

            title: {
                text: ''
            },

            pane: {
                startAngle: -100,
                endAngle: 100,
                background: {
                    backgroundColor: '#efefef',
                    borderWidth: 0,
                    outerRadius: '104%',
                    innerRadius: '107%',
                    shape: 'squre'
                }
            },

            // the value axis
            yAxis: {
              min: this.ambientMin,
              max: this.ambientMax,
              lineColor: '#efefef',
              tickColor: '#efefef',
              minorTickColor: 'transparent',
              tickPixelInterval: this.ambientScale,
              tickInterval: this.ambientScale,
              lineWidth: 2,
              labels: {
                  distance: -20,
                  rotation: 0
              },
              tickLength: 15,
              minorTickLength: 5,
              endOnTick: false,
                plotBands: [{
                    from: this.ambientMin,
                    to: this.ambientMax,
                    color:  {
                      linearGradient: { x1: 0, y1: 0.5, x2: 1, y2: 0.5 },
                      stops: [
                          [0, '#19f3ff'],
                          [1, '#1847ff']
                      ]
                  }
                }]
            },

            series: [{
                name: 'Ambient',
                
                data: [this.ambientTempOnGraph],
                dataLabels: false,
                tooltip: {
                    valueSuffix: ' <sup>o</sup>C'
                }
            }],
            credits: {
                enabled: false
            },
            loading: false

        });
      }, 100);

  }

  enegyGenerationGraph() {
    this.hourlyGraph(1);
  }

  hourlyGraph(type: number){

    if(this.hourly){
        this.hourly.destroy();
        this.selectedEnergySection = 'hourlyTab';
    }

    let dataSrc = this.hourlyData.Result;
    console.log('check Result res', this.hourlyData);
    // console.log('check Result res', dataSrc);
    let hourlyDataSrc = undefined;
    let x;
    let y;
    let timeLabel = undefined;
    let l = dataSrc.length;
    let multiScale;
 
    y = dataSrc.map(y =>{
        return Math.round(y.EnergyValue/parseFloat(this.plantData.Result.UnitScale));
    });
    let max = this.hourlyMax;
    let count =  max.toString().length;
    if(count == 3){
        multiScale = 600;
    }else if(count == 2)
    {
        multiScale = 60;
    }else if(count == 1)
    {
        multiScale = 6;
    }else
    {
        multiScale = 6 * (count - 1) * 10;
    }

    x = dataSrc.map(x =>{
        return moment(x.TimeStamp).format('ha');
    })

    // let ppaYear = moment(this.plantData.Result.PlantInfo.PPA).year();


    let config = {
        type: '',
        data: {
          labels: x,
          datasets: [
            ]
          },
          options: {
            legend: {
              display: false
            },
            tooltips: {
              enabled: false
            },
            scales: {
              xAxes: [{
                barPercentage: 0.5,
                gridLines : {
                    display : false
                },
                ticks: {
                    fontSize: 10
                },
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "MWh",
                  fontColor: "grey",
                  fontSize: 14,
                  fontStyle: 'normal',
                  fontFamily: 'Lata'
                },
                ticks: {
                    min: this.hourlyMin,
                    max: this.hourlyMax,
                    beginAtZero: true,
                    fontSize: 10,
                    stepSize: this.hourlyScale
                }
              }],

            },
            chartArea: {
                backgroundColor: 'rgba(190, 190, 190, 0.7)'
            }
         }

    }

    if(type === 1){
        config.type = 'bar';
        config.data.datasets =   [{
            backgroundColor: "rgba(98, 182, 239, 0.918)",
            data: y,
            }];
    }

    if(type === 2){
        config.type = 'line';
        config.data.datasets =   [{
            lineTension: 0.1,
            backgroundColor: "transparent",
            borderColor: "rgba(98, 182, 239, 0.918)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(98, 182, 239, 0.918)",
            data: y,
            }];
    }

    setTimeout(() => {
        this.hourly = new Chart(this.hourlyCanvas.nativeElement, config);
    }, 100);
  }

  dailyGraph(type: number){
    console.log("Call dailyGraph");
    if(this.dialy){
        this.dialy.destroy();
        this.selectedEnergySection = 'dailyTab';
    }
    let dataSrc = this.dialyData.Result;
    console.log('daily', dataSrc);
    let dailyDataSrc = undefined;
    let x;
    let y;

    let upper = 0;
    let lower = 0;
    let timeLabel = undefined;

    y = dataSrc.map(y =>{
        // return Math.round(y.EnergyValue/1000000);
        return y.EnergyValue/parseFloat(this.plantData.Result.UnitScale);
    });
    
    let max, min, range, compensate;
    max = Math.max.apply(null, y);
    min = Math.min.apply(null, y);
    console.log('max ', max);
    console.log('min ', min);
    range = max-min;
    compensate = range * 20 / 100; // 20% of range
    // upper = Math.round(compensate) + max;
    // upper = max + ;
    // lower = min - Math.round(compensate);
    console.log('upper ', upper);
    console.log('lower ', lower);

    x = dataSrc.map(x =>{
        return moment(x.TimeStamp).format('D MMM');
    })
    console.log('y', y);
    console.log('x', x);

    let config = {
        type: '',
        data: {
          labels: x,
          datasets: []
          },
          options: {
            legend: {
              display: false
            },
            tooltips: {
              enabled: false
            },
            scales: {
              xAxes: [{
                gridLines : {
                    display : false
                },
                barPercentage: 0.5,
                ticks: {
                    maxRotation: 30,
                    fontSize: 10,
                    autoSkip: true,
                    maxTicksLimit: 6
                }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "MWh",
                  fontColor: "grey",
                  fontSize: 14,
                  fontStyle: 'normal',
                  fontFamily: 'Lata'
                },
                ticks: {
                    // beginAtZero: isZero,
                    min: this.dailyMin,
                    max: this.dailyMax,
                    fontSize: 10,
                    stepSize: this.dailyScale
                }
              }],
              },
            chartArea: {
                backgroundColor: 'rgba(190, 190, 190, 0.7)'
            }
         }

    };

    if(type === 1){
        config.type = 'bar';
        config.data.datasets =   [{
            backgroundColor: "rgba(98, 182, 239, 0.918)",
            data: y,
            }];
    }
    if(type === 2){
        config.type = 'line';
        config.data.datasets =   [{
            lineTension: 0.1,
            backgroundColor: "transparent",
            borderColor: "rgba(98, 182, 239, 0.918)",
            borderWidth: 2,
            pointBackgroundColor: "rgba(98, 182, 239, 0.918)",
            data: y,
        }];
    }

    setTimeout(() => {
        this.dialy = new Chart(this.dailyCanvas.nativeElement, config);
    }, 100);
  }

  monthlyGraph(type: number){
    if(this.monthly){
        this.monthly.destroy();
        this.selectedEnergySection = 'monthlyTab';
    }

    let dataSrc = this.monthlyData.Result;
    let monthlyDataSrc = undefined;
    let monthlyDataTarget = undefined;
    let x, y, yTarget, chooseMax, chooseMin, upper, lower;
    let timeLabel = undefined;
    let l = dataSrc.length;
    lower = 0;

    y = dataSrc.map(y =>{
        return Math.round(y.EnergyValue/parseFloat(this.plantData.Result.UnitScale));
    });

    yTarget = dataSrc.map(y =>{
        return Math.round(y.Target/parseFloat(this.plantData.Result.UnitScale));
    });

    console.log('value ', y);
    console.log('target', yTarget);
    let max, maxTarget, min, minTarget, range, compensate;
    max = Math.max.apply(null, y);
    maxTarget = Math.max.apply(null, yTarget);
    min = Math.min.apply(null, y);

    if(maxTarget > max){
        chooseMax = maxTarget;
    }else{
        chooseMax = max;
    }

    if(minTarget < min){
        chooseMin = minTarget;
    }else{
        chooseMin = min
    }

    range = chooseMax-min;
    compensate = range * 50 / 100; // 50% of range
    upper = Math.round((chooseMax + compensate) * 10)/10
    // lower = Math.round((chooseMin - compensate) * 10)/10
    console.log('upper ', upper);
    console.log('lower ', lower);

    x = dataSrc.map(x =>{
        return moment(x.TimeStamp).format('MMM');
    })

    let config = {
        type: '',
        data: {
          labels: x,
          datasets: []
          },
          options: {
            legend: {
              display: false
            },
            tooltips: {
              enabled: false
            },
            scales: {
              xAxes: [{
                barPercentage: 0.5,
                gridLines : {
                    display : false
                },
                ticks: {
                    fontSize: 10
                },
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "MWh",
                  fontColor: "grey",
                  fontSize: 14,
                  fontStyle: 'normal',
                  fontFamily: 'Lata'
                },
                ticks: {
                    // beginAtZero: true,
                    max: this.monthlyMax,
                    min: this.monthlyMin,
                    fontSize: 10,
                    stepSize: this.monthlyScale
                }
              }],
            },
            chartArea: {
                backgroundColor: 'rgba(190, 190, 190, 0.7)'
            }
         }

    };

    if(type === 1){
        config.type = 'bar';
        config.data.datasets = [{
                backgroundColor: "rgba(98, 182, 239, 0.918)",
                data: y,
            },
            {
                lineTension: 0.1,
                backgroundColor: "transparent",
                borderColor: "rgba(248, 94, 23, 0.918)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(248, 94, 23, 0.918)",
                data: yTarget,
                type: 'line'
            }
        ];
    }
    if(type === 2){
        config.type = 'line';
        config.data.datasets =   [{
                lineTension: 0.1,
                backgroundColor: "transparent",
                borderColor: "rgba(98, 182, 239, 0.918)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(98, 182, 239, 0.918)",
                data: y,
            },
            {
                lineTension: 0.1,
                backgroundColor: "transparent",
                borderColor: "rgba(248, 94, 23, 0.918)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(248, 94, 23, 0.918)",
                data: yTarget,
                type: 'line'
            }
        ];
    }

    setTimeout(() => {
        this.monthly = new Chart(this.monthlyCanvas.nativeElement, config);
    }, 100);
  }

  yearlyGraph(type :number){
    if(this.yearly){
        this.yearly.destroy();
        this.selectedEnergySection = 'yearlyTab';
    }

    let dataSrc = this.yearlyData.Result;
    console.log('result', this.yearlyData);
    let yearlyDataSrc = undefined;
    let yearlyDataSrcTarget = undefined;
    let x, y, yTarget, chooseMax, chooseMin, upper, lower;
    let timeLabel = undefined;
    let l = dataSrc.length;
    lower = 0;

    y = dataSrc.map(y =>{
        return Math.round(y.EnergyValue/parseFloat(this.plantData.Result.UnitScale));
    });

    yTarget = dataSrc.map(y =>{
        return Math.round(y.Target/parseFloat(this.plantData.Result.UnitScale));
    });

    console.log('value ', y);
    console.log('target', yTarget);
    let max, maxTarget, min, minTarget, range, compensate;
    max = Math.max.apply(null, y);
    maxTarget = Math.max.apply(null, yTarget);
    min = Math.min.apply(null, y);
    minTarget = Math.min.apply(null, yTarget);

    if(maxTarget > max){
        chooseMax = maxTarget;
    }else{
        chooseMax = max;
    }

    if(minTarget < min){
        chooseMin = minTarget;
    }else{
        chooseMin = min
    }

    range = chooseMax-min;
    compensate = range * 50 / 100; // 50% of range
    upper = Math.round((chooseMax + compensate) * 10)/10;
    // lower = Math.round((chooseMin - compensate) * 10)/10;
    console.log('upper ', upper);
    console.log('lower ', lower);

    x = dataSrc.map(x =>{
        return moment(x.TimeStamp).format('YYYY');
    })

    let config = {
        type: '',
        data: {
          labels: x,
          datasets: []
          },
          options: {
            legend: {
              display: false
            },
            tooltips: {
              enabled: false
            },
            scales: {
              xAxes: [{
                barPercentage: 0.5,
                gridLines : {
                    display : false
                },
                ticks: {
                    fontSize: 10
                },
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "MWh",
                  fontColor: "grey",
                  fontSize: 14,
                  fontStyle: 'normal',
                  fontFamily: 'Lata'
                },
                ticks: {
                    // beginAtZero: true,
                    fontSize: 10,
                    max: this.yearlyMax,
                    min: this.yearlyMin,
                    stepSize: this.yearlyScale
                }
              }]
            },
            chartArea: {
                backgroundColor: 'transparent'
            }
         }

    };

    if(type === 1){
        config.type = 'bar';
        config.data.datasets = [{
                backgroundColor: "rgba(98, 182, 239, 0.918)",
                data: y
            },
            {
                lineTension: 0.1,
                backgroundColor: "transparent",
                borderColor: "rgba(248, 94, 23, 0.918)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(248, 94, 23, 0.918)",
                data: yTarget,
                type: 'line'
            }
        ];
    }
    if(type === 2){
        config.type = 'line';
        config.data.datasets =   [
            {
                lineTension: 0.1,
                backgroundColor: "transparent",
                pointBackgroundColor: "rgba(98, 182, 239, 0.918)",
                borderColor: "rgba(98, 182, 239, 0.918)",
                borderWidth: 2,
                data: y
            },
            {
                lineTension: 0.1,
                backgroundColor: "transparent",
                borderColor: "rgba(248, 94, 23, 0.918)",
                borderWidth: 2,
                pointBackgroundColor: "rgba(248, 94, 23, 0.918)",
                data: yTarget,
                type: 'line'
            }
        ];
    }

    setTimeout(() => {
        this.yearly = new Chart(this.yearlyCanvas.nativeElement, config);
    }, 100);
  }

  generationSummary(){

    // summaryToday: any;
    // summaryMTDActual: any;
    // summaryMTDPlan: any;
    // summaryYTDActual: any;
    // summaryYTDPlan: any;
      console.log("generationSummary Called");
      //#region Daily
      console.log(this.dialyData);
      if(this.dialyData.Result.length != 0){
        let responseDaily = JSON.stringify(this.dialyData); // Convert {any} data to {string}
        let jsonDaily = JSON.parse(responseDaily);
        //console.log(jsonDaily["Result"][this.dialyData.Result.length-1]["EnergyValue"]);
        //this.powerData = Math.floor(parseFloat(this.plantData.Result.PowerGen) / 100000) / 10;
        // let nowadays = new Date();
        // nowadays.setHours(0);
        // nowadays.setMinutes(0);
        // nowadays.setSeconds(0);
        // var thisDailyIndex = jsonDaily["Result"].findIndex(c => new Date(c.TimeStamp).getDay() == nowadays.getDay() && 
        // new Date(c.TimeStamp).getMonth() == nowadays.getMonth() && new Date(c.TimeStamp).getFullYear() == nowadays.getFullYear());

        console.log(this.todayDateGeneration.toLocaleString());

        //console.log(new Date("2018-04-15T00:00:00").toLocaleString());
        
        var thisDailyIndex = jsonDaily["Result"].findIndex(c => new Date(c.TimeStamp).toLocaleString() == this.todayDateGeneration.toLocaleString());

        console.log("thisDailyIndex" + thisDailyIndex);
        this.summaryToday = parseFloat(jsonDaily["Result"][thisDailyIndex]["EnergyValue"])/parseFloat(this.plantData.Result.UnitScale);

      }
      else{
          this.summaryToday = 0;
      }
      //#endregion

      //#region Montyly
      console.log(this.monthlyData);
      if(this.monthlyData.Result.length != 0){
        let responseMontyly = JSON.stringify(this.monthlyData);
        let jsonMontyly = JSON.parse(responseMontyly);
        let nowadays = new Date();
        nowadays.setDate(1);
        nowadays.setHours(0);
        nowadays.setMinutes(0);
        nowadays.setSeconds(0);
        var thisMonthlyIndex = jsonMontyly["Result"].findIndex(c => new Date(c.TimeStamp).toLocaleString() == nowadays.toLocaleString());

        this.summaryMTDActual = parseFloat(jsonMontyly["Result"][thisMonthlyIndex]["EnergyValue"])/parseFloat(this.plantData.Result.UnitScale);
        this.summaryMTDPlan = parseFloat(jsonMontyly["Result"][thisMonthlyIndex]["Target"])/parseFloat(this.plantData.Result.UnitScale);
        //console.log(this.summaryMTDActual);
      }
      else{
        this.summaryMTDActual = 0;
        this.summaryMTDPlan = 0;
      }
      //#endregion

      //#region Yearly
      console.log(this.yearlyData);
      if(this.yearlyData.Result.length != 0){
        let responseYearly = JSON.stringify(this.yearlyData);
        let jsonYearly = JSON.parse(responseYearly);
        let nowadays = new Date();
        var thisYearIndex = jsonYearly["Result"].findIndex(c => new Date(c.TimeStamp).getFullYear() == nowadays.getFullYear());
        console.log("thisYearIndex" + thisYearIndex);
        
        this.summaryYTDActual = parseFloat(jsonYearly["Result"][thisYearIndex]["EnergyValue"])/parseFloat(this.plantData.Result.UnitScale);
        this.summaryYTDPlan = parseFloat(jsonYearly["Result"][thisYearIndex]["Target"])/parseFloat(this.plantData.Result.UnitScale);
      }
      else{
        this.summaryYTDActual = 0;
        this.summaryYTDPlan = 0;
      }
      //#endregion
      console.log(moment(this.lastestUpdate).format('MMM'));
    //   this.loader.dismiss();
  }

}
