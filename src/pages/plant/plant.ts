import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions
} from '@ionic-native/google-maps';
import { HomePage } from '../home/home';
import { PlantProvider } from '../../providers/plant/plant';

/**
 * Generated class for the PlantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plant',
  templateUrl: 'plant.html',
})
export class PlantPage {
  map: GoogleMap;
  homePage = HomePage;
  plantList = JSON.parse(`
    [
      {
        "order": 1,
        "name": "RPCL",
        "imgUrl": "http://via.placeholder.com/50x50",
        "power": [
          {
            "name": "electricPower",
            "values": [
              {
                "value": 1400,
                "unit": "MW"
              }
            ]
          }
        ],
        "sharities": [
          {
            "name": "GPSC",
            "stock": 15
          }
        ],
        "geolocation": {
          "lat": 17.573643,
          "lng": 99.219517
        }
      },
      {
        "order": 2,
        "name": "IRPC CLEAN POWER",
        "imgUrl": "http://via.placeholder.com/50x50",
        "power": [
          {
            "name": "electricPower",
            "values": [
              {
                "value": 240,
                "unit": "MW"
              }
            ]
          },
          {
            "name": "steamPower",
            "values": [
              {
                "value": "180-300",
                "unit": "T/H"
              }
            ]
          }
        ],
        "sharities": [
          {
            "name": "GPSC",
            "stock": 51
          }
        ],
        "geolocation": {
          "lat": 14.823936,
          "lng": 102.430339
        }
      },
      {
        "order": 3,
        "name": "NNEG",
        "imgUrl": "http://via.placeholder.com/50x50",
        "power": [
          {
            "name": "electricPower",
            "values": [
              {
                "value": 125,
                "unit": "MW"
              }
            ]
          },
          {
            "name": "steamPower",
            "values": [
              {
                "value": 30,
                "unit": "T/H"
              }
            ]
          }
        ],
        "sharities": [
          {
            "name": "GPSC",
            "stock": 30
          }
        ],
        "geolocation": {
          "lat": 13.224339,
          "lng": 101.47577
        }
      },
      {
        "order": 4,
        "name": "BIC",
        "imgUrl": "http://via.placeholder.com/50x50",
        "power": [
          {
            "name": "electricPower",
            "values": [
              {
                "value": 117,
                "unit": "MW"
              },
              {
                "value": 117,
                "unit": "MW"
              }
            ]
          },
          {
            "name": "steamPower",
            "values": [
              {
                "value": 20,
                "unit": "T/H"
              },
              {
                "value": 20,
                "unit": "T/H"
              }
            ]
          }
        ],
        "sharities": [
          {
            "name": "GPSC",
            "stock": 25
          }
        ],
        "geolocation": {
          "lat": 13.47764,
          "lng": 99.436464
        }
      },
      {
        "order": 5,
        "name": "CHPP",
        "imgUrl": "http://via.placeholder.com/50x50",
        "power": [
          {
            "name": "electricPower",
            "values": [
              {
                "value": 5,
                "unit": "MW"
              }
            ]
          },
          {
            "name": "steamPower",
            "values": [
              {
                "value": "12,000",
                "unit": "RT"
              }
            ]
          }
        ],
        "sharities": [
          {
            "name": "GPSC",
            "stock": 100
          }
        ],
        "geolocation": {
          "lat": 10.933347,
          "lng": 99.176127
        }
      }
    ]
    `);

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              private googleMap: GoogleMaps,
              public plantProvider: PlantProvider) {
  }

  selectedPlant(item){
    this.plantProvider.requestPlant(item.order)
      .then(data => {
        this.navCtrl.push(this.homePage, { plantData:data });
      });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad PlantPage');
    this.loadMap();
  }

  loadMap(){
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 15.87,
          lng: 100.9925
        },
        zoom: 4,
        tilt: 0
      },
      styles: [
        {
          "featureType":"all",
          "elementType":"all",
          "stylers":[
            {
              "hue":"#e7ecf0"
            }
          ]
        },
        {
          "featureType":"administrative.province",
          "elementType":"all",
          "stylers":[
            {
              "visibility":"off"
            }
          ]
        },
        {
          "featureType":"landscape",
          "elementType":"all",
          "stylers":[
            {
              "gamma":"3.62"
            },
            {
              "lightness":"-2"
            },
            {
              "saturation":"-46"
            },
            {
              "weight":"1.39"
            },
            {
              "visibility":"on"
            },
            {
              "color":"#ededed"
            }
          ]
        },
        {
          "featureType":"poi",
          "elementType":"all",
          "stylers":[
            {
              "visibility":"off"
            }
          ]
        },
        {
          "featureType":"road",
          "elementType":"all",
          "stylers":[
            {
              "saturation":"-61"
            },
            {
              "visibility":"on"
            },
            {
              "lightness":"20"
            },
            {
              "gamma":"1.10"
            },
            {
              "weight":"1.99"
            }
          ]
        },
        {
          "featureType":"road",
          "elementType":"geometry",
          "stylers":[
            {
              "weight":"0.99"
            }
          ]
        },
        {
          "featureType":"road",
          "elementType":"labels",
          "stylers":[
            {
              "visibility":"off"
            }
          ]
        },
        {
          "featureType":"transit",
          "elementType":"all",
          "stylers":[
            {
              "visibility":"off"
            }
          ]
        },
        {
          "featureType":"water",
          "elementType":"all",
          "stylers":[
            {
              "visibility":"simplified"
            },
            {
              "saturation":"-45"
            },
            {
              "gamma":"1"
            },
            {
              "lightness":"-4"
            }
          ]
        }
      ]
    };

    this.map = this.googleMap.create('map_canvas2', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        this.plantList.forEach((plant) => {
          this.map.addMarker({
              title: plant.name,
              icon: 'blue',
              animation: 'DROP',
              position: {
                lat: plant.geolocation.lat,
                lng: plant.geolocation.lng
              }
            })
            .then(marker => {
              marker.on(GoogleMapsEvent.MARKER_CLICK)
                .subscribe(() => {
                  // alert('clicked');
                });
            });
        });

      });
  }

}
