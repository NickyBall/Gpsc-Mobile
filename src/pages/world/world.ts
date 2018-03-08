import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  loader: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public countryProvider: CountryServiceProvider, public loadingCtrl: LoadingController) {
    this.loader = this.loadingCtrl.create({
      content: "Loading Country..."
    })
  }

  getCountryList() {
    let UserCode = "UserCode123456";
    this.countryProvider.getAllCountry(UserCode).then((data: any) => {
      this.countryList = data.Result;
      this.loader.dismiss();
      console.log(data);
      this.countryList.forEach((country) => {
        this.map.addMarker({
            title: country.name,
            icon: {
              url: './assets/imgs/pin1.png',
              size: {
                width: 28,
                height: 35
              }
            },
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
    this.loader.present();
    this.loadMap();
    // Comment this when deploy
    // this.getCountryList();
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
        {elementType: 'labels.text.fill', stylers: [{color: 'silver'}]},
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
            },
            {
              "color":"silver"
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

    this.map = GoogleMaps.create('map_canvas', mapOptions);
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');
        // Uncomment this when deploy
        this.getCountryList();
      });
  }

  selectedCountry(item) {
    if (item.CountryId == 1) {
      this.navCtrl.push(this.plantPage, { country: item.CountryName});
    } else {
      alert(item.name + ' has no data');
    }

  }

}
