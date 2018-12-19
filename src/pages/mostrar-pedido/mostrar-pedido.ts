import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SqlProvider } from '../../providers/sql/sql';
import { PedidoPage } from '../pedido/pedido';

@IonicPage()
@Component({
  selector: 'page-mostrar-pedido',
  templateUrl: 'mostrar-pedido.html',
})
export class MostrarPedidoPage {
  pedidoActual: any = [];
  duplicado: any = [];
  alias;
  Comisionable = "0.00";
  NoComisionable = "0.00";
  TotalVenta = "0.00";
  Ganacia = "0.00";
  Pago = "0.00";
  pedidoEstacion;
  anio;
  constructor(public navCtrl: NavController,
    public db: SqlProvider,
    public navParams: NavParams,
    private sqlite: SQLite,
    public alertCtrl: AlertController) { 
      this.alias = navParams.get('alias');
  }

  ionViewDidLoad() {
    let f = new Date();
    this.anio=f.getFullYear();
    this.SelectPedidoBuscado();
  }
  SelectPedidoBuscado(){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT ID, E1 FROM Usuario', {})
        .then(res => {
          this.pedidoEstacion = 'APP'+res.rows.item(0).ID+res.rows.item(0).E1+this.anio;
        }).catch(e => console.log(e));

      let pedido = 'SELECT P.idProducto, C.VISIBLE, ';
      pedido += 'CASE WHEN length(C.NOMBRE) > 20 THEN substr(C.NOMBRE, 1,20) || "..." ELSE C.NOMBRE END NOMBRE, '
      pedido += 'C.idLinea, C.LINEA, C.COMISIONABLE, C.img99x148, P.CANTIDAD, ';
      pedido += '(P.PRECIO*P.CANTIDAD) PRECIO ';
      pedido += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
      pedido += 'WHERE P.idPedido =?';
      db.executeSql(pedido,[this.alias])
      .then(res => {
        this.pedidoActual = [];
        for(var i=0; i<res.rows.length; i++){
          this.pedidoActual.push({
            idProducto:res.rows.item(i).idProducto,
            VISIBLE:res.rows.item(i).VISIBLE,
            NOMBRE:res.rows.item(i).NOMBRE,
            idLinea:res.rows.item(i).idLinea,
            LINEA:res.rows.item(i).LINEA,
            COMISIONABLE:res.rows.item(i).COMISIONABLE,
            img99x148:res.rows.item(i).img99x148,
            CANTIDAD:res.rows.item(i).CANTIDAD,
            PRECIO:res.rows.item(i).PRECIO.toFixed(2)
          })
        }
      }).catch(e => console.log(e));

      let Totales = 'SELECT SUM(P.PRECIO*P.CANTIDAD) TOTAL, ';
      Totales += 'SUM(CASE WHEN C.COMISIONABLE = 1 THEN (P.PRECIO*P.CANTIDAD) ELSE 0 END) COMI, ';
      Totales += 'SUM(CASE WHEN C.COMISIONABLE = 0 THEN (P.PRECIO*P.CANTIDAD) ELSE 0 END) NOCOMI ';
      Totales += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
      Totales += 'WHERE P.idPedido=?';
      db.executeSql(Totales, [this.alias])
      .then(res => {
        this.TotalVenta = res.rows.item(0).TOTAL.toFixed(2);
        this.Comisionable = res.rows.item(0).COMI.toFixed(2);
        this.NoComisionable = res.rows.item(0).NOCOMI.toFixed(2);
        this.Pago = (parseFloat(res.rows.item(0).TOTAL)*0.70).toFixed(2);
        this.Ganacia = (parseFloat(res.rows.item(0).TOTAL)*0.30).toFixed(2);
      }).catch(e => {console.log(e);
        this.TotalVenta = (0).toFixed(2);
        this.Comisionable = (0).toFixed(2);
        this.NoComisionable = (0).toFixed(2);
        this.Pago = (0).toFixed(2);
        this.Ganacia = (0).toFixed(2);
        this.pedidoActual = [];
      });
    }).catch(e => { console.log(e); });
  }
  add(id,cantidad,precio){
    let neto = precio/cantidad;
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let pedido = 'SELECT P.idPedido ';
      pedido += 'FROM Pedido_Detalle P ';
      pedido += 'WHERE P.idPedido =? ';
      pedido += 'GROUP BY P.idPedido';
      db.executeSql(pedido,[this.alias])
      .then(res => {
        console.log(res);
        let sms = "No puedes agregar el producto, tienes un pedido en proceso ";
        sms += "dentro de la estación";
        let alert = this.alertCtrl.create({
          subTitle: sms,
          buttons: ['Aceptar']
        });
        alert.present();
      }).catch(e => {console.log(e);
          this.db.addPedido(id,1,neto,0,0);
        setTimeout(() => {
          this.db.borrarPromo();
        }, 100);
        setTimeout(() => {
          this.db.buscarPromo();
        }, 300);
      });
    }).catch(e => { console.log(e); });
  }
  duplicar(){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let pedido = 'SELECT P.idPedido ';
      pedido += 'FROM Pedido_Detalle P ';
      pedido += 'WHERE P.idPedido =? ';
      pedido += 'GROUP BY P.idPedido';
      db.executeSql(pedido,[this.alias])
      .then(res => {
        console.log(res);
        let sms = "No puedes duplicar el pedido, tienes un pedido en proceso ";
        sms += "dentro de la estación";
        let alert = this.alertCtrl.create({
          subTitle: sms,
          buttons: ['Aceptar']
        });
        alert.present();
      }).catch(e => {console.log(e);
         for (var i = 0; i < this.pedidoActual.length; i++){
          if (this.pedidoActual[i].VISIBLE == 1){
            this.db.addPedido(
            this.pedidoActual[i].idProducto,
            this.pedidoActual[i].CANTIDAD,
            this.pedidoActual[i].PRECIO,
            0,0);
          }
          if (i == (this.pedidoActual.length-1)){
            let alert = this.alertCtrl.create({
              subTitle: 'Tu pedido fue duplicado con éxito',
            });
            alert.present(); 
            setTimeout(() => {
              alert.dismiss();
              this.navCtrl.setRoot( PedidoPage );
            }, 1500);
          }
         }
        setTimeout(() => {
          this.db.borrarPromo();
        }, 200);
        setTimeout(() => {
          this.db.buscarPromo();
        }, 400);
      });
    }).catch(e => { console.log(e); });
    
  }
  Pedido(){
    this.navCtrl.setRoot( PedidoPage );
  }
}
