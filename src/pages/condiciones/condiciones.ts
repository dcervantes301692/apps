import { AlertController, ModalController, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { WsappsProvider } from '../../providers/wsapps/wsapps';
import { HistorialPedidoPage } from '../historial-pedido/historial-pedido';
import { SqlProvider } from '../../providers/sql/sql';
import { PedidoPage } from '../pedido/pedido';

@Component({
  selector: 'page-condiciones',
  templateUrl: 'condiciones.html',
})
export class CondicionesPage {

  TotalVenta;
  TotalPiezas;
  pedidoActual: any = [];
  usuario;
  estacion;
  catalogo;
  anio;
  alias;
  bandera = 0;

  constructor( public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private sqlite: SQLite,
    private ws: WsappsProvider,
    private db: SqlProvider,
    public modalCtrl: ModalController) {
  }

  ionViewDidLoad(){
    this.SelectPedidoActual();
    let f = new Date();
    this.anio=f.getFullYear();
  }
  aceptar(){
    let alert = this.alertCtrl.create({
      message: 'Una vez enviado tu pedido, no puede modificarse',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.navCtrl.setRoot( PedidoPage );
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.alias = "APP"+this.usuario+this.estacion+this.anio;
            this.enviar();
          }
        }
      ]
    });
    alert.present();
  }

  SelectPedidoActual(){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT ID,E1 FROM Usuario',{})
        .then(res => {
          this.usuario =res.rows.item(0).ID;
          this.estacion=res.rows.item(0).E1;
      }).catch(e => { console.log(e); });

      db.executeSql('SELECT ID FROM Vigencia_Catalogo',{})
        .then(res => {
          this.catalogo=res.rows.item(0).ID;
      }).catch(e => { console.log(e); });

      let pedido = 'SELECT P.idProducto, P.TIPO, ';
        pedido += 'P.PRECIO, P.CANTIDAD ';
        pedido += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
        pedido += 'WHERE P.STATUS = 0';
        db.executeSql(pedido,[])
        .then(res => {
          this.pedidoActual = [];
          for(var i=0; i<res.rows.length; i++){
            this.pedidoActual.push({
              idProducto:res.rows.item(i).idProducto,
              TIPO:res.rows.item(i).TIPO,
              CANTIDAD:res.rows.item(i).CANTIDAD,
              PRECIO:res.rows.item(i).PRECIO
            })
          }
        }).catch(e => {console.log(e);
          alert("fallo consulta pedido");
        });

      let Totales = 'SELECT SUM(P.PRECIO*P.CANTIDAD) TOTAL, SUM(CANTIDAD) PIEZAS ';
      Totales += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
      Totales += 'WHERE P.STATUS = 0';
      db.executeSql(Totales, {})
      .then(res => {
        this.TotalVenta = res.rows.item(0).TOTAL;
        this.TotalPiezas = res.rows.item(0).PIEZAS;
      }).catch(e => {console.log(e);});
    }).catch(e => { console.log(e); });
  }
  enviar(){
    this.ws.EncabezadoPedido(this.usuario,this.catalogo,
      this.estacion,this.TotalPiezas,this.TotalVenta).subscribe( 
      res => {
        if (res[0].valido != this.alias){
          for(var i = 0; i < this.pedidoActual.length; i ++){
            this.ws.DetallePedido(
              this.usuario,
              this.pedidoActual[i].idProducto,
              this.pedidoActual[i].PRECIO,
              this.pedidoActual[i].CANTIDAD,
              res[0].valido,
              this.pedidoActual[i].TIPO
              ).subscribe( articulo => {
            })
            if (i == (this.pedidoActual.length-1)){
              this.db.CambiarStatusPedido(this.alias);
              let alert = this.alertCtrl.create({
                subTitle: 'Tu pedidio fue enviado con éxito, referencia: '+ this.alias,
              });
              alert.present(); 
              setTimeout(() => {
                this.navCtrl.setRoot( HistorialPedidoPage );
                alert.dismiss();
              }, 2000);
            }
          }
        }
        else if (res[0].valido == this.alias){
          let alert = this.alertCtrl.create({
            subTitle: 'Tienes un pedido en proceso en esta estacion: '+ this.alias,
          });
          alert.present(); 
          setTimeout(() => {
            this.navCtrl.setRoot( HistorialPedidoPage );
            alert.dismiss();
          }, 2000);
        }
    })
  }
}
