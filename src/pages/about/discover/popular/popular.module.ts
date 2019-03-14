import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopularPage } from './popular';

import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    PopularPage,
  ],
  imports: [
    IonicPageModule.forChild(PopularPage),
    ComponentsModule
  ],
})
export class PopularPageModule {}
