import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, IonicPage } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../services/auth.service';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	loginForm: FormGroup;
	loginError: string;

  forgotPassForm: FormGroup;
  resetError: string;

  resetEmailSent = false;
  showReset = false;

	constructor(
		private navCtrl: NavController,
		private auth: AuthService,
		fb: FormBuilder
	) {
		this.loginForm = fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
			password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
		});

    this.forgotPassForm = fb.group({
			email_reset: ['', Validators.compose([Validators.required, Validators.email])]
		});
	}


  login() {
  		let data = this.loginForm.value;

  		if (!data.email) {
  			return;
  		}

  		let credentials = {
  			email: data.email,
  			password: data.password
  		};
  		this.auth.signInWithEmail(credentials)
  			.then(
  				() => this.navCtrl.setRoot(TabsPage),
  				error => this.loginError = error.message
  			);
  	}

    signup(){
      this.navCtrl.push(SignupPage);
    }

    loginWithGoogle() {
      (<any>this.auth.signInWithGoogle())
        .then(
          () => this.navCtrl.setRoot(TabsPage),
          error => console.log(error.message)
        );
    }

    sendResetLink() {
      let data = this.forgotPassForm.value;

      if(!data.email_reset) {
        return;
      }

      this.auth.resetPassword(data.email_reset).then(
        () => this.resetEmailSent = true,
        error => this.resetError = error.message
      );
    }
}
