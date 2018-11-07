import { AlertController, ModalController, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { WsappsProvider } from '../../providers/wsapps/wsapps';
import { HistorialPedidoPage } from '../historial-pedido/historial-pedido';

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
  pedido: any = [];
  alias;
  bandera = 0;

  constructor( public alertCtrl: AlertController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private sqlite: SQLite,
    private ws: WsappsProvider,
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
            console.log('Cancel clicked');
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

      let pedido = 'SELECT P.idProducto, ';
      pedido += 'CASE WHEN C.idLinea != 96 THEN 0 ELSE 1 END TIPO, '
      pedido += 'P.CANTIDAD, P.PRECIO ';
      pedido += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
      pedido += 'WHERE P.idPedido = 0';
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
      }).catch(e => console.log(e));

      let Totales = 'SELECT SUM(P.PRECIO*P.CANTIDAD) TOTAL, SUM(CANTIDAD) PIEZAS ';
      Totales += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
      Totales += 'WHERE P.idPedido = 0';
      db.executeSql(Totales, {})
      .then(res => {
        this.TotalVenta = res.rows.item(0).TOTAL;
        this.TotalPiezas = res.rows.item(0).PIEZAS;
      }).catch(e => {console.log(e);});


      let EncabezadoPedido = 'SELECT * FROM Pedido';
      db.executeSql(EncabezadoPedido, {})
      .then(res => {
        this.pedido = [];
        for(var i=0; i<res.rows.length; i++){
          this.pedido.push({
            NOMBRE:res.rows.item(i).NOMBRE,
            ESTACION:res.rows.item(i).ESTACION,
            ANIO:res.rows.item(i).ANIO,
            STATUS:res.rows.item(i).STATUS
          })
        }
      }).catch(e => {console.log(e);});
    }).catch(e => { console.log(e); });
  }
  enviar(){
    this.ws.EncabezadoPedido(this.usuario,this.catalogo,
      this.estacion,this.TotalPiezas,this.TotalVenta).subscribe( 
      res => {
        if (res[0].valido == "001"){
          let alert = this.alertCtrl.create({
            subTitle: 'Comunicate con tu DMI',
          });
          alert.present(); 
          setTimeout(() => {
            alert.dismiss();
          }, 2000);
          this.navCtrl.pop();
        }
        else if (res[0].valido != this.alias && res[0].valido != "001"){
          for (var i = 0; i < this.pedidoActual.length; i++){
            this.ws.DetallePedido(this.usuario,
              this.pedidoActual[i].idProducto,
              this.pedidoActual[i].PRECIO,
              this.pedidoActual[i].CANTIDAD,
              res[0].valido,
              this.pedidoActual[i].TIPO
            ).subscribe(ok => {
              if (ok[0].valido == this.TotalVenta){
                this.bandera = 1;
                let alert = this.alertCtrl.create({
                  subTitle: 'Tu pedio fue enviado con éxito',
                });
                alert.present(); 
                setTimeout(() => {
                  alert.dismiss();
                }, 1500);
                this.navCtrl.setRoot ( HistorialPedidoPage );
              }
            });
          }
        }
        else if (res[0].valido == this.alias){
          let alert = this.alertCtrl.create({
            subTitle: 'Tienes un pedido enviado con rstreo ' + '"' + res[0].valido + '"',
          });
          alert.present(); 
          setTimeout(() => {
            alert.dismiss();
          }, 1500);
          this.navCtrl.setRoot ( HistorialPedidoPage );
        }
    })
  }
  ionViewWillLeave(){
    if (this.bandera == 1){
      this.sqlite.create({
        name: 'dbBlenApp.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        let pedido = 'SELECT P.idProducto ';
        pedido += 'FROM Pedido_Detalle P ';
        pedido += 'WHERE P.STATUS = 0 AND idPedido="0"';
        db.executeSql(pedido,[])
        .then(res => {
          this.pedidoActual = [];
          for(var i=0; i<res.rows.length; i++){
            let sql = "UPDATE Pedido_Detalle SET idPedido=?, STATUS=? ";
            sql += "WHERE STATUS=0 AND idProducto=?";
            db.executeSql(sql,[this.alias,1,res.rows.item(i).idProducto])
              .then(res => { console.log(res); }).catch(e => { console.log(e); });
          }
        }).catch(e => console.log(e))
      }).catch(e => { console.log(e); });
    }
  }
}
