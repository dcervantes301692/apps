import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class DesarrolloProvider {

  constructor(public http: HttpClient,
    public alertCtrl: AlertController) {
    console.log('Hello DesarrolloProvider Provider');
  }
  
  ocultar(){
    let alert = this.alertCtrl.create({
      subTitle: 'Diego Osvaldo Cervantes Guzmán',
    });
    alert.present(); 
    setTimeout(() => {
      alert.dismiss();
    }, 1500);
  }
}
