webpackJsonp([7],{

/***/ 105:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_google_maps_google_maps__ = __webpack_require__(491);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__movieslides_movieslider__ = __webpack_require__(813);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_circle_progress__ = __webpack_require__(859);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__movielist_movielist__ = __webpack_require__(860);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var ComponentsModule = /** @class */ (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [__WEBPACK_IMPORTED_MODULE_1__components_google_maps_google_maps__["a" /* GoogleMapComponent */], __WEBPACK_IMPORTED_MODULE_2__movieslides_movieslider__["a" /* MovieSliderComponent */],
                __WEBPACK_IMPORTED_MODULE_5__movielist_movielist__["a" /* MovielistComponent */]],
            imports: [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["d" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_4_ng_circle_progress__["a" /* NgCircleProgressModule */].forRoot({
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
            exports: [__WEBPACK_IMPORTED_MODULE_1__components_google_maps_google_maps__["a" /* GoogleMapComponent */], __WEBPACK_IMPORTED_MODULE_2__movieslides_movieslider__["a" /* MovieSliderComponent */], __WEBPACK_IMPORTED_MODULE_4_ng_circle_progress__["a" /* NgCircleProgressModule */],
                __WEBPACK_IMPORTED_MODULE_5__movielist_movielist__["a" /* MovielistComponent */]]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 107:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LocService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_moviedatabase_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_cache__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LocService = /** @class */ (function () {
    function LocService(http, auth, mdata, geoloc, cache) {
        this.http = http;
        this.auth = auth;
        this.mdata = mdata;
        this.geoloc = geoloc;
        this.cache = cache;
        this.mapsLoaded = false;
        this.location = { city: null, state: null };
        this.nearbyTheaters = [];
    }
    LocService.prototype.getLocation = function () {
        if (this.auth.authenticated) {
            return this.geoloc.getCurrentPosition();
        }
    };
    LocService.prototype.getCoords = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getLocation().then(function (pos) {
                _this.coords = pos.coords;
                resolve(pos.coords);
                console.log(_this.coords);
            });
        });
    };
    LocService.prototype.reverseGeocode = function (coordinates) {
        if (!coordinates) {
            return;
        }
        return this.http.get("http://www.mapquestapi.com/geocoding/v1/reverse?key=v6MTmZEFef30SZQH9AWSFlmKFpnM6Chz&location=" + coordinates.latitude + "," + coordinates.longitude + "&includeRoadMetadata=true&includeNearestIntersection=true");
    };
    LocService.prototype.lookupLocation = function () {
        var _this = this;
        this.http.get("http://www.mapquestapi.com/geocoding/v1/reverse?key=v6MTmZEFef30SZQH9AWSFlmKFpnM6Chz&location=" + this.coords.latitude + "," + this.coords.longitude + "&includeRoadMetadata=true&includeNearestIntersection=true")
            .toPromise()
            .then(function (response) { return response = response.json().results; })
            .then(function (response) { return response = _this.arrayToObject(response).result; })
            .then(function (response) { return _this.arrayToObject(response.locations); })
            .then(function (response) { return _this.preciseLocation = response.result; })
            .then(function () { return _this.zipSearch(); })
            .then(function () { return _this.nearbyShows(); })
            .then(function () { return _this.timeZoneSearch(_this.coords.latitude, _this.coords.longitude, new Date()); });
    };
    LocService.prototype.zipSearch = function () {
        var _this = this;
        if (!this.preciseLocation) {
            return;
        }
        return new Promise(function (resolve, reject) {
            _this.zip = _this.preciseLocation.postalCode.substring(0, 5);
            _this.http.get("http://api.zippopotam.us/us/" + _this.zip)
                .toPromise()
                .then(function (response) { return _this.arrayToObject(response.json().places); })
                .then(function (response) {
                var city = response.result["place name"];
                var state = response.result["state"];
                _this.location['city'] = city;
                _this.location['state'] = state;
            }), function (err) {
                reject("Unable to find location");
            };
            resolve(true);
        });
    };
    LocService.prototype.timeZoneSearch = function (lat, long, date) {
        var timestamp = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
        this.http.get("https://maps.googleapis.com/maps/api/timezone/json?location=" + lat + "," + long + "&key=AIzaSyBKM9opS6Z9K3HCe7mZzviapQyrpnfy_vw")
            .toPromise()
            .then(function (response) { return console.log(response); });
    };
    LocService.prototype.nearbyShows = function () {
        var _this = this;
        var nearbyShowings = [];
        var posterPromises = [];
        if (this.zip) {
            this.mdata.lookUpnearbyShows(this.zip).toPromise()
                .then(function (response) {
                var status = response.status;
                var contentLength = response._body.length;
                if (contentLength > 0 && status == 200) {
                    for (var i in response.json()) {
                        nearbyShowings.push(response.json()[i]);
                        console.log(response.json()[i]);
                    }
                }
                else {
                    console.log("No Results");
                    return;
                }
            }, function (res) { return console.log(res.status, res._body); }).then(function () {
                for (var i in nearbyShowings) {
                    posterPromises.push(resolvePosters(_this.mdata.movieSearch(nearbyShowings[i].title.replace(/3D|2D/gi, '')), i));
                }
                Promise.all(posterPromises)
                    .then(function () { return _this.mdata.nearbyShowings = Object.assign([], nearbyShowings); });
            });
        }
        function resolvePosters(obserable, number) {
            return new Promise(function (resolve, reject) {
                obserable.toPromise()
                    .then(function (result) {
                    if (result.json().results.length > 0) {
                        nearbyShowings[number].poster_path = result.json().results[0].poster_path;
                        nearbyShowings[number].id = result.json().results[0].id;
                    }
                    resolve();
                });
            });
        }
    };
    LocService.prototype.arrayToObject = function (array) {
        var object = array.reduce(function (obj, item) {
            obj["result"] = item;
            return obj;
        }, {});
        return object;
    };
    LocService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__services_moviedatabase_service__["a" /* MoviedatabaseService */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_geolocation__["a" /* Geolocation */], __WEBPACK_IMPORTED_MODULE_5_ionic_cache__["b" /* CacheService */]])
    ], LocService);
    return LocService;
}());

//# sourceMappingURL=loc.service.js.map

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenresPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_moviedatabase_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(92);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the GenresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var GenresPage = /** @class */ (function () {
    function GenresPage(navCtrl, navParams, auth, mdata) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.auth = auth;
        this.mdata = mdata;
    }
    GenresPage.prototype.ionViewDidLoad = function () {
        console.log(this.auth.genres);
    };
    GenresPage.prototype.genreToggle = function (genre) {
        if (this.auth.genres != undefined && this.auth.authenticated) {
            var userGenre = { name: genre, id: 0 };
            var gIndex = this.findWithAttr(this.auth.genres, 'name', userGenre.name);
            console.log(gIndex);
            if (gIndex > -1) {
                this.auth.genres.splice(gIndex, 1);
            }
            else {
                this.auth.genres.push(userGenre);
            }
            console.log(this.auth.genres);
        }
    };
    GenresPage.prototype.genreActive = function (genre) {
        if (this.auth.genres != undefined && this.auth.authenticated) {
            var userGenre = { name: genre, id: 0 };
            var active = false;
            this.findWithAttr(this.auth.genres, 'name', userGenre.name) > -1 ? active = !active : active;
            return active;
        }
    };
    GenresPage.prototype.finished = function () {
        var _this = this;
        this.mdata.setGenreIds(this.auth.genres)
            .then(function () { return _this.auth.updateUser('genres', _this.auth.genres); });
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
    };
    GenresPage.prototype.skip = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]);
    };
    GenresPage.prototype.findWithAttr = function (array, attr, value) {
        for (var i = 0; i < array.length; i += 1) {
            if (array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    };
    GenresPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-genres',template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\pages\genres\genres.html"*/'<!--\n\n  Generated template for the GenresPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n\n\n  <ion-navbar hideBackButton="true" >\n\n    <ion-title>genres</ion-title>\n\n  </ion-navbar>\n\n\n\n</ion-header>\n\n\n\n\n\n<ion-content padding>\n\n  <ion-item>\n\n    <button ion-button (click)="genreToggle(\'Horror\')" [ngClass]="genreActive(\'Horror\') ? \'active\' : \'inactive\'">Horror</button>\n\n  </ion-item>\n\n  <ion-item>\n\n    <button ion-button (click)="genreToggle(\'Comedy\')" [ngClass]="genreActive(\'Comedy\') ? \'active\' : \'inactive\'">Comedy</button>\n\n  </ion-item>\n\n  <ion-item>\n\n    <button ion-button (click)="genreToggle(\'Action\')" [ngClass]="genreActive(\'Action\') ? \'active\' : \'inactive\'">Action</button>\n\n  </ion-item>\n\n\n\n  <button ion-button (click)="finished()">Take me to the movies!</button>\n\n  <button ion-button (click)="skip()">Skip for now</button>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\pages\genres\genres.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_3__services_moviedatabase_service__["a" /* MoviedatabaseService */]])
    ], GenresPage);
    return GenresPage;
}());

//# sourceMappingURL=genres.js.map

/***/ }),

