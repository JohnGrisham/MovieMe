import { NgModule } from '@angular/core';
import { GoogleMapComponent } from '../components/google-maps/google-maps';
import { MovieSliderComponent } from './movieslides/movieslider';
import { IonicModule } from 'ionic-angular';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { MovielistComponent } from './movielist/movielist';

@NgModule({
	declarations: [GoogleMapComponent, MovieSliderComponent,
    MovielistComponent],
	imports: [ IonicModule,
		 NgCircleProgressModule.forRoot({
		// set defaults here
		radius: 100,
		outerStrokeWidth: 16,
		innerStrokeWidth: 8,
		outerStrokeColor: "#78C000",
		innerStrokeColor: "#C7E596",
		animationDuration: 300,
		subtitle: "Movie Rating"
	})
	],
	exports: [GoogleMapComponent, MovieSliderComponent, NgCircleProgressModule,
    MovielistComponent]
})
export class ComponentsModule {}
