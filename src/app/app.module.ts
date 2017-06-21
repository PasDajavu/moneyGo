import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddItem } from '../pages/addItem/addItem';
import { GlobalData } from '../global/globalData';
import { SQLite } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddItem,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddItem,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GlobalData,
    SQLite,
    Storage,
    {provide: [ErrorHandler], useClass: IonicErrorHandler},
  ]
})

export class AppModule {}
