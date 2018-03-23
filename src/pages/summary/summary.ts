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
  powerIcon: string;
  powerMax: number;

  irradiationChart: any;
  irradiationData: any;
  irradiationIcon: string;
  irradiationMax: number;

  ambientTemperatureChart: any;
  ambientTempData: any;
  ambientIcon: string;

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
  summaryToday: number = 234432
  summaryMTDActual: number = 7654098;
  summaryMTDPlan: number = 10000000;
  summaryYTDActual: number = 18324394;
  summaryYTDPlan: number = 20000000;

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
  futureList:any;
  testArr: any[];
  currentIconWeather: any;

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
            public viewCtrl:ViewController) {

                this.viewCtrl = viewCtrl;

                this.plantData = this.navParams.get('plantData');
                // this.logo = 'http://pms-api-dev.azurewebsites.net/' + this.plantData.Result.PlantInfo.CompanyLogo;
                //this.logo = 'assets/imgs/CHPP.png'
                this.companyName = this.plantData.Result.PlantInfo.CompanyName;
                if(this.companyName == 'CHPP'){
                  this.logo = "./assets/imgs/chpphead.png";
                }
                else{
                  this.logo = "./assets/imgs/ichinosekihead.png";
                }

                let id = this.plantData.Result.PlantId;

                this.hourlyEnergyProvider.requestHourlyEnergy(id)
                    .then(data => {
                        this.hourlyData = data;
                    }).catch(error => {
                        console.log(error);
                    });

                this.dailyEnergyProvider.requestDailyEnergy(id)
                .then(data => {
                    this.dialyData = data;
                }).catch(error => {
                    console.log(error);
                });

                this.monthlyEnergyProvider.requestMonthlyEnergy(id)
                .then(data => {
                    this.monthlyData = data;
                }).catch(error => {
                    console.log(error);
                });

                this.yearlyEnergyProvider.requestYearlyEnergy(id)
                .then(data => {
                    this.yearlyData = data;
                }).catch(error => {
                    console.log(error);
                });
                this.loader = this.loadingCtrl.create({
                    content: "Loading..."
                  });
                this.powerIcon = "assets/imgs/Elect.png";
                this.irradiationIcon = "assets/imgs/Sun.png";
                this.ambientIcon = "assets/imgs/Temp.png";
  }

  ionViewWillEnter(){
    console.log("setting BtText");
    this.viewCtrl.setBackButtonText('');
  }

  ionViewDidLoad(){
      this.loader.present();
      this.getWeather();
  }

  ionViewDidEnter() {

    this.powerGenGraph();
    // this.hourlyGraph(1);
    this.powerData = Math.floor(parseFloat(this.plantData.Result.PowerGen) / 100000) / 10;
    this.powerMax = Math.ceil(parseInt(this.powerData) * (Math.random() * 3 + 3));
    this.irradiationData = Math.floor(parseFloat(this.plantData.Result.Irradiation) / 100000) / 10;
    this.irradiationMax = Math.ceil(parseInt(this.irradiationData) * (Math.random() * 3 + 3))
    this.ambientTempData = this.plantData.Result.AMB_Temp;
  }

  getWeather(){
    this.weatherServiceProvider.getWeather().then((data:any) =>{
        console.log(data);
        let response = JSON.stringify(data); // Convert {any} data to {string}
        let json = JSON.parse(response); // Convert Json string to JavaScript Key-Value Object
        //console.log(json);
        let date = new Date();
        this.currentDate = new Date();
        console.log(this.currentDate);
        //console.log(((json['list'][0]['main']['temp']).toString()).substring(0,2));

        //#region Set Current day/avgtemp/mintemp/maxtemp/weathericon
        if(date.getHours() >= 0 && date.getHours() < 3){
          console.log("00-03 temp is :"+json['list'][0]['main']['temp']);
          this.currentTemp = json['list'][0]['main']['temp'].toString().substring(0,2);
          this.maxTemp = json['list'][0]['main']['temp_max'].toString().substring(0,2);
          this.minTemp = json['list'][0]['main']['temp_min'].toString().substring(0,2);
          this.weatherDescription = json['list'][0]['weather'][0]['main'];
          this.currentIconWeather = json['list'][0]['weather'][0]['icon'].toString().substring(0,2);
          this.currentTime = "00.00";
        }
        if(date.getHours() >= 3 && date.getHours() < 6){
          console.log("03-06 temp is :"+json['list'][1]['main']['temp']);
          this.currentTemp = json['list'][1]['main']['temp'].toString().substring(0,2);
          this.maxTemp = json['list'][1]['main']['temp_max'].toString().substring(0,2);
          this.minTemp = json['list'][1]['main']['temp_min'].toString().substring(0,2);
          this.weatherDescription = json['list'][1]['weather'][0]['main'];
          this.currentIconWeather = json['list'][1]['weather'][0]['icon'].toString().substring(0,2);

          this.currentTime = "03.00";
        }
        if(date.getHours() >= 6 && date.getHours() < 9){
          console.log("06-09 temp is :"+json['list'][2]['main']['temp']);
          this.currentTemp = json['list'][2]['main']['temp'].toString().substring(0,2);
          this.maxTemp = json['list'][2]['main']['temp_max'].toString().substring(0,2);
          this.minTemp = json['list'][2]['main']['temp_min'].toString().substring(0,2);
          this.weatherDescription = json['list'][2]['weather'][0]['main'];
          this.currentIconWeather = json['list'][2]['weather'][0]['icon'].toString().substring(0,2);

          this.currentTime = "06.00";
        }
        if(date.getHours() >= 9 && date.getHours() < 12){
          console.log("09-12 temp is :"+json['list'][3]['main']['temp']);
          this.currentTemp = json['list'][3]['main']['temp'].toString().substring(0,2);
          this.maxTemp = json['list'][3]['main']['temp_max'].toString().substring(0,2);
          this.minTemp = json['list'][3]['main']['temp_min'].toString().substring(0,2);
          this.weatherDescription = json['list'][3]['weather'][0]['main'];
          this.currentIconWeather = json['list'][3]['weather'][0]['icon'].toString().substring(0,2);

          this.currentTime = "09.00";
        }
        if(date.getHours() >= 12 && date.getHours() < 15){
          console.log("12-15 temp is :"+json['list'][4]['main']['temp']);
          this.currentTemp = json['list'][4]['main']['temp'].toString().substring(0,2);
          this.maxTemp = json['list'][4]['main']['temp_max'].toString().substring(0,2);
          this.minTemp = json['list'][4]['main']['temp_min'].toString().substring(0,2);
          this.weatherDescription = json['list'][4]['weather'][0]['main'];
          this.currentIconWeather = json['list'][4]['weather'][0]['icon'].toString().substring(0,2);

          this.currentTime = "12.00";
        }
        if(date.getHours() >= 15 && date.getHours() < 18){
          console.log("15-18 temp is :"+json['list'][5]['main']['temp']);
          this.currentTemp = json['list'][5]['main']['temp'].toString().substring(0,2);
          this.maxTemp = json['list'][5]['main']['temp_max'].toString().substring(0,2);
          this.minTemp = json['list'][5]['main']['temp_min'].toString().substring(0,2);
          this.weatherDescription = json['list'][5]['weather'][0]['main'];
          this.currentIconWeather = json['list'][5]['weather'][0]['icon'].toString().substring(0,2);

          this.currentTime = "15.00";
        }
        if(date.getHours() >= 18 && date.getHours() < 21){
          console.log("18-21 temp is :"+json['list'][6]['main']['temp']);
          this.currentTemp = json['list'][6]['main']['temp'].toString().substring(0,2);
          this.maxTemp = json['list'][6]['main']['temp_max'].toString().substring(0,2);
          this.minTemp = json['list'][6]['main']['temp_min'].toString().substring(0,2);
          this.weatherDescription = json['list'][6]['weather'][0]['main'];
          this.currentIconWeather = json['list'][6]['weather'][0]['icon'].toString().substring(0,2);

          this.currentTime = "18.00";
        }
        if(date.getHours() >= 21 && date.getHours() < 24){
          console.log("21-24 temp is :"+json['list'][7]['main']['temp']);
          this.currentTemp = json['list'][7]['main']['temp'].toString().substring(0,2);
          this.maxTemp = json['list'][7]['main']['temp_max'].toString().substring(0,2);
          this.minTemp = json['list'][7]['main']['temp_min'].toString().substring(0,2);
          this.weatherDescription = json['list'][7]['weather'][0]['main'];
          this.currentIconWeather = json['list'][7]['weather'][0]['icon'].toString().substring(0,2);

          this.currentTime = "21.00";
        }
        //#endregion

        //#region Set Forcast 4day day/avgtemp/mintemp/maxtemp/weathericon
        let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday",
         "Thursday", "Friday", "Saturday"];

        let weekdaysBig = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY",
         "THURSDAY", "FRIDAY", "SATURDAY"];

        this.currentDay = weekdaysBig[date.getDay()];

        for(var _i = 0; _i < 4; _i++){
            if(date.getDay()+_i+1 < 7){
                if(_i == 0){
                    this.futureDay1Name = weekdays[date.getDay()+1];
                    this.futureDay1Temp = json['list'][11]['main']['temp'].toString().substring(0,2);
                    this.futureDay1minT = json['list'][11]['main']['temp_min'].toString().substring(0,2);
                    this.futureDay1maxT = json['list'][11]['main']['temp_max'].toString().substring(0,2);
                    this.futureDay1Icon = json['list'][11]['weather'][0]['icon'].toString().substring(0,2);
                }
                if(_i == 1){
                    this.futureDay2Name = weekdays[date.getDay()+2];
                    this.futureDay2Temp = json['list'][19]['main']['temp'].toString().substring(0,2);
                    this.futureDay2minT = json['list'][19]['main']['temp_min'].toString().substring(0,2);
                    this.futureDay2maxT = json['list'][19]['main']['temp_max'].toString().substring(0,2);
                    this.futureDay2Icon = json['list'][19]['weather'][0]['icon'].toString().substring(0,2);
                }
                if(_i == 2){
                    this.futureDay3Name = weekdays[date.getDay()+3];
                    this.futureDay3Temp = json['list'][27]['main']['temp'].toString().substring(0,2);
                    this.futureDay3minT = json['list'][27]['main']['temp_min'].toString().substring(0,2);
                    this.futureDay3maxT = json['list'][27]['main']['temp_max'].toString().substring(0,2);
                    this.futureDay3Icon = json['list'][27]['weather'][0]['icon'].toString().substring(0,2);
                }
                if(_i == 3){
                    this.futureDay4Name = weekdays[date.getDay()+4];
                    this.futureDay4Temp = json['list'][35]['main']['temp'].toString().substring(0,2);
                    this.futureDay4minT = json['list'][35]['main']['temp_min'].toString().substring(0,2);
                    this.futureDay4maxT = json['list'][35]['main']['temp_max'].toString().substring(0,2);
                    this.futureDay4Icon = json['list'][35]['weather'][0]['icon'].toString().substring(0,2);
                }
            }
            if(date.getDay()+_i+1 >= 7){
                if(_i == 0){
                    this.futureDay1Name = weekdays[(date.getDay()+1)-7];
                    this.futureDay1Temp = json['list'][11]['main']['temp'].toString().substring(0,2);
                    this.futureDay1minT = json['list'][11]['main']['temp_min'].toString().substring(0,2);
                    this.futureDay1maxT = json['list'][11]['main']['temp_max'].toString().substring(0,2);
                    this.futureDay1Icon = json['list'][11]['weather'][0]['icon'].toString().substring(0,2);
                }
                if(_i == 1){
                    this.futureDay2Name = weekdays[(date.getDay()+2)-7];
                    this.futureDay2Temp = json['list'][19]['main']['temp'].toString().substring(0,2);
                    this.futureDay2minT = json['list'][19]['main']['temp_min'].toString().substring(0,2);
                    this.futureDay2maxT = json['list'][19]['main']['temp_max'].toString().substring(0,2);
                    this.futureDay2Icon = json['list'][19]['weather'][0]['icon'].toString().substring(0,2);
                }
                if(_i == 2){
                    this.futureDay3Name = weekdays[(date.getDay()+3)-7];
                    this.futureDay3Temp = json['list'][27]['main']['temp'].toString().substring(0,2);
                    this.futureDay3minT = json['list'][27]['main']['temp_min'].toString().substring(0,2);
                    this.futureDay3maxT = json['list'][27]['main']['temp_max'].toString().substring(0,2);
                    this.futureDay3Icon = json['list'][27]['weather'][0]['icon'].toString().substring(0,2);
                }
                if(_i == 3){
                    this.futureDay4Name = weekdays[(date.getDay()+4)-7];
                    this.futureDay4Temp = json['list'][35]['main']['temp'].toString().substring(0,2);
                    this.futureDay4minT = json['list'][35]['main']['temp_min'].toString().substring(0,2);
                    this.futureDay4maxT = json['list'][35]['main']['temp_max'].toString().substring(0,2);
                    this.futureDay4Icon = json['list'][35]['weather'][0]['icon'].toString().substring(0,2);
                }
            }
        }

        console.log("Current Day: "+this.currentDay)
        //#endregion


        this.loader.dismiss();
    });
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
              min: 0,
              max: 20,
              lineColor: '#efefef',
              tickColor: '#efefef',
              minorTickColor: 'transparent',
              tickPixelInterval: 5,
              tickInterval: 5,
              lineWidth: 2,
              labels: {
                  distance: -20,
                  rotation: 0
              },
              tickLength: 15,
              minorTickLength: 5,
              endOnTick: false,
                plotBands: [{
                    from: 0,
                    to: 20,
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
                data: [(this.powerData > 20) ? 20 : this.powerData],
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
              min: 0,
              max: 5,
              lineColor: '#efefef',
              tickColor: '#efefef',
              minorTickColor: 'transparent',
              tickPixelInterval: 1,
              tickInterval: 1,
              lineWidth: 2,
              labels: {
                  distance: -25,
                  rotation: 0
              },
              tickLength: 15,
              minorTickLength: 5,
              endOnTick: false,
                plotBands: [{
                    from: 0,
                    to: 5,
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
                data: [this.irradiationData],
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
              min: -10,
              max: 40,
              lineColor: '#efefef',
              tickColor: '#efefef',
              minorTickColor: 'transparent',
              tickPixelInterval: 10,
              tickInterval: 10,
              lineWidth: 2,
              labels: {
                  distance: -20,
                  rotation: 0
              },
              tickLength: 15,
              minorTickLength: 5,
              endOnTick: false,
                plotBands: [{
                    from: -10,
                    to: 40,
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
                data: [this.ambientTempData],
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
    let l = dataSrc.length
    if( l >= 12){
        // for(let i = dataSrc.length; )
        hourlyDataSrc = dataSrc.map(y =>{
            return Math.round(y.EnergyValue/1000000);
        });
        y = hourlyDataSrc.slice(l-11, l);

        timeLabel = dataSrc.map(x =>{
            return moment(x.TimeStamp).format('ha');
        })
        x = timeLabel.slice(l-11, l);
    }
    else{
        y = dataSrc.map(y =>{
            return Math.round(y.EnergyValue/1000000);
        });
        x = dataSrc.map(x =>{
            return moment(x.TimeStamp).format('ha');
        })
    }

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
                    beginAtZero: true,
                    fontSize: 10,
                    stepSize: 3
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
    if(this.dialy){
        this.dialy.destroy();
        this.selectedEnergySection = 'dailyTab';
    }

    let dataSrc = this.dialyData.Result;
    let dailyDataSrc = undefined;
    let x;
    let y;

    let upper = 0;
    let lower = 0;
    let timeLabel = undefined;
    let l = dataSrc.length
    if( l >= 7){
        // for(let i = dataSrc.length; )
        dailyDataSrc = dataSrc.map(y =>{
            return Math.round(y.EnergyValue/1000000 *10)/10;
        });
        console.log('check ', dailyDataSrc);
        y = dailyDataSrc.slice(l-7, l);
        let max, min, range, compensate;
        max = Math.max.apply(null, y);
        min = Math.min.apply(null, y);
        range = max-min;
        compensate = range * 50 / 100; // 20% of range
        console.log('comp ', compensate);
        upper = Math.round((max + compensate) * 10)/10
        lower = Math.round((min - compensate) * 10)/10

        timeLabel = dataSrc.map(x =>{
            return moment(x.TimeStamp).format('D MMM');
        })
        x = timeLabel.slice(l-7, l);
    }
    else{
        y = dataSrc.map(y =>{
            // return Math.round(y.EnergyValue/1000000);
            return y.EnergyValue/1000000;
        });
        
        let max, min, range, compensate;
        max = Math.max.apply(null, y);
        min = Math.min.apply(null, y);
        console.log('max ', max);
        console.log('min ', min);
        range = max-min;
        compensate = range * 20 / 100; // 20% of range
        upper = Math.round(compensate) + max;
        lower = min - Math.round(compensate);
        console.log('upper ', upper);
        console.log('lower ', lower);

        x = dataSrc.map(x =>{
            return moment(x.TimeStamp).format('D MMM');
        })
        console.log('y', y);
        console.log('x', x);
    }

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
                    fontSize: 10
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
                    min: lower,
                    max: upper,
                    fontSize: 10,
                    // stepSize: 0.2
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
    let l = dataSrc.length
    if( l >= 12){

        monthlyDataSrc = dataSrc.map(y =>{
            return Math.round(y.EnergyValue/1000000 * 10)/10;
        });

        monthlyDataTarget = dataSrc.map(y =>{
            return Math.round(y.Target/1000000 * 10)/10;
        });

        y = monthlyDataSrc.slice(l-11, l);
        yTarget = monthlyDataTarget.slice(l-11, l);
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
        upper = Math.round((chooseMax + compensate) * 10)/10
        lower = Math.round((chooseMin - compensate) * 10)/10
        console.log('upper ', upper);
        console.log('lower ', lower);

        timeLabel = dataSrc.map(x =>{
            return moment(x.TimeStamp).format('MMM');
        })
        x = timeLabel.slice(l-11, l);
    }
    else{
        y = dataSrc.map(y =>{
            return Math.round(y.EnergyValue/1000000 * 10)/10;
        });

        yTarget = dataSrc.map(y =>{
            return Math.round(y.Target/1000000 * 10)/10;
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
        lower = Math.round((chooseMin - compensate) * 10)/10
        console.log('upper ', upper);
        console.log('lower ', lower);

        x = dataSrc.map(x =>{
            return moment(x.TimeStamp).format('MMM');
        })
    }

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
                    max: chooseMax,
                    min: lower,
                    fontSize: 10,
                    // stepSize: 3
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
    let l = dataSrc.length
    if( l >= 6){
        // for(let i = dataSrc.length; )
        yearlyDataSrc = dataSrc.map(y =>{
            return Math.round(y.EnergyValue/1000000);
        });
        yearlyDataSrcTarget = dataSrc.map(y =>{
            return Math.round(y.Target/1000000);
        });

        y = yearlyDataSrc.slice(l-6, l);
        yTarget = yearlyDataSrcTarget.slice(l-6, l);
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
        console.log('cMax', chooseMax);
        console.log('cMin', chooseMin);
        range = chooseMax-min;
        compensate = range * 50 / 100; // 50% of range
        upper = Math.round((chooseMax + compensate) * 10)/10
        lower = Math.round((chooseMin - compensate) * 10)/10
        console.log('upper ', upper);
        console.log('lower ', lower);

        timeLabel = dataSrc.map(x =>{
            return moment(x.TimeStamp).format('YYYY');
        })
        x = timeLabel.slice(l-6, l);
    }
    else{
        y = dataSrc.map(y =>{
            return Math.round(y.EnergyValue/1000000);
        });

        yTarget = dataSrc.map(y =>{
            return Math.round(y.Target/1000000);
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
        upper = Math.round((chooseMax + compensate) * 10)/10
        lower = Math.round((chooseMin - compensate) * 10)/10
        console.log('upper ', upper);
        console.log('lower ', lower);

        x = dataSrc.map(x =>{
            return moment(x.TimeStamp).format('YYYY');
        })
    }

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
                    max: chooseMax,
                    min: lower,
                    // stepSize: 3
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

}
