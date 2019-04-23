import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

/*
  Generated class for the PlatformProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlatformService {

  // The unsanitized variable for width
  private platformWidth: number;
  // The sanitized safeStyle variable for width
  private platformWidthStyle: SafeStyle;

 // The unsanitized variable for height
  private platformHeight: number;
  // The sanitized safeStyle variable for height
  private platformheightStyle: SafeStyle;


  public resized: Boolean = false;

  constructor(public platform: Platform, private sanitizer: DomSanitizer) {
    this.setDimensions();

    this.platform.resize.subscribe(() => {
      this.setDimensions();
      this.triggerResize();
    });
  }

  setDimensions() {
    this.platformWidth = this.platform.width();
    this.platformHeight = this.platform.height();

    this.platformWidthStyle = this.sanitizer.bypassSecurityTrustStyle(this.platformWidth.toString());
    this.platformheightStyle = this.sanitizer.bypassSecurityTrustStyle(this.platformHeight.toString());
  }

  triggerResize() {

   handleResize(this, handleResize);

    function handleResize(plt: any, callback) {
      plt.resized = !plt.resized;

      if(plt.resized) {
        window.setTimeout(callback(plt), 1000);
      }
      return plt.resized;
    }
  }
}
