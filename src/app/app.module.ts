import { NgModule, ErrorHandler } from '@angular/core';
import { DatePipe } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ComponentsModule } from '../components/components.module';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicPageModule, IonicErrorHandler } from 'ionic-angular';
import { NgxErrorsModule } from '@ultimate/ngxerrors';
import { Geolocation } from '@ionic-native/geolocation';
import { CacheModule } from "ionic-cache";
import { MyApp } from './app.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreModule } from 'angularfire2/firestore'
import { firebaseConfig } from '../config';
import { AuthService } from '../services/auth.service';
import { LocService } from '../services/loc.service';
import { MoviedatabaseService } from '../services/moviedatabase.service';
import { InfiniteScrollService } from '../services/infinite-scroll.service';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { GenresPage } from '../pages/genres/genres';
import { DetailsviewPage } from '../pages/detailsview/detailsview';
import { ViewTrailerPage } from '../pages/viewtrailer/viewtrailer';
import { SearchviewPage } from '../pages/searchview/searchview';

import { DetailstabsPageModule } from '../pages/detailsview/detailstabs/detailstabs.module';
import { PopularPageModule } from '../pages/about/discover/popular/popular.module';
import { TopratedPageModule } from '../pages/about/discover/toprated/toprated.module';
import { UpcomingPageModule } from '../pages/about/discover/upcoming/upcoming.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PlatformService } from '../services/platform.service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    GenresPage,
    DetailsviewPage,
    ViewTrailerPage,
    SearchviewPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxErrorsModule,
    AngularFirestoreModule,
    ComponentsModule,
    DetailstabsPageModule,
    PopularPageModule,
    UpcomingPageModule,
    TopratedPageModule,
    AngularFireModule.initializeApp(firebaseConfig.fire),
    CacheModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages: true,
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignupPage,
    GenresPage,
    DetailsviewPage,
    ViewTrailerPage,
    SearchviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    AuthService,
    LocService,
    MoviedatabaseService,
    InfiniteScrollService,
    PlatformService,
    AngularFireAuth,
    AngularFirestore,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
