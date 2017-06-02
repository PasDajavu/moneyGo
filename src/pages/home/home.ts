import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { GlobalData } from '../../global/globalData';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [SQLite]
})
export class HomePage {

  public db: SQLiteObject;
  public moneyList: Array<Object>;
  private addMoney = {
    money: '',
    date: '2017-1-02',
    type: ''
  }

  constructor(public navCtrl: NavController, public sqlite: SQLite, public storage: Storage,public globalData:GlobalData,) {
  }

  //新增一条数据
  addMoneyData() {
    this.globalData.addMoney({money:'10',date:'2017-3-10',type:'1'});
  }

  //刷新数据
  refreshMoneyList() {
    let self = this;
    this.globalData.getMoneyList(function(dataList){
      self.moneyList = dataList;
        console.log(dataList);
        console.log("hello world")
    });
  }
}
