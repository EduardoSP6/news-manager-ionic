import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {HomePage} from '../pages/home/home';
import {ListPage} from '../pages/list/list';
import {NewsListPage} from '../pages/news-list/news-list';
import {NoticeDetailPage} from '../pages/notice-detail/notice-detail';
import {LoginPage} from '../pages/login/login';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HttpModule} from '@angular/http';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        ListPage,
        NewsListPage,
        NoticeDetailPage,
        LoginPage
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(MyApp),
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        ListPage,
        NewsListPage,
        NoticeDetailPage,
        LoginPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Geolocation,
        {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {
}

