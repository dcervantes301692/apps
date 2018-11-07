import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { RelacionadosPage } from '../relacionados/relacionados';
import { PedidoPage } from '../pedido/pedido';
import { DetalleProductoPage } from '../detalle-producto/detalle-producto';

@IonicPage()
@Component({
  selector: 'page-informacion',
  templateUrl: 'informacion.html',
})
export class InformacionPage {

  idProducto;
  MODOUSO;
  CONTRAINDICACIONES;
  Enfermedades: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    public loadingCtrl: LoadingController) {
    this.idProducto = navParams.get('idProducto');
    this.MODOUSO = navParams.get('MODOUSO');
    this.CONTRAINDICACIONES = navParams.get('CONTRAINDICACIONES');
  }

  ionViewDidLoad(){
    this.SelectEnfermedad();
  }
  ionViewDidEnter(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: '<img src="assets/imgs/loading.gif" disabled>'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 1000);
  }
  SelectEnfermedad(){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let enferme = "SELECT E.ID, E.NOMBRE, E.img99x148 FROM Enfermedad E ";
      enferme += "INNER JOIN ProductoEnfermedad P ON P.FK_idEnfermedad = E.ID ";
      enferme += "WHERE FK_idProducto=?";
        db.executeSql(enferme,[this.idProducto])
        .then(res => {
          this.Enfermedades = [];
          for(var i=0; i<res.rows.length; i++){
            this.Enfermedades.push({
              ID:res.rows.item(i).ID,
              NOMBRE:res.rows.item(i).NOMBRE,
              img99x148:res.rows.item(i).img99x148
            })
          }
        }).catch(e => console.log(e));
    }).catch(e => { console.log(e); });
  }
  relacion(id,nombre){
    this.navCtrl.push( RelacionadosPage, 
      {tipo: "Enfermedad", id: id, nombre: nombre} );
  }
  Pedido(){
    this.navCtrl.setRoot( PedidoPage );
  }
  detalle(){
    this.navCtrl.setRoot( DetalleProductoPage, {idProducto: this.idProducto} );
  }
}