/***/ 220:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ViewTrailerPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(40);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ViewtrailerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ViewTrailerPage = /** @class */ (function () {
    function ViewTrailerPage(navCtrl, navParams, domSanitizer) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.domSanitizer = domSanitizer;
        this.movie = this.navParams.data;
        this.video = { link: "http://youtube.com/embed/", trustedVideoUrl: undefined };
    }
    ViewTrailerPage.prototype.ionViewDidLoad = function () {
        this.video["link"] = this.video["link"].concat('', this.movie.videos.results[0].key);
        this.video["trustedVideoUrl"] = this.domSanitizer.bypassSecurityTrustResourceUrl(this.video["link"]);
    };
    ViewTrailerPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-viewtrailer',template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\pages\viewtrailer\viewtrailer.html"*/'<!--\n\n  Generated template for the ViewtrailerPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{movie.title}} Trailer</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n<div class="video-frame">\n\n<iframe class="video" [src]="video.trustedVideoUrl" frameborder="0" allowfullscreen></iframe>\n\n</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\pages\viewtrailer\viewtrailer.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["c" /* DomSanitizer */]])
    ], ViewTrailerPage);
    return ViewTrailerPage;
}());

//# sourceMappingURL=viewtrailer.js.map

/***/ }),

/***/ 221:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_moviedatabase_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_detailsview_detailsview__ = __webpack_require__(93);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SearchviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchviewPage = /** @class */ (function () {
    function SearchviewPage(navCtrl, navParams, mdata) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mdata = mdata;
        this.titleQuery = this.navParams.get('Query');
        this.sendBackCurrent = this.navParams.get('Callback');
    }
    SearchviewPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchviewPage');
    };
    SearchviewPage.prototype.ionViewDidLeave = function () {
        this.sendBackCurrent(this.titleQuery);
    };
    SearchviewPage.prototype.pushDetails = function (movie) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_detailsview_detailsview__["a" /* DetailsviewPage */], movie);
    };
    SearchviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-searchview',template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\pages\searchview\searchview.html"*/'<!--\n\n  Generated template for the SearchviewPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Showing results for: {{titleQuery}}</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <ion-list>\n\n    <ion-item *ngFor="let movie of mdata.movies">\n\n      <div class="movie">\n\n          <a (click)="pushDetails(movie)">\n\n          <img src="{{movie.poster_path ? \'https://image.tmdb.org/t/p/original\' + movie.poster_path : \'/assets/imgs/no_image.jpg\'}}" class="poster">\n\n          </a>\n\n          <circle-progress\n\n          [percent]="movie.vote_average * 10"\n\n          [animation]="false"\n\n          [radius]="45"></circle-progress>\n\n          <div padding bold class="title">{{movie.title}}</div>\n\n          <div padding class="release-date">{{movie.release_date}}</div>\n\n          <p padding class="overview">{{movie.overview}}</p>\n\n      </div>\n\n    </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\pages\searchview\searchview.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_moviedatabase_service__["a" /* MoviedatabaseService */]])
    ], SearchviewPage);
    return SearchviewPage;
}());

//# sourceMappingURL=searchview.js.map

/***/ }),

/***/ 222:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__capacitor_core__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_movie_movie_model__ = __webpack_require__(839);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_loc_service__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_moviedatabase_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__genres_genres__ = __webpack_require__(125);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var Browser = __WEBPACK_IMPORTED_MODULE_2__capacitor_core__["a" /* Plugins */].Browser;
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, auth, loc, mdata, cd, platform) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.loc = loc;
        this.mdata = mdata;
        this.cd = cd;
        this.platform = platform;
        this.suggestionsTemporary = [];
        if (this.auth.authenticated) {
            this.mdata.getGenreIds()
                .toPromise()
                .then(function (res) { return _this.mdata.genreList = res.json().genres; })
                .then(function () { return _this.getNowPlaying(); });
            if (this.auth.genres && this.mdata.genreList) {
                if (this.auth.genres.length < 1) {
                    this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__genres_genres__["a" /* GenresPage */]);
                }
            }
            this.loc.getCoords()
                .then(function () { return _this.loc.lookupLocation(); });
            var resultsSliced_1;
            if (this.auth.genres) {
                for (var x = 0; x < this.auth.genres.length; x++) {
                    this.mdata.genreSuggestions(this.auth.genres[x])
                        .toPromise()
                        .then(function (res) {
                        resultsSliced_1 = res.json().results.slice(0, 10);
                        resultsSliced_1.forEach(function (res) { return _this.filterContent(res, _this.mdata); });
                    }).then(function () { return _this.mdata.suggestedByGenre = _this.suggestionsTemporary; });
                }
            }
        }
        else {
            this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */]);
        }
    }
    HomePage.prototype.ngAfterViewInit = function () {
    };
    HomePage.prototype.ionViewDidLoad = function () {
    };
    HomePage.prototype.getNowPlaying = function () {
        var _this = this;
        this.mdata.nowPlaying().toPromise()
            .then(function (response) {
            for (var x = 0; x < response.json().results.length; x++) {
                _this.mdata.inTheatres.push(new __WEBPACK_IMPORTED_MODULE_3__shared_movie_movie_model__["a" /* Movie */](response.json().results[x]));
            }
        });
    };
    HomePage.prototype.linkToTheatre = function (theatre) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Browser.open({ url: "" + theatre.website, presentationStyle: "fullscreen" })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.arrayToObject = function (array) {
        var object = array.reduce(function (obj, item) {
            obj["result"] = item;
            return obj;
        }, {});
        return object;
    };
    HomePage.prototype.filterContent = function (res, mdataService) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            mdataService.movieDetails(res.id).toPromise()
                .then(function (details) {
                var keywords = [];
                if (details.json()['keywords']['keywords'].length > 0) {
                    details.json()['keywords']['keywords'].forEach(function (item) { return keywords.push(item.name); });
                }
                var redflaged = mdataService.screenKeyWords(keywords);
                if (!redflaged && !(details.json()['vote_average'] == 0 || details.json()['overview'] == "" || details.json()['poster_path'] == null)) {
                    _this.suggestionsTemporary.push(details.json());
                    console.log(details.json());
                }
                resolve();
            });
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\pages\home\home.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>Home</ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n\n\n  <movie-slider #Slides id="nowPlaying" *ngIf="mdata.inTheatres.length > 0" [movies]="mdata.inTheatres"></movie-slider>\n\n\n\n  <movie-slider #Slides id="nowPlayingNearYou" *ngIf="mdata.nearbyShowings.length > 0" [movies]="mdata.nearbyShowings"></movie-slider>\n\n\n\n  <movie-slider #Slides id="genreSuggestions" *ngIf="mdata.suggestedByGenre.length > 0" [movies]="mdata.suggestedByGenre" [showGenres]="true"></movie-slider>\n\n\n\n  <div class="no-showings" *ngIf="mdata.nearbyShowings.length <= 0 && loc.nearbyTheaters.length > 0">\n\n    <h3>No showtimes could be found but here are the theatres near you!</h3>\n\n    <h4 *ngFor="let theatre of loc.nearbyTheaters">\n\n      {{theatre.name}}\n\n      <a (click)="linkToTheatre(theatre)">{{theatre.website}}</a>\n\n      <p>{{theatre.formatted_phone_number}}</p>\n\n    </h4>\n\n  </div>\n\n<div style="position: absolute; width: 100%; height: 100%;">\n\n<google-map style="height: 100%;" apiKey="AIzaSyBKM9opS6Z9K3HCe7mZzviapQyrpnfy_vw"></google-map>\n\n</div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\pages\home\home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_5__services_loc_service__["a" /* LocService */], __WEBPACK_IMPORTED_MODULE_6__services_moviedatabase_service__["a" /* MoviedatabaseService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 253:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 253;

/***/ }),

/***/ 29:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MoviedatabaseService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_cache__ = __webpack_require__(79);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





