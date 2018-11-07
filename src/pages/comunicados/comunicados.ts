import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WsappsProvider } from '../../providers/wsapps/wsapps';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-comunicados',
  templateUrl: 'comunicados.html',
})
export class ComunicadosPage {

  comunicados: any;
  constructor(
    public navCtrl: NavController,
    public http: WsappsProvider,
    public alertCtrl: AlertController) 
  {
  }

  //BTN DE BORRADO DE COMUNICADOS DE LAS PROMOTORAS
  borrado(id){
    //muestra el valor espesifico de lo que cliqueas
    let vista  = this.comunicados.filter(function(e,i){return e.id == id})[0];
    let buscar = this.comunicados.indexOf(vista);
    let ultimo = this.comunicados.length;
    console.log(vista);
    console.log(buscar);
    console.log(ultimo);
  }

  //DETALLADO DE EL COMUNICADO EN ESPECIFICO
  detalle(id){
    let vista  = this.comunicados.filter(function(e,i){return e.id == id})[0];
    let alert = this.alertCtrl.create({
      title: vista.linea,
      subTitle: 'Your frienddddddddddddddddddddddddddddddddddddddddd' + 
      'd, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['ACEPTAR']
    });
    alert.present();
  }

  no(id){
    let vista  = this.comunicados.filter(function(e,i){return e.id == id})[0];
    let buscar = this.comunicados.indexOf(vista);
    let ultimo = this.comunicados.length;
    console.log(vista);
    console.log(buscar);
    console.log(ultimo);
  }
}
