import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[SQLite,]
})
export class HomePage {

  public db:SQLiteObject;
  public moneyList : Array<Object>;
  private addMoney = {
    money:'', 
    date:'2017-1-02',
    type:''
  }

  constructor(public navCtrl: NavController,public sqlite:SQLite) {
    //打开db
   this.sqlite.create({
       name:'data.db',
       location:'default'
    }).then((resdb:SQLiteObject)=>{
      this.db = resdb;
      this.refreshMoneyList();
    })
  }

  //新增一条数据
  public addMoneyData(){
    // this.db.executeSql("INSERT INTO money (money,date,type) VALUES ('10','2017-3-10','1')", []).then((data) => {
    this.db.executeSql("INSERT INTO money(money,date,type) VALUES (?,?,?)", [this.addMoney.money,this.addMoney.date,this.addMoney.type]).then((data) => {
        alert("INSERTED: " + JSON.stringify(data));
    }, (error) => {
        alert("ERROR: " + JSON.stringify(error));
    });
  }

  //刷新数据
  public refreshMoneyList(){
    this.db.executeSql("select * from money",{}).then((data)=>{
      this.moneyList = [];
      for(var i = 0 ;i < data.rows.length;i++){
        var tempItem = data.rows.item(i);
        this.moneyList.push({id:tempItem.id,money:tempItem.money,date:tempItem.date,type:tempItem.type})
      }
    }).catch(e=>alert(e))
  }


}
