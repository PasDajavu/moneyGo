import { Injectable } from "@angular/core";
import { Nav, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';

@Injectable()
export class GlobalData {
    public db: SQLiteObject;

    constructor(
        public sqlite: SQLite,
        public platform: Platform,
        public storage: Storage,
    ) { }

    //创建DB
    initializeDB() {
        this.platform.ready().then(() => {
            let self = this;
            //创建db
            this.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                //创建一张表（id,金额，日期，类型）
                db.executeSql('create table if not exists money(id INTEGER PRIMARY KEY AUTOINCREMENT,money TEXT,date TEXT,type TEXT)', {})
                    .then((data) => {
                        console.log(data);
                        self.openDB();
                    })
                    .catch(e => console.log(e))
            }).catch(e => console.log(e))
        });
    }

    //打开DB
    openDB() {
        //打开db
        this.sqlite.create({
            name: 'data.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            let self = this;
            self.db = db;
            // this.storage.set('db', db)
            // this.storage.get('db').then(data => {
            //     self.db = data;
            // })
        })
    }

    //新增一条数据
    addMoney(addMoney) {
        this.db.executeSql("INSERT INTO money(money,date,type) VALUES (?,?,?)", [addMoney.money, addMoney.date, addMoney.type]).then((data) => {
            console.log("INSERTED: " + JSON.stringify(data));
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error));
        });
    }

    //刷新数据
    getMoneyList(callback){
        this.db.executeSql("select * from money", {}).then((data) => {
            console.log(data.rows.length)
            let moneyList = [];
            for (var i = 0; i < data.rows.length; i++) {
                var tempItem = data.rows.item(i);
                moneyList.push({ id: tempItem.id, money: tempItem.money, date: tempItem.date, type: tempItem.type })
                callback(moneyList);
            }
        }).catch(e => console.log(e))
    }

}