// @ts-ignore
var Filter = __webpack_require__(800);
var MoviedatabaseService = /** @class */ (function () {
    function MoviedatabaseService(http, datePipe, auth, cache) {
        this.http = http;
        this.datePipe = datePipe;
        this.auth = auth;
        this.cache = cache;
        this.nearbyShowings = [];
        this.inTheatres = [];
        this.genreList = [];
        this.suggestedByGenre = [];
        this.movies = [];
        this.screen = new Filter({});
        this.promisePool = [];
        this.tmdbApi = '828228e4b2683577df9289c730ed85a2';
        this.imdbApi = '5c8dafe8';
        this.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
        this.oneMonthAgoToday = this.datePipe.transform(Date.now() - 2.628e+9, 'yyyy-MM-dd');
    }
    //#region TBDB calls
    MoviedatabaseService.prototype.movieSearch = function (titleQuery) {
        var url = "https://api.themoviedb.org/3/search/movie?api_key=" + this.tmdbApi + "&include_adult=false&include_video=false&query=" + titleQuery;
        var request = this.http.get(url);
        return this.cache.loadFromObservable(url, request);
    };
    MoviedatabaseService.prototype.movieDetails = function (movie_id) {
        var url = "https://api.themoviedb.org/3/movie/" + movie_id + "?api_key=" + this.tmdbApi + "&include_adult=false&include_video=false&append_to_response=videos,credits,release_dates,keywords";
        var request = this.http.get(url);
        return this.cache.loadFromObservable(url, request);
    };
    MoviedatabaseService.prototype.discover = function (sorting, page) {
        if (page === void 0) { page = 1; }
        var url = "https://api.themoviedb.org/3/discover/movie?api_key=" + this.tmdbApi + "&include_adult=false&include_video=false&language=en-US&region=US&" + sorting + "&page=" + page;
        var request = this.http.get(url);
        return this.cache.loadFromObservable(url, request);
    };
    MoviedatabaseService.prototype.topRated = function (page) {
        if (page === void 0) { page = 1; }
        var url = "https://api.themoviedb.org/3/movie/top_rated?api_key=" + this.tmdbApi + "&include_adult=false&include_video=false&language=en-US&region=US&page=" + page;
        var request = this.http.get(url);
        return this.cache.loadFromObservable(url, request);
    };
    MoviedatabaseService.prototype.nowPlaying = function () {
        var url = "https://api.themoviedb.org/3/movie/now_playing?api_key=" + this.tmdbApi + "&include_adult=false&include_video=false&language=en-US&region=US";
        var request = this.http.get(url);
        return this.cache.loadFromObservable(url, request);
    };
    MoviedatabaseService.prototype.genreSuggestions = function (genre) {
        if (this.auth.genres) {
            var url = "https://api.themoviedb.org/3/discover/movie?api_key=" + this.tmdbApi + "&sort_by=vote_count.desc&include_adult=false&include_video=false&with_genres=" + genre.id + "&page=1&primary_release_date.lte=" + this.date + "&primary_release_date.gte=" + this.oneMonthAgoToday + "&language=en-US&region=US";
            var request = this.http.get(url);
            return this.cache.loadFromObservable(url, request);
        }
    };
    MoviedatabaseService.prototype.getGenreIds = function () {
        var url = "https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=" + this.tmdbApi;
        var request = this.http.get(url);
        return this.cache.loadFromObservable(url, request);
    };
    //#endregion
    MoviedatabaseService.prototype.lookUpnearbyShows = function (zip) {
        var url = "http://data.tmsapi.com/v1.1/movies/showings?startDate=" + this.date + "&zip=" + zip + "&radius=10&units=mi&api_key=mx9fj3vj38n4w7ufzgvr5m3j";
        var request = this.http.get(url);
        return this.cache.loadFromObservable(url, request);
    };
    MoviedatabaseService.prototype.getOMDB = function (id) {
        var url = "http://www.omdbapi.com/?apikey=" + this.imdbApi + "&i=" + id;
        var request = this.http.get(url);
        return this.cache.loadFromObservable(url, request);
    };
    MoviedatabaseService.prototype.screenKeyWords = function (text) {
        if (text) {
            return this.screen.isProfane(text);
        }
    };
    MoviedatabaseService.prototype.setGenreIds = function (array) {
        return __awaiter(this, void 0, void 0, function () {
            var promise, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promise = new Promise(function (resolve, reject) {
                            for (var x = 0; x < _this.genreList.length; x++) {
                                for (var y = 0; y < array.length; y++) {
                                    if (_this.genreList[x]['name'] == array[y]['name']) {
                                        array[y]['id'] = _this.genreList[x]['id'];
                                    }
                                }
                            }
                            resolve(true);
                        });
                        return [4 /*yield*/, promise];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    MoviedatabaseService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["Http"], __WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* DatePipe */], __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_4_ionic_cache__["b" /* CacheService */]])
    ], MoviedatabaseService);
    return MoviedatabaseService;
}());

//# sourceMappingURL=moviedatabase.service.js.map

/***/ }),

/***/ 330:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/about/discover/popular/popular.module": [
		331
	],
	"../pages/about/discover/toprated/toprated.module": [
		333
	],
	"../pages/about/discover/upcoming/upcoming.module": [
		334
	],
	"../pages/detailsview/detailsview.module": [
		873,
		6
	],
	"../pages/genres/genres.module": [
		874,
		5
	],
	"../pages/home/home.module": [
		875,
		4
	],
	"../pages/login/login.module": [
		876,
		3
	],
	"../pages/searchview/searchview.module": [
		877,
		2
	],
	"../pages/viewtrailer/viewtrailer.module": [
		878,
		1
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return Promise.all(ids.slice(1).map(__webpack_require__.e)).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 330;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 331:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopularPageModule", function() { return PopularPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__popular__ = __webpack_require__(836);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var PopularPageModule = /** @class */ (function () {
    function PopularPageModule() {
    }
    PopularPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__popular__["a" /* PopularPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__popular__["a" /* PopularPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]
            ],
        })
    ], PopularPageModule);
    return PopularPageModule;
}());

//# sourceMappingURL=popular.module.js.map

/***/ }),

/***/ 332:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfiniteScrollService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__moviedatabase_service__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var InfiniteScrollService = /** @class */ (function () {
    function InfiniteScrollService(mdata) {
        this.mdata = mdata;
    }
    InfiniteScrollService.prototype.getPageNumber = function (request, infiniteScroll, movies, page, pages) {
        return request
            .toPromise()
            .then(function (res) {
            movies = movies.concat(res.json().results);
            if (page === pages) {
                infiniteScroll.enable(false);
            }
            return movies;
        });
    };
    InfiniteScrollService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__moviedatabase_service__["a" /* MoviedatabaseService */]])
    ], InfiniteScrollService);
    return InfiniteScrollService;
}());

//# sourceMappingURL=infinite-scroll.service.js.map

/***/ }),

/***/ 333:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TopratedPageModule", function() { return TopratedPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__toprated__ = __webpack_require__(837);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var TopratedPageModule = /** @class */ (function () {
    function TopratedPageModule() {
    }
    TopratedPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__toprated__["a" /* TopratedPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__toprated__["a" /* TopratedPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]
            ],
        })
    ], TopratedPageModule);
    return TopratedPageModule;
}());

//# sourceMappingURL=toprated.module.js.map

/***/ }),

/***/ 334:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UpcomingPageModule", function() { return UpcomingPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__upcoming__ = __webpack_require__(838);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(105);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




var UpcomingPageModule = /** @class */ (function () {
    function UpcomingPageModule() {
    }
    UpcomingPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__upcoming__["a" /* UpcomingPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__upcoming__["a" /* UpcomingPage */]),
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */]
            ],
        })
    ], UpcomingPageModule);
    return UpcomingPageModule;
}());

//# sourceMappingURL=upcoming.module.js.map

/***/ }),

/***/ 335:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_moviedatabase_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__searchview_searchview__ = __webpack_require__(221);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AboutPage = /** @class */ (function () {
    function AboutPage(navCtrl, mdata) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.mdata = mdata;
        this.popular = 'PopularPage';
        this.topRated = 'TopratedPage';
        this.upcoming = 'UpcomingPage';
        this.checkCurrentQuery = function (current) {
            return new Promise(function (resolve, reject) {
                _this.currentQuery = current; // set return value to the newName parameter
                resolve();
            });
        };
    }
    AboutPage.prototype.searchMovie = function ($event) {
        var _this = this;
        if (this.titleQuery != this.currentQuery) {
            $event.preventDefault();
            this.mdata.movies = [];
            var filterPromises_1 = [];
            this.mdata.movieSearch(this.titleQuery)
                .toPromise()
                .then(function (response) {
                response.json().results.forEach(function (res) { return filterPromises_1.push(filterContent(res, _this.mdata)); });
            });
            Promise.all(filterPromises_1)
                .then(function () {
                return _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__searchview_searchview__["a" /* SearchviewPage */], {
                    Query: _this.titleQuery,
                    Callback: _this.checkCurrentQuery
                });
            });
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__searchview_searchview__["a" /* SearchviewPage */], {
                Query: this.titleQuery,
                Callback: this.checkCurrentQuery
            });
        }
        function filterContent(res, mdataService) {
            mdataService.movieDetails(res.id).toPromise()
                .then(function (details) {
                return new Promise(function (resolve, reject) {
                    var keywords = [];
                    if (details.json()['keywords']['keywords'].length > 0) {
                        details.json()['keywords']['keywords'].forEach(function (item) { return keywords.push(item.name); });
                    }
                    var redflaged = mdataService.screenKeyWords(keywords);
                    if (!redflaged && !(details.json()['vote_average'] == 0 && details.json()['overview'] == "" && details.json()['poster_path'] == null)) {
                        mdataService.movies.push(details.json());
                    }
                    resolve();
                });
            });
        }
    };
    AboutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-about',template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\pages\about\about.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Discover\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n\n  <form class="" method="get" #movieForm="ngForm" (ngSubmit)="searchMovie($event)">\n\n    <input type="text" name="movie-search" [(ngModel)]="titleQuery">\n\n    <label for="movie-search">Search</label>\n\n    <button type="submit" name="submit">Search Movies</button>\n\n  </form>\n\n\n\n  <ion-tabs tabsPlacement="top" id="discover-tabs">\n\n    <ion-tab [root]="popular" tabTitle="Popular" tabIcon="home"></ion-tab>\n\n    <ion-tab [root]="topRated" tabTitle="Top Rated" tabIcon="information-circle"></ion-tab>\n\n    <ion-tab [root]="upcoming" tabTitle="Upcoming" tabIcon="contacts"></ion-tab>\n\n  </ion-tabs>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\pages\about\about.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__services_moviedatabase_service__["a" /* MoviedatabaseService */]])
    ], AboutPage);
    return AboutPage;
}());

