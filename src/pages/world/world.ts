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
  countryList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMap: GoogleMaps, public countryProvider: CountryServiceProvider) {
    
  }

  getCountryList() {
    let UserCode = "UserCode123456";
    this.countryProvider.getAllCountry(UserCode).then(data => {
      this.countryList = data;
      
      console.log(data);
      this.countryList.forEach((country) => {
        this.map.addMarker({
            title: country.name,
            icon: 'blue',
            animation: 'DROP',
            position: {
              lat: country.Location.Lat,
              lng: country.Location.Lng
            }
          }).then(marker => {
            marker.on(GoogleMapsEvent.MARKER_CLICK)
              .subscribe(() => {
                // alert('clicked');
              });
          });
      });
      // Wait the MAP_READY before using any methods.
      
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
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        this.getCountryList();
      });
  }

  selectedCountry(item) {
    if (item.CountryId == 1) {
      this.navCtrl.push(this.plantPage);
    } else {
      alert(item.name + ' has no data');
    }

  }

}
