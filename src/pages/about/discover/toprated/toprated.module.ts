import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TopratedPage } from './toprated';

import { ComponentsModule } from '../../../../components/components.module';

@NgModule({
  declarations: [
    TopratedPage,
  ],
  imports: [
    IonicPageModule.forChild(TopratedPage),
    ComponentsModule
  ],
})
export class TopratedPageModule {}