//# sourceMappingURL=about.js.map

/***/ }),

/***/ 336:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(94);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ContactPage = /** @class */ (function () {
    function ContactPage(nav, menu, auth) {
        this.nav = nav;
        this.menu = menu;
        this.auth = auth;
        this.verificationSent = false;
    }
    ContactPage.prototype.login = function () {
        this.menu.close();
        this.auth.signOut();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    ContactPage.prototype.logout = function () {
        this.menu.close();
        this.auth.signOut();
        this.nav.setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    ContactPage.prototype.verifyUserEmail = function () {
        var _this = this;
        this.auth.verifyEmail().then(function () { return _this.verificationSent = true; }, function (error) { return _this.verificationError = error.message; });
    };
    ContactPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-contact',template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\pages\contact\contact.html"*/'<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>\n\n      Contact\n\n    </ion-title>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n  <ion-list>\n\n    <ion-list-header *ngIf="auth.getEmail()">{{auth.getEmail()}}>Follow us on Twitter</ion-list-header>\n\n    <ion-item>\n\n      <ion-icon name="ionic" item-start></ion-icon>\n\n      @ionicframework\n\n    </ion-item>\n\n\n\n    <ion-item (click)="logout()" *ngIf="auth.authenticated">\n\n    	<ion-icon name="log-out" item-left></ion-icon>\n\n    	Log out\n\n    </ion-item>\n\n\n\n  <ion-item (click)="login()" *ngIf="!auth.authenticated">\n\n  	<ion-icon name="log-in" item-left></ion-icon>\n\n  	Log in\n\n  </ion-item>\n\n\n\n  <ion-item (click)="verifyUserEmail()" *ngIf="auth.authenticated">\n\n    <ion-icon name="verify-email" item-left></ion-icon>\n\n    Send email verification link\n\n    <div *ngIf="verificationError">{{verificationError}}</div>\n\n    <div *ngIf="verificationSent">A verification email was sent to {{this.auth.user.email}}</div>\n\n  </ion-item>\n\n  </ion-list>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\pages\contact\contact.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]])
    ], ContactPage);
    return ContactPage;
}());

//# sourceMappingURL=contact.js.map

/***/ }),

/***/ 337:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabs_tabs__ = __webpack_require__(92);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SignupPage = /** @class */ (function () {
    function SignupPage(fb, navCtrl, auth) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.form = fb.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].email])],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].minLength(6)])]
        });
    }
    SignupPage.prototype.signup = function () {
        var _this = this;
        var data = this.form.value;
        var credentials = {
            email: data.email,
            password: data.password
        };
        this.auth.signUp(credentials)
            .then(function () { return _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__tabs_tabs__["a" /* TabsPage */]); }, function (error) { return _this.signupError = error.message; });
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'as-page-signup',template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\pages\signup\signup.html"*/'<ion-header>\n\n	<ion-navbar>\n\n		<ion-title>Sign up</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n\n\n	<form (ngSubmit)="signup()" [formGroup]="form">\n\n		<ion-list inset>\n\n\n\n			<ion-item [ngClass]="{ invalid: emailErrors.hasError(\'*\', [\'touched\']) }">\n\n				<ion-input type="text" placeholder="Email" formControlName="email"></ion-input>\n\n			</ion-item>\n\n\n\n			<div ngxErrors="email" #emailErrors="ngxErrors">\n\n				<div [ngxError]="[\'email\', \'required\']" [when]="[\'touched\']">It should be a valid email</div>\n\n			</div>\n\n\n\n			<ion-item [ngClass]="{ invalid: passwordErrors.hasError(\'*\', [\'touched\']) }">\n\n				<ion-input type="password" placeholder="Password" formControlName="password"></ion-input>\n\n			</ion-item>\n\n\n\n			<div ngxErrors="password" #passwordErrors="ngxErrors">\n\n				<div [ngxError]="[\'minlength\', \'required\']" [when]="[\'touched\']">It should be at least 6 characters</div>\n\n			</div>\n\n		</ion-list>\n\n\n\n		<div padding-horizontal>\n\n			<div class="form-error">{{signupError}}</div>\n\n\n\n			<button ion-button full type="submit" [disabled]="!form.valid">Sign up</button>\n\n		</div>\n\n	</form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\pages\signup\signup.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(490);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app__ = __webpack_require__(157);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_firebase_app___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_firebase_app__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = /** @class */ (function () {
    function AuthService(afAuth, db) {
        var _this = this;
        this.afAuth = afAuth;
        this.db = db;
        this.emailVerified = false;
        this.users = db.collection('users');
        afAuth.authState.subscribe(function (user) {
            _this.user = user;
        });
    }
    AuthService.prototype.signInWithEmail = function (credentials) {
        console.log('Sign in with email');
        return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    };
    AuthService.prototype.signInWithGoogle = function () {
        console.log('Sign in with google');
        return this.oauthSignIn(new __WEBPACK_IMPORTED_MODULE_2_firebase_app__["auth"].GoogleAuthProvider());
    };
    AuthService.prototype.oauthSignIn = function (provider) {
        var _this = this;
        if (!window.cordova) {
            return this.afAuth.auth.signInWithPopup(provider);
        }
        else {
            return this.afAuth.auth.signInWithRedirect(provider)
                .then(function () {
                return _this.afAuth.auth.getRedirectResult().then(function (result) {
                    // This gives you a Google Access Token.
                    // You can use it to access the Google API.
                    var token = result.credential.accessToken;
                    // The signed-in user info.
                    var user = result.user;
                    console.log(token, user);
                }).catch(function (error) {
                    // Handle Errors here.
                    alert(error.message);
                });
            });
        }
    };
    AuthService.prototype.signOut = function () {
        return this.afAuth.auth.signOut();
    };
    AuthService.prototype.signUp = function (credentials) {
        return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
    };
    Object.defineProperty(AuthService.prototype, "authenticated", {
        get: function () {
            return this.user !== null && this.user !== undefined;
        },
        enumerable: true,
        configurable: true
    });
    AuthService.prototype.getEmail = function () {
        return this.user && this.user.email;
    };
    AuthService.prototype.updateUser = function (field, value) {
        var _a;
        this.users.doc(this.user.uid).update((_a = {},
            _a[field] = value,
            _a));
        console.log("user updated");
    };
    AuthService.prototype.resetPassword = function (email) {
        return this.afAuth.auth.sendPasswordResetEmail(email);
    };
    AuthService.prototype.verifyEmail = function () {
        if (!this.authenticated) {
            return;
        }
        return this.user.sendEmailVerification();
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_angularfire2_auth__["AngularFireAuth"], __WEBPACK_IMPORTED_MODULE_3_angularfire2_firestore__["AngularFirestore"]])
    ], AuthService);
    return AuthService;
}());

