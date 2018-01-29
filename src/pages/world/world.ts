import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions
} from '@ionic-native/google-maps';
import { PlantPage } from '../plant/plant';
import { CountryServiceProvider } from '../../providers/country-service/country-service';

/**
 * Generated class for the WorldPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-world',
  templateUrl: 'world.html',
})
export class WorldPage {
  map: GoogleMap;
  plantPage = PlantPage;
//   countryList = JSON.parse(`
//   [
//   {
//     "order": 1,
//     "name": "THAILAND",
//     "geolocation": {
//       "lat": 15.87,
//       "lng": 100.9925
//     },
//     "categories": [
//       {
//         "name": "powerPlant",
//         "imgUrl": "http://via.placeholder.com/50x50"
//       },
//       {
//         "name": "solarPlant",
//         "imgUrl": "http://via.placeholder.com/50x50"
//       }
//     ]
//   },
//   {
//     "order": 2,
//     "name": "LAOS",
//     "geolocation": {
//       "lat": 19.8563,
//       "lng": 102.4955
//     },
//     "categories": [
//       {
//         "name": "damPlant",
//         "imgUrl": "http://via.placeholder.com/50x50"
//       }
//     ]
//   },
//   {
//     "order": 3,
//     "name": "JAPAN",
//     "geolocation": {
//       "lat": 36.2048,
//       "lng": 138.2529
//     },
//     "categories": [
//       {
//         "name": "solarPlant",
//         "imgUrl": "http://via.placeholder.com/50x50"
//       }
//     ]
//   },
//   {
//     "order": 4,
//     "name": "USA",
//     "geolocation": {
//       "lat": 42.877742,
//       "lng": -97.380979
//     },
//     "categories": [
//       {
//         "name": "windPlant",
//         "imgUrl": "http://via.placeholder.com/50x50"
//       }
//     ]
//   },
//   {
//     "order": 5,
//     "name": "MYANMAR",
//     "geolocation": {
//       "lat": 21.9162,
//       "lng": 95.956
//     },
//     "categories": [
//       {
//         "name": "powerPlant",
//         "imgUrl": "http://via.placeholder.com/50x50"
//       },
//       {
//         "name": "damPlant",
//         "imgUrl": "http://via.placeholder.com/50x50"
//       }
//     ]
//   }
// ]`);
  countryList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMap: GoogleMaps, public countryProvider: CountryServiceProvider) {
    this.getCountryList();
  }

  getCountryList() {
    let param = {
      UserCode: "UserCode123456"
    };
    let UserCode = "UserCode123456";
    this.countryProvider.getAllCountry(UserCode).then(data => {
      this.countryList = data;
      console.log(data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorldPage');
    this.loadMap();
  }

  loadMap(){
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 15.87,
          lng: 100.9925
        },
        zoom: 1,
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

    this.map = this.googleMap.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        this.countryList.forEach((country) => {
          this.map.addMarker({
              title: country.name,
              icon: 'blue',
              animation: 'DROP',
              position: {
                lat: country.geolocation.lat,
                lng: country.geolocation.lng
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

  selectedCountry(item) {
    if (item.order == 1) {
      this.navCtrl.push(this.plantPage);
    } else {
      alert(item.name + ' has no data');
    }

  }

}
