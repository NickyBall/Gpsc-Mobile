import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlantPage } from './plant';

@NgModule({
  declarations: [
    PlantPage
  ],
  imports: [
    IonicPageModule.forChild(PlantPage),
  ],
})
export class PlantPageModule {}
