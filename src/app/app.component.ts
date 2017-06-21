import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { GlobalData } from '../global/globalData';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  async init(){
    //初始化DB
    await this.globalData.initializeDB();
    //打开DB
    await this.globalData.openDB();
  }

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public storage: Storage,
    public globalData:GlobalData,
  ) {
    this.init();
    this.statusBar.styleDefault();
    this.splashScreen.hide();
  }
}
