import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DetalleProductoPage } from '../detalle-producto/detalle-producto';
import { PedidoPage } from '../pedido/pedido';

@IonicPage()
@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})
export class FavoritosPage {

  favoritos: any = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private sqlite: SQLite) {
  }

  ionViewDidLoad() {
    this.MisFavoritosSQL();
  }

  MisFavoritosSQL(){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let fav = "SELECT C.ID, C.NOMBRE, C.img99x148 FROM Producto C ";
      fav += "INNER JOIN Favorito F ON F.FK_idProducto = C.ID";
      db.executeSql(fav,{})
      .then(res => {
        this.favoritos = [];
        for(var i=0; i<res.rows.length; i++){
          this.favoritos.push({
            ID:res.rows.item(i).ID,
            NOMBRE:res.rows.item(i).NOMBRE,
            img99x148:res.rows.item(i).img99x148,
          })
        }
      }).catch(e => console.log(e));
    }).catch(e => { console.log(e); });
  }

  detalle(id){
    this.navCtrl.push( DetalleProductoPage, {idProducto: id, btn: 1} );
  }

  Pedido(){
    this.navCtrl.setRoot( PedidoPage );
  }

}