//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ 490:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(33);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_components_module__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ultimate_ngxerrors__ = __webpack_require__(861);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__ = __webpack_require__(288);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_ionic_cache__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(869);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2__ = __webpack_require__(870);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_angularfire2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_angularfire2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__ = __webpack_require__(273);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_firestore__ = __webpack_require__(286);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_angularfire2_firestore___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_angularfire2_firestore__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__config__ = __webpack_require__(871);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__services_loc_service__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__services_moviedatabase_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_infinite_scroll_service__ = __webpack_require__(332);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_about_about__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_contact_contact__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_home_home__ = __webpack_require__(222);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_tabs_tabs__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_login_login__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_signup_signup__ = __webpack_require__(337);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_genres_genres__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_detailsview_detailsview__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_viewtrailer_viewtrailer__ = __webpack_require__(220);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_searchview_searchview__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_about_discover_popular_popular_module__ = __webpack_require__(331);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_about_discover_toprated_toprated_module__ = __webpack_require__(333);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_about_discover_upcoming_upcoming_module__ = __webpack_require__(334);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__ionic_native_status_bar__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__ionic_native_splash_screen__ = __webpack_require__(380);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_genres_genres__["a" /* GenresPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_detailsview_detailsview__["a" /* DetailsviewPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_viewtrailer_viewtrailer__["a" /* ViewTrailerPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_searchview_searchview__["a" /* SearchviewPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_6__ultimate_ngxerrors__["a" /* NgxErrorsModule */],
                __WEBPACK_IMPORTED_MODULE_12_angularfire2_firestore__["AngularFirestoreModule"],
                __WEBPACK_IMPORTED_MODULE_3__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_28__pages_about_discover_popular_popular_module__["PopularPageModule"],
                __WEBPACK_IMPORTED_MODULE_30__pages_about_discover_upcoming_upcoming_module__["UpcomingPageModule"],
                __WEBPACK_IMPORTED_MODULE_29__pages_about_discover_toprated_toprated_module__["TopratedPageModule"],
                __WEBPACK_IMPORTED_MODULE_10_angularfire2__["AngularFireModule"].initializeApp(__WEBPACK_IMPORTED_MODULE_13__config__["a" /* firebaseConfig */].fire),
                __WEBPACK_IMPORTED_MODULE_8_ionic_cache__["a" /* CacheModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */], {
                    tabsHideOnSubPages: true,
                }, {
                    links: [
                        { loadChildren: '../pages/about/discover/popular/popular.module#PopularPageModule', name: 'PopularPage', segment: 'popular', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/about/discover/toprated/toprated.module#TopratedPageModule', name: 'TopratedPage', segment: 'toprated', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/about/discover/upcoming/upcoming.module#UpcomingPageModule', name: 'UpcomingPage', segment: 'upcoming', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/detailsview/detailsview.module#DetailsviewPageModule', name: 'DetailsviewPage', segment: 'detailsview', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/genres/genres.module#GenresPageModule', name: 'GenresPage', segment: 'genres', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/home/home.module#GenresPageModule', name: 'HomePage', segment: 'home', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/searchview/searchview.module#SearchviewPageModule', name: 'SearchviewPage', segment: 'searchview', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/viewtrailer/viewtrailer.module#ViewtrailerPageModule', name: 'ViewTrailerPage', segment: 'viewtrailer', priority: 'low', defaultHistory: [] }
                    ]
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_18__pages_about_about__["a" /* AboutPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_contact_contact__["a" /* ContactPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_genres_genres__["a" /* GenresPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_detailsview_detailsview__["a" /* DetailsviewPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_viewtrailer_viewtrailer__["a" /* ViewTrailerPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_searchview_searchview__["a" /* SearchviewPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_31__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_32__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["d" /* DatePipe */],
                __WEBPACK_IMPORTED_MODULE_14__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_15__services_loc_service__["a" /* LocService */],
                __WEBPACK_IMPORTED_MODULE_16__services_moviedatabase_service__["a" /* MoviedatabaseService */],
                __WEBPACK_IMPORTED_MODULE_17__services_infinite_scroll_service__["a" /* InfiniteScrollService */],
                __WEBPACK_IMPORTED_MODULE_11_angularfire2_auth__["AngularFireAuth"],
                __WEBPACK_IMPORTED_MODULE_12_angularfire2_firestore__["AngularFirestore"],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_geolocation__["a" /* Geolocation */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["c" /* IonicErrorHandler */] }
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 491:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__capacitor_core__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_RX__ = __webpack_require__(505);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_RX___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_RX__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_cache__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_loc_service__ = __webpack_require__(107);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var Geolocation = __WEBPACK_IMPORTED_MODULE_2__capacitor_core__["a" /* Plugins */].Geolocation, Network = __WEBPACK_IMPORTED_MODULE_2__capacitor_core__["a" /* Plugins */].Network;
var GoogleMapComponent = /** @class */ (function () {
    function GoogleMapComponent(renderer, element, _document, loc, cache) {
        this.renderer = renderer;
        this.element = element;
        this._document = _document;
        this.loc = loc;
        this.cache = cache;
        this.markers = [];
        this.networkHandler = null;
        this.scriptAppended = false;
    }
    GoogleMapComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.init().then(function (res) {
            console.log("Google Maps ready.");
            _this.addMarker(_this.loc.coords.latitude, _this.loc.coords.longitude);
        }, function (err) {
            console.log(err);
        });
    };
    GoogleMapComponent.prototype.init = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.loadSDK().then(function (res) {
                _this.initMap().toPromise().then(function (res) {
                    resolve(true);
                }, function (err) {
                    reject(err);
                });
            }, function (err) {
                reject(err);
            });
        });
    };
    GoogleMapComponent.prototype.loadSDK = function () {
        var _this = this;
        console.log("Loading Google Maps SDK");
        return new Promise(function (resolve, reject) {
            if (!_this.loc.mapsLoaded) {
                Network.getStatus().then(function (status) {
                    if (status.connected) {
                        _this.injectSDK().then(function (res) {
                            resolve(true);
                        }, function (err) {
                            reject(err);
                        });
                    }
                    else {
                        if (_this.networkHandler == null) {
                            _this.networkHandler = Network.addListener('networkStatusChange', function (status) {
                                if (status.connected) {
                                    _this.networkHandler.remove();
                                    _this.init().then(function (res) {
                                        console.log("Google Maps ready.");
                                    }, function (err) {
                                        console.log(err);
                                    });
                                }
                            });
                        }
                        reject('Not online');
                    }
                }, function (err) {
                    // NOTE: navigator.onLine temporarily required until Network plugin has web implementation
                    if (navigator.onLine) {
                        _this.injectSDK().then(function (res) {
                            resolve(true);
                        }, function (err) {
                            reject(err);
                        });
                    }
                    else {
                        reject('Not online');
                    }
                });
            }
            else {
                reject('SDK already loaded');
            }
        });
    };
    GoogleMapComponent.prototype.injectSDK = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            window['mapInit'] = function () {
                _this.loc.mapsLoaded = true;
                resolve(true);
            };
            var script = _this.renderer.createElement('script');
            script.id = 'googleMaps';
            if (_this.apiKey) {
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + _this.apiKey + '&callback=mapInit&libraries=places';
            }
            else {
                console.log("API Not provided");
            }
            _this.renderer.appendChild(_this._document.body, script);
        });
    };
    GoogleMapComponent.prototype.initMap = function () {
        var _this = this;
        var request = __WEBPACK_IMPORTED_MODULE_3_rxjs_RX__["Observable"].fromPromise(new Promise(function (resolve, reject) {
            _this.loc.getCoords().then(function (position) {
                console.log(position);
                var latLng = new google.maps.LatLng(position.latitude, position.longitude);
                var mapOptions = {
                    center: latLng,
                    zoom: 15
                };
                _this.map = new google.maps.Map(_this.element.nativeElement, mapOptions);
                _this.service = new google.maps.places.PlacesService(_this.map);
                _this.service.nearbySearch({
                    location: latLng,
                    radius: 5000,
                    keyword: ["movie", "theater", "cinema"]
                }, function (response, status) { _this.confirmResultsCreateMarkers(response, status); });
                console.log("Map initialised");
                resolve(true);
            }, function (err) {
                reject('Could not initialise map');
            });
        }));
        return this.cache.loadFromObservable('map-data', request);
    };
    GoogleMapComponent.prototype.addMarker = function (lat, lng) {
        var latLng = new google.maps.LatLng(lat, lng);
        var marker = new google.maps.Marker({
            map: this.map,
            animation: google.maps.Animation.DROP,
            position: latLng
        });
        this.markers.push(marker);
    };
    GoogleMapComponent.prototype.createMarker = function (place, map) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        this.markers.push(marker);
    };
    GoogleMapComponent.prototype.confirmResultsCreateMarkers = function (results, status) {
        var _this = this;
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                this.createMarker(results[i], this.map);
                this.service.getDetails({
                    placeId: "" + results[i].place_id,
                    fields: ['name', 'rating', 'formatted_phone_number', 'website']
                }, function (response, status) { return _this.confirmResultsSearchDetails(response, status); });
            }
        }
    };
    GoogleMapComponent.prototype.confirmResultsSearchDetails = function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            this.loc.nearbyTheaters.push(place);
            console.log();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('apiKey'),
        __metadata("design:type", String)
    ], GoogleMapComponent.prototype, "apiKey", void 0);
    GoogleMapComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'google-map',template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\components\google-maps\google-maps.html"*/'\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\components\google-maps\google-maps.html"*/
        }),
        __param(2, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["z" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["b" /* DOCUMENT */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["W" /* Renderer2 */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], Object, __WEBPACK_IMPORTED_MODULE_5__services_loc_service__["a" /* LocService */], __WEBPACK_IMPORTED_MODULE_4_ionic_cache__["b" /* CacheService */]])
    ], GoogleMapComponent);
    return GoogleMapComponent;
}());

//# sourceMappingURL=google-maps.js.map

/***/ }),

