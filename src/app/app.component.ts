import { Component, ViewChild } from '@angular/core';
import { App, MenuController, Nav, Platform } from 'ionic-angular';
import { CacheService } from "ionic-cache";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AuthService } from '../services/auth.service';
import { LocService } from '../services/loc.service';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { GenresPage } from '../pages/genres/genres';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  pages;
  rootPage;

  private app;
  private platform;
  private menu: MenuController;
  private auth: AuthService;
  private cache: CacheService;
  private loc: LocService;

  @ViewChild(Nav) nav: Nav;

  constructor(app: App, platform: Platform, menu: MenuController, private statusBar: StatusBar, splashScreen: SplashScreen, auth: AuthService, loc: LocService, cache: CacheService) {
      this.menu = menu;
      this.app = app;
      this.platform = platform;
      this.auth = auth;
      this.loc = loc;
      this.cache = cache;

      this.cache.setDefaultTTL(60 * 60);

      statusBar.styleDefault();
      splashScreen.hide();
      this.initializeApp();
  }

  initializeApp() {
			this.platform.ready().then(() => {
				this.statusBar.styleDefault();
			});

			this.auth.afAuth.authState
				.subscribe(
					user => {
						if (user) {
              this.auth.users.doc(user.uid).get().toPromise().then(doc => {
      					if(doc.exists) {
      						this.auth.genres = doc.get('genres');

                  console.log("user: ", user.uid);
      						console.log("genres found", this.auth.genres.length);
                  this.rootPage = TabsPage;
      					} else {
                  this.auth.genres = []
      						this.auth.users.doc(user.uid).set({
      							name: user.displayName,
      							email: user.email,
      							genres: this.auth.genres
      						})
      						console.log("user Initialized");
                  console.log("genres ", this.auth.genres.length);
                  this.rootPage = GenresPage;
      					}
      				}, this.rootPage = LoginPage).catch(err => {
      					console.log("subscribe error: ", err);
      				})
						} else {
							this.rootPage = LoginPage;
						}
					},
					() => {
						this.rootPage = LoginPage;
					}
				);
	}
}
