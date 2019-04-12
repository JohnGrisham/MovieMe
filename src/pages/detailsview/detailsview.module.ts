import { NgModule } from '@angular/core';
import { IonicPageModule, IonicModule } from 'ionic-angular';
import { DetailsviewPage } from './detailsview';
import { DetailstabsPageModule } from '../detailsview/detailstabs/detailstabs.module';

@NgModule({
  declarations: [
    DetailsviewPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsviewPage),
    IonicModule,
    DetailstabsPageModule,
  ],
})
export class DetailsviewPageModule {}
