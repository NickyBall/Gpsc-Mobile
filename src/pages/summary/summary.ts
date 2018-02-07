import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  selectedSection = 'powerGenerationTab';
  gaugeChart: any;
  hc: any;
  powerIcon: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.powerIcon = "assets/imgs/b3.png";  // temp

  }

  segmentClick(selectedSection) {
    this.gaugeChart = HighCharts.chart('power-chart', {
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            height: '110%',
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
            data: [3.5],
            dataLabels: false,
            tooltip: {
                valueSuffix: ' MW'
            }
        }],

        dataLabels: {
            enabled: true,
            useHTML: true,
            formatter: function() {
                return '<p>OK</p>';
            }
        },
        credits: {
            enabled: false
        },
    
    })
  }

}
