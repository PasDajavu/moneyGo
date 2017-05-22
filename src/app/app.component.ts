import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';

 

@Component({
  templateUrl: 'app.html',
  providers:[SQLite],
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      public sqlite:SQLite,
      public storage:Storage,
    ){ 
     this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //创建db
      this.sqlite.create({
        name:'data.db',
        location:'default'
      }).then((db:SQLiteObject)=>{
        alert(JSON.stringify(db))
        //创建一张表（id,金额，日期，类型）
        db.executeSql('create table if not exists money(id INTEGER PRIMARY KEY AUTOINCREMENT,money TEXT,date TEXT,type TEXT)',{})
        .then((data)=>alert(JSON.stringify(data)))
        .catch(e=>alert(JSON.stringify(e)))
      }).catch(e=>console.log(e))
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