/***/ 813:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovieSliderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_detailsview_detailsview__ = __webpack_require__(93);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_moviedatabase_service__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MovieSliderComponent = /** @class */ (function () {
    function MovieSliderComponent(navCtrl, mdata, cd, platform) {
        this.navCtrl = navCtrl;
        this.mdata = mdata;
        this.cd = cd;
        this.platform = platform;
        this.genreDisplay = false;
        this.checkInitalOverflow = false;
        this.screenResized = false;
    }
    MovieSliderComponent.prototype.pushDetails = function (movie) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_detailsview_detailsview__["a" /* DetailsviewPage */], movie);
    };
    MovieSliderComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.slider.loop = true;
        this.slider.centeredSlides = true;
        this.setSlidesPerView();
        this.platform.resize.subscribe(function () {
            _this.screenResized = true;
            _this.setSlidesPerView();
        });
        this.cd.detectChanges();
    };
    MovieSliderComponent.prototype.setGenreName = function (genre) {
        for (var x = 0; x < this.mdata.genreList.length; x++) {
            if (genre.id == this.mdata.genreList[x].id) {
                genre.name = this.mdata.genreList[x].name;
                return genre.name;
            }
        }
    };
    MovieSliderComponent.prototype.checkOverflow = function (element1, element2) {
        if (!this.checkInitalOverflow || this.screenResized) {
            this.checkInitalOverflow = true;
            return element1.scrollHeight > element2.clientHeight || element1.scrollWidth > element2.clientWidth;
        }
    };
    MovieSliderComponent.prototype.setSlidesPerView = function () {
        if (this.platform.width() >= 1600) {
            setslides(this.slider, 5);
        }
        else if (this.platform.width() >= 1000 && this.platform.width() < 1600) {
            setslides(this.slider, 3);
        }
        else if (this.platform.width() < 1000) {
            setslides(this.slider, 1);
        }
        function setslides(slider, numSlides) {
            slider.slidesPerView = numSlides;
            slider.resize();
            slider.update();
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('movies'),
        __metadata("design:type", Array)
    ], MovieSliderComponent.prototype, "movies", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('showGenres'),
        __metadata("design:type", Boolean)
    ], MovieSliderComponent.prototype, "genreDisplay", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('Slides'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */])
    ], MovieSliderComponent.prototype, "slider", void 0);
    MovieSliderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'movie-slider',template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\components\movieslides\movieslider.html"*/'  <ion-slides #Slides class="swiper-wrapper" *ngIf="movies.length > 0">\n\n    <ion-slide class="movie card swiper-slide" *ngFor="let movie of movies">\n\n      <div #innerMovie class="inner-movie">\n\n        <a (click)="pushDetails(movie)">\n\n        <div *ngIf="movie.showtimes">\n\n          <div *ngIf="movie.showtimes.length > 0" class="showings">\n\n            <div>Now Playing At: {{movie.showtimes[0].theatre.name}}</div>\n\n            <div class="showtimes">\n\n              <h3 *ngFor="let showtime of movie.showtimes">{{showtime.dateTime | date : \'shortTime\'}}</h3>\n\n            </div>\n\n          </div>\n\n        </div>\n\n        <img src="{{movie.poster_path ? \'https://image.tmdb.org/t/p/original\' + movie.poster_path : \'/assets/imgs/no_image.jpg\'}}" class="poster">\n\n        <h3 class="title">{{movie.title}}</h3>\n\n        </a>\n\n        <div #genres *ngIf="genreDisplay" class="genres" [ngClass]="{\'scrolling\' : checkOverflow(genres, innerMovie)}">\n\n          <h5 *ngFor="let genre of movie.genres; let last = last">{{genre.id ? setGenreName(genre) : genre}}<span *ngIf="!last">&#47;</span></h5>\n\n        </div>\n\n      </div>\n\n        <p class="overview">{{movie.overview ? movie.overview : movie.longDescription}}</p>\n\n    </ion-slide>\n\n  </ion-slides>\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\components\movieslides\movieslider.html"*/
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[movies], [showGenres]' // Attribute selector
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__services_moviedatabase_service__["a" /* MoviedatabaseService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]])
    ], MovieSliderComponent);
    return MovieSliderComponent;
}());

//# sourceMappingURL=movieslider.js.map

/***/ }),

/***/ 836:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PopularPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_moviedatabase_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_infinite_scroll_service__ = __webpack_require__(332);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the PopularPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var PopularPage = /** @class */ (function () {
    function PopularPage(navCtrl, navParams, mdata, scroll) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mdata = mdata;
        this.scroll = scroll;
        this.movies = [];
        this.page = 1;
    }
    PopularPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.mdata.discover('sort_by=popularity.desc')
            .toPromise()
            .then(function (res) {
            _this.movies = res.json().results;
            _this.pages = res.json().total_pages;
        });
    };
    PopularPage.prototype.loadMore = function (infiniteScroll) {
        var _this = this;
        this.page++;
        if (this.page <= this.pages) {
            this.scroll.getPageNumber(this.mdata.discover('sort_by=popularity.desc', this.page), infiniteScroll, this.movies, this.page, this.pages)
                .then(function (res) {
                _this.movies = res;
                if (infiniteScroll) {
                    infiniteScroll.complete();
                }
            });
        }
        else {
            return;
        }
    };
    PopularPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-popular',template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\pages\about\discover\popular\popular.html"*/'<!--\n\n  Generated template for the PopularPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-content padding>\n\n  <movie-list [movies]="movies"></movie-list>\n\n  <ion-infinite-scroll threshold="10%" (ionInfinite)="loadMore($event)">\n\n    <ion-infinite-scroll-content\n\n      loadingSpinner="bubbles"\n\n      loadingText="Loading more content...">\n\n    </ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\pages\about\discover\popular\popular.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_moviedatabase_service__["a" /* MoviedatabaseService */], __WEBPACK_IMPORTED_MODULE_3__services_infinite_scroll_service__["a" /* InfiniteScrollService */]])
    ], PopularPage);
    return PopularPage;
}());

//# sourceMappingURL=popular.js.map

/***/ }),

/***/ 837:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TopratedPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_moviedatabase_service__ = __webpack_require__(29);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the TopratedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TopratedPage = /** @class */ (function () {
    function TopratedPage(navCtrl, navParams, mdata) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mdata = mdata;
        this.movies = [];
        this.page = 1;
    }
    TopratedPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.mdata.topRated()
            .toPromise()
            .then(function (res) {
            _this.movies = res.json().results;
            _this.pages = res.json().total_pages;
        });
    };
    TopratedPage.prototype.getPageNumber = function (infiniteScroll) {
        var _this = this;
        this.mdata.topRated(this.page)
            .subscribe(function (res) {
            _this.movies = _this.movies.concat(res.json().results);
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
        });
    };
    TopratedPage.prototype.loadMore = function (infiniteScroll) {
        this.page++;
        this.getPageNumber(infiniteScroll);
        if (this.page === this.pages) {
            infiniteScroll.enable(false);
        }
    };
    TopratedPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-toprated',template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\pages\about\discover\toprated\toprated.html"*/'<!--\n\n  Generated template for the TopratedPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-content padding>\n\n  <movie-list [movies]="movies"></movie-list>\n\n  <ion-infinite-scroll threshold="10%" (ionInfinite)="loadMore($event)">\n\n    <ion-infinite-scroll-content\n\n      loadingSpinner="bubbles"\n\n      loadingText="Loading more content...">\n\n    </ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\pages\about\discover\toprated\toprated.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_moviedatabase_service__["a" /* MoviedatabaseService */]])
    ], TopratedPage);
    return TopratedPage;
}());

//# sourceMappingURL=toprated.js.map

/***/ }),

/***/ 838:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UpcomingPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_moviedatabase_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(33);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the UpcomingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var UpcomingPage = /** @class */ (function () {
    function UpcomingPage(navCtrl, navParams, mdata, datePipe) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mdata = mdata;
        this.datePipe = datePipe;
        this.movies = [];
        this.page = 1;
        this.date = this.datePipe.transform(Date.now(), 'yyyy-MM-dd');
        this.oneMonthAheadToday = this.datePipe.transform(Date.now() + 2.628e+9, 'yyyy-MM-dd');
        this.sorting = "primary_release_date.gte=" + this.date + "&primary_release_date.lte=" + this.oneMonthAheadToday + "&sort_by=popularity.desc";
    }
    UpcomingPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.mdata.discover(this.sorting)
            .toPromise()
            .then(function (res) {
            _this.movies = res.json().results;
            _this.pages = res.json().total_pages;
        });
    };
    UpcomingPage.prototype.getPageNumber = function (infiniteScroll) {
        var _this = this;
        this.mdata.discover(this.sorting, this.page)
            .subscribe(function (res) {
            _this.movies = _this.movies.concat(res.json().results);
            if (infiniteScroll) {
                infiniteScroll.complete();
            }
        });
    };
    UpcomingPage.prototype.loadMore = function (infiniteScroll) {
        this.page++;
        this.getPageNumber(infiniteScroll);
        if (this.page === this.pages) {
            infiniteScroll.enable(false);
        }
    };
    UpcomingPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-upcoming',template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\pages\about\discover\upcoming\upcoming.html"*/'<!--\n\n  Generated template for the UpcomingPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-content padding>\n\n  <movie-list [movies]="movies"></movie-list>\n\n  <ion-infinite-scroll threshold="10%" (ionInfinite)="loadMore($event)">\n\n    <ion-infinite-scroll-content\n\n      loadingSpinner="bubbles"\n\n      loadingText="Loading more content...">\n\n    </ion-infinite-scroll-content>\n\n  </ion-infinite-scroll>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\pages\about\discover\upcoming\upcoming.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__services_moviedatabase_service__["a" /* MoviedatabaseService */], __WEBPACK_IMPORTED_MODULE_3__angular_common__["d" /* DatePipe */]])
    ], UpcomingPage);
    return UpcomingPage;
}());

//# sourceMappingURL=upcoming.js.map

/***/ }),

/***/ 839:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Movie; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__genre_genre_model__ = __webpack_require__(840);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__showtime_showtime_model__ = __webpack_require__(841);


