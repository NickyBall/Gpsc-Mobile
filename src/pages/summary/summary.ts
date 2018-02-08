import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import * as HighCharts from 'highcharts';
import * as HighchartsMore from 'highcharts/highcharts-more';
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

  selectedSection = 'powerGenerationTab';

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


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidEnter() {
    this.powerIcon = "assets/imgs/Elect.png";
    this.irradiationIcon = "assets/imgs/Sun.png";
    this.ambientIcon = "assets/imgs/Temp.png";

    this.powerGenGraph();

    this.powerData = 3.5;
    this.irradiationData = 700;
    this.ambientTempData = 30;
    // console.log(this.irradChart);
    // this.irradiationGraph();
    // this.ambientTemperatureGraph();
    // this.enegyGenerationGraph();
    // this.generationSummaryGraph();
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
    setTimeout(() => {
        this.hourlyGraph();
    }, 500);
  }

  hourlyGraph(){
    setTimeout(() => {
        this.hourly = new Chart(this.hourlyCanvas.nativeElement, {     
            type: 'bar',
            data: {
              labels: ["7am", "8am", "9am", "10am", "11am", "12am", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm"],
              datasets: [
                  {
                  lineTension: 0.1,
                  backgroundColor: "rgba(22, 189, 231, 0.918)",
                  data: [22, 32, 34, 16, 32, 40, 35, 34, 29, 30, 31, 21],
                  }
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
                  }]
                  }
             }
     
        });
    }, 100);
  }

  dailyGraph(){
    setTimeout(() => {
        this.dialy = new Chart(this.dailyCanvas.nativeElement, {     
            type: 'bar',
            data: {
              labels: ["7Jan", "8Jan", "9Jan", "10Jan", "11Jan", "12Jan", "1Jan"],
              datasets: [
                  {
                  lineTension: 0.1,
                  backgroundColor: "rgba(22, 189, 231, 0.918)",
                  data: [22, 32, 34, 16, 32, 40, 35],
                  }
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
                  }]
                  }
             }

        });
    }, 100);
  }

  monthlyGraph(){
    setTimeout(() => {
        this.monthly = new Chart(this.monthlyCanvas.nativeElement, {     
            type: 'bar',
            data: {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              datasets: [
                  {
                  lineTension: 0.1,
                  backgroundColor: "rgba(22, 189, 231, 0.918)",
                  data: [22, 14, 34, 16, 32, 40, 33, 20, 29, 30, 35, 21],
                  }
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
                  }]
                  }
             }

        });
    }, 100);
  }

  yearlyGraph(){
    setTimeout(() => {
        this.yearly = new Chart(this.yearlyCanvas.nativeElement, {     
            type: 'bar',
            data: {
              labels: ["2015", "2016", "2017", "2018"],
              datasets: [
                  {
                  lineTension: 0.1,
                  backgroundColor: "rgba(22, 189, 231, 0.918)",
                  data: [22, 32, 34, 16],
                  }
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
                  }]
                  }
             }

        });
    }, 100);
  }

  generationSummaryGraph() {
  }

}
