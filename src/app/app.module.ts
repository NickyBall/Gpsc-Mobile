import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps } from '@ionic-native/google-maps';
import { HttpClientModule } from '@angular/common/http';

import { MomentModule } from 'angular2-moment';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { WorldPage } from '../pages/world/world';
import { PlantPage } from '../pages/plant/plant';
import { InfoPage } from '../pages/info/info';
import { LayoutPage } from '../pages/layout/layout';
import { CountryServiceProvider } from '../providers/country-service/country-service';
import { SummaryPage } from '../pages/summary/summary';
import { CompanyProvider } from '../providers/company/company';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { PlantProvider } from '../providers/plant/plant';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    WorldPage,
    PlantPage,
    InfoPage,
    LayoutPage,
    SummaryPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MomentModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    WorldPage,
    PlantPage,
    InfoPage,
    LayoutPage,
    SummaryPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CountryServiceProvider,
    CompanyProvider,
    LoginServiceProvider,
    PlantProvider
  ]
})
export class AppModule {}
