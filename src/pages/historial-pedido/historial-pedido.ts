import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { MostrarPedidoPage } from '../mostrar-pedido/mostrar-pedido';
import { ProductosPage } from '../productos/productos';

@IonicPage()
@Component({
  selector: 'page-historial-pedido',
  templateUrl: 'historial-pedido.html',
})
export class HistorialPedidoPage {

  pedidos: any = [];
  nombreVentana = "Mis Pedidos";
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sqlite: SQLite,
    public loadingCtrl: LoadingController){
  }

   /* SATATUS
    0 - EDICIÓN 
    1 - ENVIADO - AVION
    2 - AUTORIZADO - PALOMITAS 
    3 - ENBARCADO - CAMION
    4 - ENTREGADO - BLEN
    5 - RECHAZADO - CRUZ
    6 - NO ENVIADO - WARNING
    
    WEB
    1 - ENVIADO
    2 - TRANSFERIDO
    4 - ENBARCADO*/
  ionViewDidLoad() {
    this.SelectPedidos();
  }
  SelectPedidos(){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let sql = "SELECT P.idPedido, P.STATUS, substr(P.idPedido,-4) ANIO, ";
      sql += "substr(P.idPedido,-6,2) ESTACION, "
      sql += "SUM((P.PRECIO*P.CANTIDAD)) TOTAL, SUM((P.CANTIDAD)) PIEZAS ";
      sql += "FROM Pedido_Detalle P WHERE P.STATUS > 0 ";
      sql += "GROUP BY P.idPedido, P.STATUS";
      db.executeSql(sql,[])
      .then(res => {
        this.pedidos = [];
        for(var i=0; i<res.rows.length; i++){
          this.pedidos.push({
            idPedido:res.rows.item(i).idPedido,
            ESTACION: "Estación: " + res.rows.item(i).ESTACION + " - " + res.rows.item(i).ANIO,
            STATUS:res.rows.item(i).STATUS,
            TOTAL: new Intl.NumberFormat().format(res.rows.item(0).TOTAL),
            PIEZAS:res.rows.item(i).PIEZAS + " artículos"
          })
        }
      }).catch(e => console.log(e));

      let sqlja = "SELECT * ";
      sql += "FROM ProductoPromociones";
      db.executeSql(sqlja,[])
      .then(res => {
        this.pedidos = [];
        for(var i=0; i<res.rows.length; i++){
          this.pedidos.push({
            ID:res.rows.item(i).ID,
            MINIMO_PIEZAS: res.rows.item(i).MINIMO_PIEZAS,
            EXCEPCION_CODIGO:res.rows.item(i).EXCEPCION_CODIGO,
            LINEAS:res.rows.item(i).LINEAS,
            MINIMO_COMPRA:res.rows.item(i).MINIMO_COMPRA,
            MULTIPLE:res.rows.item(i).MULTIPLE,
            CODIGOS:res.rows.item(i).CODIGOS
          })
        }
      }).catch(e => console.log(e));
    }).catch(e => { console.log(e); });
  }
  detalle(pedido){
    this.navCtrl.setRoot( MostrarPedidoPage, { alias: pedido} );
  }
  Productos(){
    this.pedidos = [];
    this.nombreVentana = "Productos";
    this.navCtrl.setRoot( ProductosPage );
  }
}
