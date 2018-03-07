import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions
} from '@ionic-native/google-maps';
import { HomePage } from '../home/home';
import { CompanyProvider } from '../../providers/company/company';

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
  selectedSection = 'tabButtonTwo';
  tabOneImg = './assets/imgs/i3.png';
  tabTwoImg = './assets/imgs/i2.png';
  solarList: any;
  streamList: any;
  loader: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMap: GoogleMaps, public companyProvider: CompanyProvider, public loadingCtrl: LoadingController) {
    this.loader = this.loadingCtrl.create({
      content: "Loading Power Plant..."
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlantPage');
    this.loadMap();
    this.loader.present();
    // Comment this when deploy.
    this.getPlantList();
  }

  getPlantList() {
    let UserCode = 'UserCode123456';
    let CountryId = 1;
    this.companyProvider.getAllPlants(UserCode, CountryId).then((data: any) => {
      this.streamList = data.Result.filter(plant => plant.PlantType == "Stream Plant");
      this.solarList = data.Result.filter(plant => plant.PlantType == "Solar Plant");
      // console.log(data);
      this.loader.dismiss();
      // Uncomment this when deploy.
      // this.updateMarker(this.solarList);
    })
  }

  updateMarker(plantList) {
    this.map.clear();
    plantList.forEach((plant) => {
      this.map.addMarker({
        title: plant.name,
        icon: {
          url: './assets/imgs/pin1.png',
          size: {
            width: 28,
            height: 35
          }
        },
        animation: 'DROP',
        position: {
          lat: plant.Location.Lat,
          lng: plant.Location.Lng
        }
      }).then(marker => {
        marker.on(GoogleMapsEvent.MARKER_CLICK)
          .subscribe(() => {
            // alert('clicked');
          });
      });
    });
  }

  segmentClick(selectedSection) {
    this.tabOneImg = './assets/imgs/i3.png';
    this.tabTwoImg = './assets/imgs/i1.png';
    if (selectedSection == 'tabButtonOne') {
      this.tabOneImg = './assets/imgs/i4.png';
      // UnComment this when deploy
      // this.updateMarker(this.streamList);
    } else if (selectedSection == 'tabButtonTwo') {
      this.tabTwoImg = './assets/imgs/i2.png';
      // Uncomment this when deploy
      // this.updateMarker(this.solarList);
    }
  }

  loadMap() {
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
          "featureType": "all",
          "elementType": "all",
          "stylers": [
            {
              "hue": "#e7ecf0"
            }
          ]
        },
        {
          "featureType": "administrative.province",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "landscape",
          "elementType": "all",
          "stylers": [
            {
              "gamma": "3.62"
            },
            {
              "lightness": "-2"
            },
            {
              "saturation": "-46"
            },
            {
              "weight": "1.39"
            },
            {
              "visibility": "on"
            },
            {
              "color": "#ededed"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "all",
          "stylers": [
            {
              "saturation": "-61"
            },
            {
              "visibility": "on"
            },
            {
              "lightness": "20"
            },
            {
              "gamma": "1.10"
            },
            {
              "weight": "1.99"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry",
          "stylers": [
            {
              "weight": "0.99"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "all",
          "stylers": [
            {
              "visibility": "simplified"
            },
            {
              "saturation": "-45"
            },
            {
              "gamma": "1"
            },
            {
              "lightness": "-4"
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
        // this.getPlantList();
      });
  }

  selectedPlant(item) {
    // if (item.PlantId == 5) {
    //   this.navCtrl.push(this.homePage);
    // } else {
    //   alert (item.name + ' has no data.');
    // }
    this.navCtrl.push(this.homePage, { plantId: item.PlantId });
  }

}
