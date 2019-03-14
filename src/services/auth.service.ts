import { Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirebaseAnalytics } from '@ionic-native/firebase-analytics';

import { Genre } from '../shared/genre/genre.model';

@Injectable()
export class AuthService {
	public user: firebase.User;
	public users;
	public emailVerified = false;
	public juser;
	public genres: Genre[];
	private mFirebaseAnalytics: FirebaseAnalytics;

	constructor(public afAuth: AngularFireAuth, private db: AngularFirestore) {
		this.users = db.collection<any>('users');

		afAuth.authState.subscribe(user => {

			this.user = user;
		});

	}

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
	}

  signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
  }

  private oauthSignIn(provider: AuthProvider) {
  	if (!(<any>window).cordova) {
  		return this.afAuth.auth.signInWithPopup(provider);
  	} else {
  		return this.afAuth.auth.signInWithRedirect(provider)
  		.then(() => {
  			return this.afAuth.auth.getRedirectResult().then( result => {
  				// This gives you a Google Access Token.
  				// You can use it to access the Google API.
  				let token = (<any>result).credential.accessToken;
  				// The signed-in user info.
  				let user = result.user;
  				console.log(token, user);
  			}).catch(function(error) {
  				// Handle Errors here.
  				alert(error.message);
  			});
  		});
  	}
  }

  signOut(): Promise<void> {
  return this.afAuth.auth.signOut();
  }

  signUp(credentials) {
	return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
  }

  get authenticated(): boolean {
  return this.user !== null && this.user !== undefined;
  }

  getEmail() {
  return this.user && this.user.email;
  }

	updateUser(field, value) {
		this.users.doc(this.user.uid).update({
			[field]: value
		})
		console.log("user updated");
	}

	resetPassword(email: string) {
		return this.afAuth.auth.sendPasswordResetEmail(email);
	}

	verifyEmail() {
		if(!this.authenticated) {
			return;
		}

		return this.user.sendEmailVerification();
	}
}
