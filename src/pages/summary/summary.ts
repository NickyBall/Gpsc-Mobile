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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.powerGenGraph();
  }

  powerGenGraph() {
    this.gaugeChart = HighCharts.chart('gauge-chart', {
        
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
    
        title: {
            text: 'Speedometer'
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
            name: 'Speed',
            data: [3.5],
            dataLabels: false,
            tooltip: {
                valueSuffix: ' km/h'
            }
        }],

        credits: {
          enabled: false
      },
    
    });
  }

  segmentClick(selectedSection) {
    
  }

}
