import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  verificationError: string;
  verificationSent = false;

  constructor(private nav: NavController, private menu: MenuController, private auth: AuthService) {

  }

  login() {
  this.menu.close();
	this.auth.signOut();
	this.nav.setRoot(LoginPage);
  }

  logout() {
	this.menu.close();
	this.auth.signOut();
	this.nav.setRoot(LoginPage);
  }

  verifyUserEmail() {
    this.auth.verifyEmail().then(
      () => this.verificationSent = true,
        error => this.verificationError = error.message
    );
  }
}
