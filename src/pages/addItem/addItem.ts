import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Storage } from '@ionic/storage';

@Component({
    templateUrl:'addItem.html',
    providers:[SQLite],

})

export class AddItem{
    constructor(public storage:Storage){

    }
}