import { Injectable } from "@angular/core";
import { Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';
import { config } from '../../app/config';

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
        let self = this;
        self.platform.ready().then(() => {
            //创建db
            self.sqlite.create({
                name: 'data.db',
                location: 'default'
            }).then((db: SQLiteObject) => {
                //创建一张表（id,金额，日期，类型）
                db.executeSql('create table if not exists money(id INTEGER PRIMARY KEY AUTOINCREMENT,money TEXT,date TEXT,type TEXT,detail TEXT)', {})
                .then((data) => {
                    console.log(data);
                })
                .catch(e => console.log(e))
            }).catch(e => console.log(e))
        });
    }

    //打开DB
    openDB() {
        let self = this;
        //打开db
        self.sqlite.create({
            name: 'data.db',
            location: 'default'
        }).then((db: SQLiteObject) => {
            self.db = db;
            console.log(this.db);
        }).catch(e => {
            console.log(e);
        })
    }

    //新增一条数据
    addMoney(addMoney) {
        let promise = new Promise((resolve,reject) => {
            this.db.executeSql("INSERT INTO money(money,date,type,detail) VALUES (?,?,?,?)", [addMoney.money, addMoney.date, addMoney.type, addMoney.detail]).then((data) => {
                console.log("INSERTED: " + JSON.stringify(data));
                resolve(data);
            }, (error) => {
                console.log("ERROR: " + JSON.stringify(error));
                reject(error);
            });
        })
        return promise;
    }

    //删除一条数据
    deleteMoney(id) {
        let promise = new Promise((resolve,reject) => {
            this.db.executeSql('delete from money where id = ?', [id]).then((data) => {
                resolve(data);
            }, (error) => {
                console.log("ERROR: " + JSON.stringify(error));
                reject(error);
            })
        })
        return promise;
    }

    //刷新数据
    getMoneyList() {
        let self = this;
        let promise = new Promise((resolve, reject) => {
            console.log(self.db)
            if(self.db){
                self.db.executeSql("select * from money", {}).then((data) => {
                    let moneyList = [];
                    for (var i = 0; i < data.rows.length; i++) {
                        var tempItem = data.rows.item(i);
                        moneyList.push({ id: tempItem.id, money: tempItem.money, date: tempItem.date, type: tempItem.type ,detail: tempItem.detail})
                        resolve(moneyList);
                    }
                }).catch(e => console.log(e))
            } else if(self.platform.is('core')){
                //web 调试
                let tempMoneyList = [];
                for (let i = 0; i < 10; i++) {
                    let tempMoney = parseInt('100');
                    let tempItem = {
                        money: (Math.random() * 100).toFixed(2),
                        date: '2017-05-31',
                        detail:'test',
                        type: '1',
                    }
                    tempMoneyList.push(tempItem)
                }
                resolve(tempMoneyList);
            }else{
                // setTimeout(function() {
                //     self.getMoneyList();
                // }, 300);
            }
        })
        return promise;
    }


}