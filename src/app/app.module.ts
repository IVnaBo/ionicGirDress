import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HttpModule} from "@angular/http";
import {AppService} from "./app.service";
import {ComponentsModule} from "../components/components.module";
import {AppShare} from "./app.share";
import {QQSDK} from '@ionic-native/qqsdk';
import {IonicStorageModule} from "@ionic/storage";
import {ImagePicker} from "@ionic-native/image-picker";
import {ShopCarPage} from "../pages/shop-car/shop-car";


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ShopCarPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ComponentsModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    ShopCarPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppService,
    AppShare,
    QQSDK,
    ImagePicker,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