var Movie = /** @class */ (function () {
    function Movie(movieResponse) {
        this.genres = [];
        this.showtimes = [];
        if (movieResponse.genre_ids) {
            for (var x = 0; x < movieResponse.genre_ids.length; x++) {
                this.genres.push(new __WEBPACK_IMPORTED_MODULE_0__genre_genre_model__["a" /* Genre */](movieResponse.genre_ids[x]));
            }
        }
        if (movieResponse.showtimes) {
            for (var showtime in movieResponse.showtimes) {
                this.showtimes.push(new __WEBPACK_IMPORTED_MODULE_1__showtime_showtime_model__["a" /* ShowTime */](showtime));
            }
        }
        // Refactor - Make loop
        this.id = movieResponse.id;
        this.Title = movieResponse.Title;
        this.name = movieResponse.name;
        this.poster_path = movieResponse.poster_path;
        this.overview = movieResponse.overview;
        this.release_date = movieResponse.release_date;
        this.Rated = movieResponse.Rated;
        this.vote_average = movieResponse.vote_average;
        this.Rating = movieResponse.Rating;
        this.Ratings = movieResponse.ratings;
        this.Metascore = movieResponse.Metascore;
        this.runtime = movieResponse.runtime;
        this.longDescription = movieResponse.longDescription;
        this.imdb_id = movieResponse.imdb_id;
        this.imdburl = movieResponse.imdburl;
        this.videos = movieResponse.videos;
        this.credits = movieResponse.credits;
        this.year = movieResponse.year;
    }
    return Movie;
}());

//# sourceMappingURL=movie.model.js.map

/***/ }),

/***/ 840:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Genre; });
var Genre = /** @class */ (function () {
    function Genre(genreResponse) {
        this.id = genreResponse;
    }
    return Genre;
}());

//# sourceMappingURL=genre.model.js.map

/***/ }),

/***/ 841:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowTime; });
var ShowTime = /** @class */ (function () {
    function ShowTime(showtime) {
        this.theatre = { id: showtime.id, name: showtime.name };
        this.dateTime = showtime.dateTime;
    }
    return ShowTime;
}());

//# sourceMappingURL=showtime.model.js.map

/***/ }),

/***/ 860:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MovielistComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_detailsview_detailsview__ = __webpack_require__(93);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MovielistComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var MovielistComponent = /** @class */ (function () {
    function MovielistComponent(navCtrl) {
        this.navCtrl = navCtrl;
    }
    MovielistComponent.prototype.pushDetails = function (movie) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_detailsview_detailsview__["a" /* DetailsviewPage */], movie);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])('movies'),
        __metadata("design:type", Array)
    ], MovielistComponent.prototype, "movies", void 0);
    MovielistComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'movie-list',template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\components\movielist\movielist.html"*/'<!-- Generated template for the MovielistComponent component -->\n\n<ion-list class="movieList">\n\n  <ion-item *ngFor="let movie of movies">\n\n    <div class="movie">\n\n        <a (click)="pushDetails(movie)">\n\n        <img src="{{movie.poster_path ? \'https://image.tmdb.org/t/p/original\' + movie.poster_path : \'/assets/imgs/no_image.jpg\'}}" class="poster">\n\n        </a>\n\n        <circle-progress\n\n        [percent]="movie.vote_average * 10"\n\n        [animation]="false"\n\n        [radius]="45"></circle-progress>\n\n        <div padding bold class="title">{{movie.title}}</div>\n\n        <div padding class="release-date">{{movie.release_date}}</div>\n\n        <p padding class="overview">{{movie.overview}}</p>\n\n    </div>\n\n  </ion-item>\n\n</ion-list>\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\components\movielist\movielist.html"*/
        }),
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["s" /* Directive */])({
            selector: '[movies]' // Attribute selector
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], MovielistComponent);
    return MovielistComponent;
}());

//# sourceMappingURL=movielist.js.map

/***/ }),

/***/ 869:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_cache__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_loc_service__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(94);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_genres_genres__ = __webpack_require__(125);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var MyApp = /** @class */ (function () {
    function MyApp(app, platform, menu, statusBar, splashScreen, auth, loc, cache) {
        this.statusBar = statusBar;
        this.screenResized = false;
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
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
        });
        this.auth.afAuth.authState
            .subscribe(function (user) {
            if (user) {
                _this.auth.users.doc(user.uid).get().toPromise().then(function (doc) {
                    if (doc.exists) {
                        _this.auth.genres = doc.get('genres');
                        console.log("user: ", user.uid);
                        console.log("genres found", _this.auth.genres.length);
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_7__pages_tabs_tabs__["a" /* TabsPage */];
                    }
                    else {
                        _this.auth.genres = [];
                        _this.auth.users.doc(user.uid).set({
                            name: user.displayName,
                            email: user.email,
                            genres: _this.auth.genres
                        });
                        console.log("user Initialized");
                        console.log("genres ", _this.auth.genres.length);
                        _this.rootPage = __WEBPACK_IMPORTED_MODULE_9__pages_genres_genres__["a" /* GenresPage */];
                    }
                }, _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */]).catch(function (err) {
                    console.log("subscribe error: ", err);
                });
            }
            else {
                _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
            }
        }, function () {
            _this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* App */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* MenuController */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_6__services_loc_service__["a" /* LocService */], __WEBPACK_IMPORTED_MODULE_2_ionic_cache__["b" /* CacheService */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 871:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return firebaseConfig; });
var firebaseConfig = {
    fire: {
        apiKey: "AIzaSyANEsejpQ91CZFYlYQf-fw1b_L_7tJUXIE",
        authDomain: "movieapp-bb487.firebaseapp.com",
        databaseURL: "https://movieapp-bb487.firebaseio.com",
        projectId: "movieapp-bb487",
        storageBucket: "movieapp-bb487.appspot.com",
        messagingSenderId: "1006427140617"
    }
};
//# sourceMappingURL=config.js.map

/***/ }),

