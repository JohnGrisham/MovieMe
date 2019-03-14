import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpcomingPage } from './upcoming';

import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    UpcomingPage,
  ],
  imports: [
    IonicPageModule.forChild(UpcomingPage),
    ComponentsModule
  ],
})
export class UpcomingPageModule {}
