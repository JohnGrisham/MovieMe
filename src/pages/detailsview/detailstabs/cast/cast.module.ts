import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CastPage } from './cast';

@NgModule({
  declarations: [
    CastPage,
  ],
  imports: [
    IonicPageModule.forChild(CastPage),
  ],
})
export class CastPageModule {}