/***/ 92:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__about_about__ = __webpack_require__(335);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__contact_contact__ = __webpack_require__(336);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__home_home__ = __webpack_require__(222);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TabsPage = /** @class */ (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__about_about__["a" /* AboutPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__contact_contact__["a" /* ContactPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\pages\tabs\tabs.html"*/'<ion-tabs>\n\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n\n  <ion-tab [root]="tab2Root" tabTitle="About" tabIcon="information-circle"></ion-tab>\n\n  <ion-tab [root]="tab3Root" tabTitle="Contact" tabIcon="contacts"></ion-tab>\n\n</ion-tabs>\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 93:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailsviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__capacitor_core__ = __webpack_require__(153);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_moviedatabase_service__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_viewtrailer_viewtrailer__ = __webpack_require__(220);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var Browser = __WEBPACK_IMPORTED_MODULE_1__capacitor_core__["a" /* Plugins */].Browser;
/**
 * Generated class for the DetailsviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DetailsviewPage = /** @class */ (function () {
    function DetailsviewPage(navCtrl, navParams, mdata, popOvrCtrl, cd) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mdata = mdata;
        this.popOvrCtrl = popOvrCtrl;
        this.cd = cd;
        this.movie = this.navParams.data;
        // The global instance of space to replace spaces in ratings
        this.spaceRegex = / /g;
        this.aggregateRating = 0;
    }
    DetailsviewPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.mdata.movieDetails(this.movie.id)
            .toPromise()
            .then(function (res) {
            parseDetails(res, _this.movie);
            _this.cast = _this.movie.credits.cast;
        }).then(function () { return _this.mdata.getOMDB(_this.movie.imdb_id)
            .toPromise()
            .then(function (res) {
            parseDetails(res, _this.movie);
        }).then(function () {
            _this.movie.Ratings = _this.movie.Ratings.filter(function (rt) { return rt['Source'] && rt['Value'] != 0; });
            _this.movie.Ratings.forEach(function (rt) {
                var formatted = rt['Value'].replace(/\/100|\/10|\%/g, '');
                formatted.length === 1 ? formatted = parseInt(formatted) * 10 : formatted = parseInt(formatted.replace(/\./, ''));
                _this.aggregateRating += formatted;
            });
        }).then(function () {
            if (_this.movie.vote_average.toString)
                _this.aggregateRating += _this.movie.vote_average.toString().length === 1 ? _this.movie.vote_average * 10 : parseInt(_this.movie.vote_average.toString().replace(/\./g, ''));
            var tmdbRating = 0;
            if (_this.movie.vote_average && _this.movie.vote_average != 0) {
                tmdbRating++;
            }
            _this.aggregateRating = _this.aggregateRating / (_this.movie.Ratings.length + tmdbRating);
            console.log(_this.movie);
        }); });
        function parseDetails(res, movie) {
            var details;
            res.headers ? details = res.json() : details = res;
            for (var key in details) {
                if (movie[key] == null || movie[key] == undefined) {
                    movie[key] = details[key];
                }
            }
        }
    };
    DetailsviewPage.prototype.viewTrailer = function (movie) {
        this.popover = this.popOvrCtrl.create(__WEBPACK_IMPORTED_MODULE_4__pages_viewtrailer_viewtrailer__["a" /* ViewTrailerPage */], movie, { cssClass: 'trailer-popover' });
        this.popover.present();
    };
    DetailsviewPage.prototype.linkToTitle = function (source) {
        return __awaiter(this, void 0, void 0, function () {
            var src, link;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        src = source.toString();
                        link = null;
                        switch (src) {
                            case "tmdb": {
                                link = 'https://www.themoviedb.org/movie/' + this.movie.id;
                                break;
                            }
                            case "Internet Movie Database": {
                                link = this.movie.imdburl;
                                break;
                            }
                            case "Rotten Tomatoes": {
                                link = 'https://www.rottentomatoes.com/m/' + this.movie.Title.replace(/[^\w\s]/gi, '').replace(/ /g, '_').toLowerCase();
                                break;
                            }
                            case "Metacritic": {
                                link = 'https://www.metacritic.com/movie/' + this.movie.Title.replace(/[^\w\s]/gi, '').replace(/ /g, '-').toLowerCase();
                                break;
                            }
                            default: {
                                link = null;
                            }
                        }
                        if (!link) return [3 /*break*/, 2];
                        return [4 /*yield*/, Browser.open({ url: link, presentationStyle: "fullscreen" })];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    DetailsviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detailsview',template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\pages\detailsview\detailsview.html"*/'<!--\n\n  Generated template for the DetailsviewPage page.\n\n\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n\n  Ionic pages and navigation.\n\n-->\n\n<ion-header>\n\n  <ion-navbar>\n\n    <ion-title>{{movie.title}}</ion-title>\n\n    <div *ngIf="movie.showtimes">\n\n      <ion-title *ngIf="movie.showtimes.length > 0" class="showings">Now Playing At: {{movie.showtimes[0].theatre.name}}\n\n        <div class="showtimes">\n\n          <h2 *ngFor="let showtime of movie.showtimes">{{showtime.dateTime | date : \'shortTime\'}}</h2>\n\n        </div>\n\n      </ion-title>\n\n    </div>\n\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding style=".tabs .tabbar { position: relative; }">\n\n  <div class="movie">\n\n    <div class="movie-inner">\n\n    <img src="{{movie.poster_path ? \'https://image.tmdb.org/t/p/original\' + movie.poster_path : \'/assets/imgs/no_image.jpg\'}}" class="poster">\n\n    <circle-progress\n\n    [percent]="aggregateRating"\n\n    [animation]="true"\n\n    [subtitle]="\'Overall rating\'"\n\n    ></circle-progress>\n\n      <div class="ratings">\n\n        <div *ngIf="movie.vote_average || movie.vote_average != 0" class="logo" [ngClass]="{\'grayout\' : !movie.vote_average}"><a (click)="linkToTitle(\'tmdb\')"><img src="/assets/icon/the-movie-db-api.png"><span>{{movie.vote_average}}</span></a></div>\n\n        <div *ngFor="let rating of movie.Ratings" class="logo"><a *ngIf="rating.Source" (click)="linkToTitle(rating.Source)"><img src="{{\'/assets/icon/\' + rating.Source.replace(spaceRegex, \'_\') + \'.png\'}}"><span>{{rating.Value}}</span></a></div>\n\n      </div>\n\n    <div id="cast">\n\n      <h2>Top Billed Cast</h2>\n\n      <div *ngFor="let actor of cast | slice:0:5" class="actor">\n\n        <img src="{{actor.profile_path ? \'http://image.tmdb.org/t/p/w185/\' + actor.profile_path : \'/assets/imgs/no_image.jpg\'}}">\n\n        <h4>{{actor.name}}</h4>\n\n        <p>"{{actor.character}}"</p>\n\n      </div>\n\n    </div>\n\n  </div>\n\n  <div class="text">\n\n    <h1 class="title">{{movie.title}}</h1>\n\n    <p class="overview">{{movie.overview ? movie.overview : movie.longDescription}}</p>\n\n    <button (click)="viewTrailer(movie)" ion-button round outline large>Watch Trailer</button>\n\n    <button (click)="imdbLink()" ion-button round outline large>Look up on IMDB</button>\n\n  </div>\n\n  </div>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\pages\detailsview\detailsview.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__services_moviedatabase_service__["a" /* MoviedatabaseService */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* PopoverController */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
    ], DetailsviewPage);
    return DetailsviewPage;
}());

//# sourceMappingURL=detailsview.js.map

/***/ }),

/***/ 94:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__tabs_tabs__ = __webpack_require__(92);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_auth_service__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup__ = __webpack_require__(337);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var LoginPage = /** @class */ (function () {
    function LoginPage(navCtrl, auth, fb) {
        this.navCtrl = navCtrl;
        this.auth = auth;
        this.resetEmailSent = false;
        this.showReset = false;
        this.loginForm = fb.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].email])],
            password: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].minLength(6)])]
        });
        this.forgotPassForm = fb.group({
            email_reset: ['', __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["g" /* Validators */].email])]
        });
    }
    LoginPage.prototype.login = function () {
        var _this = this;
        var data = this.loginForm.value;
        if (!data.email) {
            return;
        }
        var credentials = {
            email: data.email,
            password: data.password
        };
        this.auth.signInWithEmail(credentials)
            .then(function () { return _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]); }, function (error) { return _this.loginError = error.message; });
    };
    LoginPage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__signup_signup__["a" /* SignupPage */]);
    };
    LoginPage.prototype.loginWithGoogle = function () {
        var _this = this;
        this.auth.signInWithGoogle()
            .then(function () { return _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__tabs_tabs__["a" /* TabsPage */]); }, function (error) { return console.log(error.message); });
    };
    LoginPage.prototype.sendResetLink = function () {
        var _this = this;
        var data = this.forgotPassForm.value;
        if (!data.email_reset) {
            return;
        }
        this.auth.resetPassword(data.email_reset).then(function () { return _this.resetEmailSent = true; }, function (error) { return _this.resetError = error.message; });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"C:\Users\John\Desktop\MovieApp\src\pages\login\login.html"*/'<ion-header>\n\n	<ion-navbar>\n\n		<button ion-button menuToggle>\n\n			<ion-icon name="menu"></ion-icon>\n\n		</button>\n\n		<ion-title>Log in</ion-title>\n\n	</ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content>\n\n	<form (ngSubmit)="login()" [formGroup]="loginForm">\n\n		<ion-list inset>\n\n\n\n			<ion-item [ngClass]="{ invalid: emailErrors.hasError(\'*\', [\'touched\', \'dirty\']) }">\n\n				<ion-input type="text" placeholder="Email" formControlName="email" #email></ion-input>\n\n			</ion-item>\n\n\n\n			<div ngxErrors="email" #emailErrors="ngxErrors">\n\n				<div [ngxError]="[\'email\', \'required\']" [when]="[\'touched\', \'dirty\']">It should be a valid email</div>\n\n			</div>\n\n\n\n			<ion-item [ngClass]="{ invalid: passwordErrors.hasError(\'*\', [\'touched\']) }">\n\n				<ion-input type="password" placeholder="Password" formControlName="password"></ion-input>\n\n			</ion-item>\n\n\n\n			<div ngxErrors="password" #passwordErrors="ngxErrors">\n\n				<div [ngxError]="[\'minlength\', \'required\']" [when]="[\'touched\']">It should be at least 5 characters</div>\n\n			</div>\n\n		</ion-list>\n\n\n\n		<div padding-horizontal>\n\n			<div class="form-error">{{loginError}}</div>\n\n\n\n			<button ion-button full type="submit" [disabled]="!loginForm.valid">Log in</button>\n\n			<div class="login-footer">\n\n				<p>\n\n					<a (click)="showReset = !showReset">Forgot password?</a>\n\n					If you\'re a new user, please sign up.\n\n					<span *ngIf="showReset">\n\n						<form (ngSubmit)="sendResetLink()" [formGroup]="forgotPassForm">\n\n							<ion-input type="text" formControlName="email_reset" value="{{email.value ? email.value : undefined}}" placeholder="Email" #resetEmail></ion-input>\n\n\n\n							<div ngxErrors="email_reset" #emailErrors="ngxErrors">\n\n								<div [ngxError]="[\'email\', \'required\']" [when]="[\'touched\', \'dirty\']">valid email required</div>\n\n							</div>\n\n\n\n							<div *ngIf="resetError">{{resetError}}</div>\n\n							<div *ngIf="resetEmailSent">A password reset link was sent to {{resetEmail.value}}</div>\n\n\n\n							<button ion-button full type="submit" [disabled]="!forgotPassForm.valid || resetEmailSent">Send Reset Link</button>\n\n						</form>\n\n					</span>\n\n				</p>\n\n			</div>\n\n\n\n			<ion-list>\n\n\n\n				<button ion-button icon-left block clear (click)="googleLog()">\n\n					<ion-icon name="logo-google"></ion-icon>\n\n					Log in with Google\n\n				</button>\n\n\n\n				<button ion-button icon-left block clear (click)="signup()">\n\n					<ion-icon name="person-add"></ion-icon>\n\n					Sign up\n\n				</button>\n\n			</ion-list>\n\n		</div>\n\n	</form>\n\n</ion-content>\n\n'/*ion-inline-end:"C:\Users\John\Desktop\MovieApp\src\pages\login\login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_4__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ })

},[381]);
//# sourceMappingURL=main.js.map