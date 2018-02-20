import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

/**
 * Generated class for the SummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
   graph1 = 'autofocus';
   graph2 = 'autofocus';
   graph3 = 'autofocus';
   graph4 = 'autofocus';

  selectedSection = 'powerGenerationTab';
  selectedEnergySection = 'hourlyTab';

  powerChart: any;
  powerData: any;
  powerIcon: string;

  irradiationChart: any;
  irradiationData: any;
  irradiationIcon: string;

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

  logo: string = undefined;
  plantData: any;

  constructor(public navCtrl: NavController, 
            public navParams: NavParams, 
            public weatherServiceProvider: WeatherServiceProvider,
            public hourlyEnergyProvider: HourlyEnergyProvider,
            public dailyEnergyProvider: DailyEnergyProvider,
            public monthlyEnergyProvider: MonthlyEnergyProvider,
            public yearlyEnergyProvider: YearlyEnergyProvider) {
        
                // this.plantData = this.navParams.get('plantData');
                // this.logo = 'http://pms-api-dev.azurewebsites.net/' + this.plantData.Result.PlantInfo.CompanyLogo;
                // let id = this.plantData.Result.PlantId;

                // this.plantData = this.navParams.get('plantData');
                this.logo = 'http://pms-api-dev.azurewebsites.net/';
                let id = 5;

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
  }

  ionViewDidLoad(){
      this.getWeather();
  }

  ionViewDidEnter() {
    this.powerIcon = "assets/imgs/Elect.png";
    this.irradiationIcon = "assets/imgs/Sun.png";
    this.ambientIcon = "assets/imgs/Temp.png";

    this.powerGenGraph();
    // this.hourlyGraph(1);
    this.powerData = 3.5;
    this.irradiationData = 700;
    this.ambientTempData = 30;
  }

  getWeather(){
      this.weatherServiceProvider.getWeather().then((data:any) =>{
          let response = JSON.stringify(data); // Convert {any} data to {string}
          let json = JSON.parse(response); // Convert Json string to JavaScript Key-Value Object
          this.cityName = json['name'];
          //this.stringCurrent = json['main']['temp'];
          //this.currentTemp = ((parseInt(this.stringCurrent))-32)*(5/9);
          this.currentTemp = json['main']['temp'];
          //this.stringCurrent = json['main']['temp_max'];
          this.maxTemp = json['main']['temp_max'];
          //this.stringCurrent = json['main']['temp_min'];
          this.minTemp = json['main']['temp_min'];
          this.weatherDescription = json['weather']['0']['main'];

        //   console.log(data);
        //   console.log(json['name']);
        //   console.log(json['main']['temp']);
        //   console.log(json['main']['temp_max']);
        //   console.log(json['main']['temp_min']);
        //   console.log(json['weather']['0']['main']);
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
              max: 5,
              lineColor: '#efefef',
              tickColor: '#efefef',
              minorTickColor: 'transparent',
              tickPixelInterval: 1,
              tickInterval: 1,
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
                    to: 100,
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
                data: [this.powerData],
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
              min: 200,
              max: 1000,
              lineColor: '#efefef',
              tickColor: '#efefef',
              minorTickColor: 'transparent',
              tickPixelInterval: 200,
              tickInterval: 200,
              lineWidth: 2,
              labels: {
                  distance: -25,
                  rotation: 0
              },
              tickLength: 15,
              minorTickLength: 5,
              endOnTick: false,
                plotBands: [{
                    from: 200,
                    to: 1000,
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
              min: -40,
              max: 60,
              lineColor: '#efefef',
              tickColor: '#efefef',
              minorTickColor: 'transparent',
              tickPixelInterval: 20,
              tickInterval: 20,
              lineWidth: 2,
              labels: {
                  distance: -20,
                  rotation: 0
              },
              tickLength: 15,
              minorTickLength: 5,
              endOnTick: false,
                plotBands: [{
                    from: -40,
                    to: 60,
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
                    fontSize: 8
                },
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "MW",
                  fontColor: "grey",
                  fontSize: 10,
                  fontStyle: 'normal',
                  fontFamily: 'Lata'
                },
                ticks: {
                    beginAtZero: true,
                    fontSize: 8,
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
            backgroundColor: "rgba(22, 189, 231, 0.918)",
            data: y,
            }];
    }

    if(type === 2){
        config.type = 'line';
        config.data.datasets =   [{
            lineTension: 0.1,
            backgroundColor: "transparent",
            borderColor: "rgba(22, 189, 231, 0.918)",
            pointBackgroundColor: "rgba(22, 189, 231, 0.918)",
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
    let timeLabel = undefined;
    let l = dataSrc.length
    if( l >= 7){
        // for(let i = dataSrc.length; )
        dailyDataSrc = dataSrc.map(y =>{
            return Math.round(y.EnergyValue/1000000);
        });
        y = dailyDataSrc.slice(l-7, l);
        
        timeLabel = dataSrc.map(x =>{
            return moment(x.TimeStamp).format('D MMM');
        })
        x = timeLabel.slice(l-7, l);
    }
    else{
        y = dataSrc.map(y =>{
            return Math.round(y.EnergyValue/1000000);
        });
        x = dataSrc.map(x =>{
            return moment(x.TimeStamp).format('D MMM');
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
                gridLines : {
                    display : false
                },
                barPercentage: 0.5,
                ticks: {
                    fontSize: 8
                }
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "MW",
                  fontColor: "grey",
                  fontSize: 10,
                  fontStyle: 'normal',
                  fontFamily: 'Lata'
                },
                ticks: {
                    beginAtZero: true,
                    fontSize: 8,
                    stepSize: 3
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
            backgroundColor: "rgba(22, 189, 231, 0.918)",
            data: y,
            }];
    }
    if(type === 2){
        config.type = 'line';
        config.data.datasets =   [{
            lineTension: 0.1,
            backgroundColor: "transparent",
            borderColor: "rgba(22, 189, 231, 0.918)",
            pointBackgroundColor: "rgba(22, 189, 231, 0.918)",
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
    let x;
    let y;
    let timeLabel = undefined;
    let l = dataSrc.length
    if( l >= 12){
        // for(let i = dataSrc.length; )
        monthlyDataSrc = dataSrc.map(y =>{
            return Math.round(y.EnergyValue/1000000);
        });
        y = monthlyDataSrc.slice(l-11, l);
        
        timeLabel = dataSrc.map(x =>{
            return moment(x.TimeStamp).format('MMM');
        })
        x = timeLabel.slice(l-11, l);
    }
    else{
        y = dataSrc.map(y =>{
            return Math.round(y.EnergyValue/1000000);
        });
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
                    fontSize: 8
                },
              }],
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: "MW",
                  fontColor: "grey",
                  fontSize: 10,
                  fontStyle: 'normal',
                  fontFamily: 'Lata'
                },
                ticks: {
                    beginAtZero: true,
                    fontSize: 8,
                    stepSize: 3
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
                backgroundColor: "rgba(22, 189, 231, 0.918)",
                data: y,
            },
            {
                lineTension: 0.1,
                backgroundColor: "transparent",
                borderColor: "rgba(248, 94, 23, 0.918)",
                pointBackgroundColor: "rgba(248, 94, 23, 0.918)",
                data: [25, 20, 23, 23, 20, 22, 23, 26, 25, 25, 21],
                type: 'line'
            }
        ];
    }
    if(type === 2){
        config.type = 'line';
        config.data.datasets =   [{
                lineTension: 0.1,
                backgroundColor: "transparent",
                borderColor: "rgba(22, 189, 231, 0.918)",
                pointBackgroundColor: "rgba(22, 189, 231, 0.918)",
                data: y,
            },
            {
                lineTension: 0.1,
                backgroundColor: "transparent",
                borderColor: "rgba(248, 94, 23, 0.918)",
                pointBackgroundColor: "rgba(248, 94, 23, 0.918)",
                data: [25, 20, 23, 23, 20, 22, 23, 26, 25, 25, 21],
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
    let yearlyDataSrc = undefined;
    let x;
    let y;
    let timeLabel = undefined;
    let l = dataSrc.length
    if( l >= 6){
        // for(let i = dataSrc.length; )
        yearlyDataSrc = dataSrc.map(y =>{
            return Math.round(y.EnergyValue/1000000);
        });
        y = yearlyDataSrc.slice(l-6, l);
        
        timeLabel = dataSrc.map(x =>{
            return moment(x.TimeStamp).format('YYYY');
        })
        x = timeLabel.slice(l-6, l);
    }
    else{
        y = dataSrc.map(y =>{
            return Math.round(y.EnergyValue/1000000);
        });
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
                  labelString: "MW",
                  fontColor: "grey",
                  fontSize: 10,
                  fontStyle: 'normal',
                  fontFamily: 'Lata'
                },
                ticks: {
                    beginAtZero: true,
                    fontSize: 8,
                    stepSize: 3
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
                backgroundColor: "rgba(22, 189, 231, 0.918)",
                data: y
            },
            {
                lineTension: 0.1,
                backgroundColor: "transparent",
                borderColor: "rgba(248, 94, 23, 0.918)",
                pointBackgroundColor: "rgba(248, 94, 23, 0.918)",
                data: [18, 20],
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
                pointBackgroundColor: "rgba(22, 189, 231, 0.918)",
                borderColor: "rgba(22, 189, 231, 0.918)",
                data: y
            },
            {
                lineTension: 0.1,
                backgroundColor: "transparent",
                borderColor: "rgba(248, 94, 23, 0.918)",
                pointBackgroundColor: "rgba(248, 94, 23, 0.918)",
                data: [18, 20],
                type: 'line'
            }
        ];
    }

    setTimeout(() => {
        this.yearly = new Chart(this.yearlyCanvas.nativeElement, config);
    }, 100);
  }

}
