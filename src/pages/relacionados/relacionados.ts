import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DetalleProductoPage } from '../detalle-producto/detalle-producto';
import { ProductosPage } from '../productos/productos';

@IonicPage()
@Component({
  selector: 'page-relacionados',
  templateUrl: 'relacionados.html',
})
export class RelacionadosPage {

  Tipo;
  id;
  data: any = [];
  nombre;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private sqlite: SQLite) {
      this.Tipo = navParams.get('tipo');
      this.id = navParams.get('id');
      this.nombre = navParams.get('nombre');
  }
  ionViewDidLoad() {
    this.Select();
  }

  Select(){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      if (this.Tipo == "Enfermedad"){
        let sql = "SELECT P.ID, P.NOMBRE, P.img99x148 FROM Producto P ";
        sql += "INNER JOIN ProductoEnfermedad E ON E.FK_idProducto = P.ID ",
        sql += "WHERE FK_idEnfermedad=?"
        db.executeSql(sql,[this.id])
        .then(res => {
          this.data = [];
          for(var i=0; i<res.rows.length; i++){
            this.data.push({
              ID:res.rows.item(i).ID,
              NOMBRE:res.rows.item(i).NOMBRE,
              img99x148:res.rows.item(i).img99x148,
            })
          }
        }).catch(e => console.log(e));
      }
      else if (this.Tipo == "Ingrediente"){
        let sql = "SELECT P.ID, P.NOMBRE, P.img99x148 FROM Producto P ";
        sql += "INNER JOIN ProductoIngrediente I ON I.FK_idProducto = P.ID ";
        sql += "WHERE FK_idIngredeinte=?"
        db.executeSql(sql,[this.id])
        .then(res => {
          this.data = [];
          for(var i=0; i<res.rows.length; i++){
            this.data.push({
              ID:res.rows.item(i).ID,
              NOMBRE:res.rows.item(i).NOMBRE,
              img99x148:res.rows.item(i).img99x148,
            })
          }
        }).catch(e => console.log(e));
      }
    }).catch(e => { console.log(e); });
  }

  detalle(id){
    this.navCtrl.push( DetalleProductoPage, {idProducto: id} );
  }

  productos(){
    this.navCtrl.setRoot( ProductosPage );
  }
}
