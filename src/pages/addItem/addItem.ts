import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { money } from '../../model/money';
import { GlobalData } from '../../global/globalData';

@Component({
    templateUrl: 'addItem.html',
})

export class AddItem {
    private money: any = Object.assign({}, money);

    constructor(
        public viewCtrl: ViewController,
        public globalData: GlobalData,
    ) { }

    //新增一条数据
    addMoneyData() {
        console.log(this.money);
        //如果没有选择日期，默认当前时间
        this.money.date = this.money.date == null ? new Date() : new Date(this.money.date);
        //向表插入一条数据
        this.globalData.addMoney(this.money).then((data) => {
            //关闭页面
            this.closeModal();
        })
    }

    //关闭新增页面
    closeModal() {
        this.viewCtrl.dismiss();
    }
}