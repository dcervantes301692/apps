import { Component} from '@angular/core';
import { NavController, LoadingController, NavParams} from 'ionic-angular';
import { DetalleProductoPage } from '../../pages/detalle-producto/detalle-producto';
import { SqlProvider }  from '../../providers/sql/sql';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { PedidoPage } from '../pedido/pedido';

@Component({
  selector: 'page-productos',
  templateUrl: 'productos.html',
})
export class ProductosPage {
  Lineas: any = [];
  Productos: any = [];
  ProductoTop: any = [];
  ProductoNuevo: any = [];
  Bandera = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public db: SqlProvider,
    private sqlite: SQLite) {}
    
  ionViewDidLoad(){
    let loading = this.loadingCtrl.create({
    });
  
    setTimeout(() => {
      document.getElementById('ocultaCatalogo').style.display = "none";
    }, 2500);

    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }
  ionViewDidEnter(){
    this.Productos = this.db.Productos;
    this.Lineas = this.db.Lineas;
    this.ProductoNuevo = this.db.ProductoNuevo;
    this.ProductoTop = this.db.ProductoTop;
  }
  detalle(id){
    this.navCtrl.setRoot( DetalleProductoPage, {idProducto: id} );
  }
  SelectData(){
    this.Productos = [];
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
        db.executeSql('SELECT ID,NOMBRE,idLinea,img99x148 FROM Producto WHERE NUEVO = 1', {})
        .then(res => {
          this.ProductoNuevo = [];
          for(var i = 0; i < res.rows.length; i++) {
            this.ProductoNuevo.push({
              ID: res.rows.item(i).ID,
              NOMBRE: res.rows.item(i).NOMBRE,
              idLinea: res.rows.item(i).idLinea,
              img99x148: res.rows.item(i).img99x148
            })
          }
        }) .catch(e => console.log(e));

        let topProducto = "SELECT P.ID,P.NOMBRE,P.idLinea,P.img99x148 FROM Producto P ";
        topProducto += "INNER JOIN Top T ON T.FK_idProducto = P.ID";
        db.executeSql(topProducto, {})
        .then(res => {
          this.ProductoTop = [];
          for(var i = 0; i < res.rows.length; i++) {
            this.ProductoTop.push({
              ID: res.rows.item(i).ID,
              NOMBRE: res.rows.item(i).NOMBRE,
              idLinea: res.rows.item(i).idLinea,
              img99x148: res.rows.item(i).img99x148
            })
          }
        }) .catch(e => console.log(e));
    }).catch(e => { console.log(e); });
  }
  Pedido(){
    this.navCtrl.setRoot( PedidoPage );
  }
}
