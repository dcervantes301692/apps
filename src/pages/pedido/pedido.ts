import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, AlertController } from 'ionic-angular';
import { SqlProvider } from '../../providers/sql/sql';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import * as $ from "jquery";
import { HistorialPedidoPage } from '../historial-pedido/historial-pedido';
import { CondicionesPage } from '../condiciones/condiciones';
import { Lexer } from '@angular/compiler';

@IonicPage()
@Component({
  selector: 'page-pedido',
  templateUrl: 'pedido.html',
})
export class PedidoPage {
  pedidoActual: any = [];
  promoAplicadas: any = [];
  Comisionable = "0.00";
  NoComisionable = "0.00";
  TotalVenta = "0.00";
  Ganacia = "0.00";
  Pago = "0.00";
  BuscarP ="";
  ProductoBusqueda: any = [];
  cantidadBuscador;
  minimoVenta;
  codigoKit;
  alias;
  anio;

  constructor(public navCtrl: NavController,
    private sqlite: SQLite,
    public alertCtrl: AlertController,
    public db: SqlProvider,
    public modalCtrl: ModalController){
      $(document).ready(function(){
        $('.BTNbusqueda').click(function(){
          $('.tablaBusqueda').slideToggle("slow");
          $('#habil').toggle();
          $('#inhabil').toggle();
          $('.inputBusqueda').focus();
        });
      });
    }
    //EVENTO LOAD CONSULTA PARA LA VENTANA
    ionViewDidLoad(){
      this.SelectPedidoActual();
      let f = new Date();
      this.anio=f.getFullYear();
    }
    //PEDIDO ACTUAL
    SelectPedidoActual(){
      this.sqlite.create({
        name: 'dbBlenApp.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('SELECT CODIGOKIT, MINIMO_VENTA, ID, E1 FROM Usuario', {})
        .then(res => {
          this.codigoKit = res.rows.item(0).CODIGOKIT;
          this.minimoVenta = res.rows.item(0).MINIMO_VENTA;
          this.alias = 'APP'+res.rows.item(0).ID+res.rows.item(0).E1+this.anio;
        }).catch(e => console.log(e));

        let Totales = 'SELECT SUM(P.PRECIO*P.CANTIDAD) TOTAL, ';
        Totales += 'SUM(CASE WHEN C.COMISIONABLE = 1 THEN (P.PRECIO*P.CANTIDAD) ELSE 0 END) COMI, ';
        Totales += 'SUM(CASE WHEN C.COMISIONABLE = 0 THEN (P.PRECIO*P.CANTIDAD) ELSE 0 END) NOCOMI ';
        Totales += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
        Totales += 'WHERE P.STATUS = 0 AND C.idLinea NOT IN (89)';
        db.executeSql(Totales, {})
        .then(res => {
          this.TotalVenta = res.rows.item(0).TOTAL.toFixed(2);
          this.Comisionable = res.rows.item(0).COMI.toFixed(2);
          this.NoComisionable = res.rows.item(0).NOCOMI.toFixed(2);
          this.Pago = (parseFloat(res.rows.item(0).TOTAL)*0.70).toFixed(2);
          this.Ganacia = (parseFloat(res.rows.item(0).TOTAL)*0.30).toFixed(2);

          if (parseFloat(this.TotalVenta) >= 900 && this.codigoKit != "NA"){
            this.ObtieneKit();
          }
          else{
            this.deleteKit(this.codigoKit);
          }
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
    //MODIFICA EL PEDIDO ACTUAL
    removeProducto(idProducto, cantidad){
      this.db.DecrementarCantidad(idProducto, cantidad);
      setTimeout(() => {
        this.db.borrarPromo();
      }, 200);
      setTimeout(() => {
        this.db.buscarPromo();
      }, 400);
      setTimeout(() => {
        this.SelectPedidoActual();
      }, 600);
    }
    addProducto(idProducto, cantidad){
      this.db.IncrementarCantidad(idProducto, cantidad);
      setTimeout(() => {
        this.db.borrarPromo();
      }, 200);
      setTimeout(() => {
        this.db.buscarPromo();
      }, 400);
      setTimeout(() => {
        this.SelectPedidoActual();
      }, 600);
    }
    deleteProducto(id){
      this.db.Eliminarproducto(id);
      setTimeout(() => {
        this.db.borrarPromo();
      }, 200);
      setTimeout(() => {
        this.db.buscarPromo();
      }, 400);
      setTimeout(() => {
        this.SelectPedidoActual();
      }, 600);
    }
    //BUSCAR PRODUCTO CATALOGO
    btnBuscar(){
      this.cantidadBuscador = 1;
      this.sqlite.create({
        name: 'dbBlenApp.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        let sql = 'SELECT C.ID, C.LINEA, C.PRECIO, C.img99x148, ';
        sql += 'CASE WHEN length(C.NOMBRE) > 20 THEN substr(C.NOMBRE, 1,20) || "..." ELSE C.NOMBRE END NOMBRE '
        sql += 'FROM Producto C WHERE ID=? AND C.VISIBLE = 1';
          db.executeSql(sql,[this.BuscarP])
          .then(res => {
            this.ProductoBusqueda = [];
              this.ProductoBusqueda.push({
                ID:res.rows.item(0).ID,
                NOMBRE:res.rows.item(0).NOMBRE,
                LINEA:res.rows.item(0).LINEA,
                PRECIO:res.rows.item(0).PRECIO.toFixed(2),
                img99x148:res.rows.item(0).img99x148
              })
              this.BuscarP = "";
          }).catch(e => { console.log(e);
            let alert = this.alertCtrl.create({
              subTitle: 'Ingresa un código valido',
            });
            alert.present(); 
            setTimeout(() => {
              alert.dismiss();
            }, 1500);
          });
      }).catch(e => { console.log(e); });
    }
    removeBusqueda(){
      if (this.cantidadBuscador > 1){
        this.cantidadBuscador = this.cantidadBuscador - 1;
      }
    }
    addBusqueda(){
      this.cantidadBuscador = this.cantidadBuscador + 1;
      if (this.cantidadBuscador == 10){
        let alert = this.alertCtrl.create({
          subTitle: 'Favor de verificar la cantidad',
        });
        alert.present(); 
        setTimeout(() => {
          alert.dismiss();
        }, 1000);
      }
    }    
    btnCancelar(){
      this.ProductoBusqueda = [];
      document.getElementById("tablaBusqueda").style.display = "none";
      document.getElementById("habil").style.display = "block";
      document.getElementById("inhabil").style.display = "none";
      this.cantidadBuscador = 1;
      this.BuscarP ="";
    }
    btnAgregar(id,precio){
       this.sqlite.create({
        name: 'dbBlenApp.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        let pedido = 'SELECT P.idPedido ';
        pedido += 'FROM Pedido_Detalle P ';
        pedido += 'WHERE P.idPedido =? ';
        pedido += 'GROUP BY P.idPedido';
        db.executeSql(pedido,[this.alias])
        .then(res => {console.log(res);
          let sms = "No puedes agregar el producto, tienes un pedido en proceso ";
        sms += "dentro de la estación";
        let alert = this.alertCtrl.create({
          subTitle: sms,
          buttons: ['Aceptar']
        });
        alert.present();
        }).catch(e => {console.log(e);
            this.db.addPedido(id,this.cantidadBuscador,precio,0,0);
          document.getElementById("tablaBusqueda").style.display = "none";
          document.getElementById("habil").style.display = "block";
          document.getElementById("inhabil").style.display = "none";
          this.ProductoBusqueda = [];
          setTimeout(() => {
            this.db.borrarPromo();
          }, 100);
          setTimeout(() => {
            this.db.buscarPromo();
          }, 300);
          setTimeout(() => {
            this.SelectPedidoActual();
          }, 500);
        });
      }).catch(e => { console.log(e); });
    }
    ocultar(){
      this.BuscarP ="";
    }
    /////////////////////////////
    //KITS    
    ObtieneKit(){
      this.sqlite.create({
        name: 'dbBlenApp.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        let sql = "SELECT ID,PRECIO FROM Producto WHERE ID=?";
        db.executeSql(sql,[this.codigoKit])
        .then(res => {
          this.db.duplicarPedido(res.rows.item(0).ID,1,res.rows.item(0).PRECIO);
          setTimeout(() => {
            this.totalesKit();
          }, 1000);
        }).catch(e => console.log(e));
      }).catch(e => { console.log(e); });
    }
    totalesKit(){
      this.sqlite.create({
        name: 'dbBlenApp.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        let pedido = 'SELECT P.idProducto, P.OTORGA, ';
        pedido += 'CASE WHEN length(C.NOMBRE) > 20 THEN substr(C.NOMBRE, 1,20) || "..." ELSE C.NOMBRE END NOMBRE, '
        pedido += 'C.idLinea, C.LINEA, C.img99x148, P.CANTIDAD, C.VISIBLE, ';
        pedido += '(P.PRECIO*P.CANTIDAD) PRECIO ';
        pedido += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
        pedido += 'WHERE P.STATUS = 0';
        db.executeSql(pedido,[])
        .then(res => {
          this.pedidoActual = [];
          for(var i=0; i<res.rows.length; i++){
            this.pedidoActual.push({
              idProducto:res.rows.item(i).idProducto,
              OTORGA:res.rows.item(i).OTORGA,
              NOMBRE:res.rows.item(i).NOMBRE,
              idLinea:res.rows.item(i).idLinea,
              LINEA:res.rows.item(i).LINEA,
              img99x148:res.rows.item(i).img99x148,
              CANTIDAD:res.rows.item(i).CANTIDAD,
              VISIBLE:res.rows.item(i).VISIBLE,
              PRECIO:res.rows.item(i).PRECIO.toFixed(2)
            })
          }
        }).catch(e => console.log(e));

        let Totales2 = 'SELECT SUM(P.PRECIO*P.CANTIDAD) TOTAL, ';
        Totales2 += 'SUM(CASE WHEN C.COMISIONABLE = 1 THEN (P.PRECIO*P.CANTIDAD) ELSE 0 END) COMI, ';
        Totales2 += 'SUM(CASE WHEN C.COMISIONABLE = 0 THEN (P.PRECIO*P.CANTIDAD) ELSE 0 END) NOCOMI ';
        Totales2 += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
        Totales2 += 'WHERE P.STATUS = 0';
        db.executeSql(Totales2, {})
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
    removekit(idProducto, cantidad){
      if (cantidad == 1){
        var newCant = parseInt(cantidad)-1;
        this.sqlite.create({
          name: 'dbBlenApp.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          let sql = "UPDATE Pedido_Detalle SET CANTIDAD=? ";
          sql += "WHERE idPedido = 0 AND idProducto=?";
          db.executeSql(sql,[newCant,idProducto])
            .then(res => { console.log(res); })
            .catch(e => { console.log(e); });
        }).catch(e => { console.log(e); });
        this.SelectPedidoActual();
      }
    }
    addkit(idProducto, cantidad){
      if (cantidad == 0){
        var newCant = parseInt(cantidad)+1;
        this.sqlite.create({
          name: 'dbBlenApp.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          let sql = "UPDATE Pedido_Detalle SET CANTIDAD=? ";
          sql += "WHERE idPedido = 0 AND idProducto=?";
          db.executeSql(sql,[newCant,idProducto])
            .then(res => { console.log(res); })
            .catch(e => { console.log(e); });
        }).catch(e => { console.log(e); });
        this.SelectPedidoActual();
      }
    }
    deleteKit(id){
      this.sqlite.create({
        name: 'dbBlenApp.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('DELETE FROM Pedido_Detalle WHERE idPedido=0 AND STATUS=0 AND idProducto=?',[id])
        .then(res => { console.log(res); }).catch(e => { console.log(e); });

        let pedido = 'SELECT P.idProducto, P.OTORGA, ';
        pedido += 'CASE WHEN length(C.NOMBRE) > 20 THEN substr(C.NOMBRE, 1,20) || "..." ELSE C.NOMBRE END NOMBRE, '
        pedido += 'C.idLinea, C.LINEA, C.img99x148, P.CANTIDAD, C.VISIBLE, ';
        pedido += '(P.PRECIO*P.CANTIDAD) PRECIO ';
        pedido += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
        pedido += 'WHERE P.STATUS = 0';
        db.executeSql(pedido,[])
        .then(res => {
          this.pedidoActual = [];
          for(var i=0; i<res.rows.length; i++){
            this.pedidoActual.push({
              idProducto:res.rows.item(i).idProducto,
              OTORGA:res.rows.item(i).OTORGA,
              NOMBRE:res.rows.item(i).NOMBRE,
              idLinea:res.rows.item(i).idLinea,
              LINEA:res.rows.item(i).LINEA,
              img99x148:res.rows.item(i).img99x148,
              CANTIDAD:res.rows.item(i).CANTIDAD,
              VISIBLE:res.rows.item(i).VISIBLE,
              PRECIO:res.rows.item(i).PRECIO.toFixed(2)
            });
          }
        }).catch(e => console.log(e));

        let Totales = 'SELECT SUM(P.PRECIO*P.CANTIDAD) TOTAL, ';
        Totales += 'SUM(CASE WHEN C.COMISIONABLE = 1 THEN (P.PRECIO*P.CANTIDAD) ELSE 0 END) COMI, ';
        Totales += 'SUM(CASE WHEN C.COMISIONABLE = 0 THEN (P.PRECIO*P.CANTIDAD) ELSE 0 END) NOCOMI ';
        Totales += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
        Totales += 'WHERE P.idPedido = 0 AND C.idLinea NOT IN (89)';
        db.executeSql(Totales, {})
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
    ///////////////////////////////
    //ENVIO DE PEDIDO
    Enviar(){
      if(parseFloat(this.TotalVenta) == 0){
        let alert = this.alertCtrl.create({
          subTitle: ' Tú pedido se encuentra vacío ',
        });
        alert.present(); 
        setTimeout(() => {
          alert.dismiss();
        }, 1500);
      }
      else if(parseFloat(this.TotalVenta) < this.minimoVenta){
        let alert = this.alertCtrl.create({
          subTitle: 'Recuerda que tu pedido debe tener un minimo de $ ' + this.minimoVenta.toFixed(2),
        });
        alert.present(); 
        setTimeout(() => {
          alert.dismiss();
        }, 1500);
      }
      else if (parseFloat(this.TotalVenta) >= this.minimoVenta){
        this.validacion();
      }
    }
    validacion(){
      let alert = this.alertCtrl.create({
        message: 'Verifica los productos y promociones en tu pedido',
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
              this.terminos();
            }
          }
        ]
      });
      alert.present(); 
    }
    terminos(){
      this.navCtrl.setRoot( CondicionesPage );
    }
    //////////////////////////////
    //PRMOCIONES
    removePromo(idProducto, cantidad){
      this.db.DecrementarPromo(idProducto, cantidad);
      setTimeout(() => {
        this.SelectPedidoActual();
      }, 600);
    }
    addPrmo(idProducto, cantidad, disponible){
      this.db.IncrementaPromo(idProducto, cantidad,disponible);
      setTimeout(() => {
        this.SelectPedidoActual();
      }, 600);
    }
}
