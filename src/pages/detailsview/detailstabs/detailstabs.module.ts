import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailstabsPage } from './detailstabs';

@NgModule({
  declarations: [
    DetailstabsPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailstabsPage),
  ],
  exports: [ DetailstabsPage ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailstabsPageModule {}
