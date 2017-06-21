import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { GlobalData } from '../../global/globalData';
import { AddItem } from '../addItem/addItem';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SQLite]
})
export class HomePage {

  public db: SQLiteObject;
  public moneyList: any;

  constructor(
    public navCtrl: NavController,
    public sqlite: SQLite,
    public storage: Storage,
    public globalData: GlobalData,
    public modalCtrl: ModalController,
  ) {
    this.refreshMoneyList();
  }


  //删除一条数据
  deleteMoneyDate(id) {
    let self = this;
    this.globalData.deleteMoney(id).then((data) => {
      self.refreshMoneyList();
    });
  }

  //打开新增页面
  openMoneyPage() {
    let addItem = this.modalCtrl.create(AddItem);
    addItem.present();
  }

  //下拉刷新
  refreshList(refresher) {
    this.refreshMoneyList().then((data) => {});
    setTimeout(function () {
      refresher.complete();
    }, 1000);
  }

  //刷新数据
  refreshMoneyList() {
    let self = this;
    let promise = new Promise((resolve,reject) => {
      this.globalData.getMoneyList().then((dataList) => {
        self.moneyList = dataList;
        resolve();
        console.log(dataList);
      })
    })
    return promise;
  }

}
