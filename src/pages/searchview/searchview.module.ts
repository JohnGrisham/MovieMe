import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchviewPage } from './searchview';

@NgModule({
  declarations: [
    SearchviewPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchviewPage),
  ],
})
export class SearchviewPageModule {}
