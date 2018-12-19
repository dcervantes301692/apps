import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SqlProvider } from '../../providers/sql/sql';
import { InformacionPage } from '../informacion/informacion';
import { PedidoPage } from '../pedido/pedido';
import { RelacionadosPage } from '../relacionados/relacionados';
import { ProductosPage } from '../productos/productos';

@IonicPage()
@Component({
  selector: 'page-detalle-producto',
  templateUrl: 'detalle-producto.html',
})
export class DetalleProductoPage {

  detalleProducto: any = [];
  Ingredientes: any = [];
  favorito: any = [];
  cantidad =  1;
  idProducto;
  bandera = 0;
  alias;
  anio;
  
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    private sqlite: SQLite,
    public db: SqlProvider,
    public loadingCtrl: LoadingController) {
      this.idProducto = navParams.get('idProducto');
  }
  ionViewDidLoad(){
    let f = new Date();
    this.anio=f.getFullYear();
    this.SelectProducto();
    this.favorito = this.detalleProducto[0].FAVORITO;
  }

  ionViewDidEnter(){
    let loading = this.loadingCtrl.create({
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }
  //MODIFICA CANTIDADES DE PIEZAS CON RESPECTO AL PRODUCTO
  addCantidad(){
    this.cantidad = this.cantidad + 1;
    if (this.cantidad == 10){
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'Favor de verificar la cantidad',
        buttons: ['Aceptar']
      });
      alert.present();
    }
  }
  removeCantidad(){
    if (this.cantidad > 1){
      this.cantidad = (this.cantidad - 1); 
    }
  }
  //MODIFICA STATUS FAVORITOS
  addFavorito(){
    this.db.addFavorito(this.idProducto);
    this.SelectProducto();
  }
  removeFavorito(){
    this.db.removeFavorito(this.idProducto);
    this.SelectProducto();
  }
  ///AGREGA PRODUCTO A PEDIDO ACTUAL
  btnAgregarPedido(id,precio){
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
          this.db.addPedido(id,this.cantidad,precio,0,0);
        setTimeout(() => {
          this.db.borrarPromo();
        }, 100);
        setTimeout(() => {
          this.db.buscarPromo();
        }, 300);
      });
    }).catch(e => { console.log(e); });
  }
  //FUNCION PARA CAMBIAR DE VENTANA A I PEDIDO VIGENTE
  Pedido(){
    this.navCtrl.setRoot ( PedidoPage );
  }
  //FUNCION PARA CONSULTAR SQLITE DETALLE DE PRODUCTO
  SelectProducto(){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT ID, E1 FROM Usuario', {})
        .then(res => {
          this.alias = 'APP'+res.rows.item(0).ID+res.rows.item(0).E1+this.anio;
        }).catch(e => console.log(e));

      let sql = "SELECT ID,NOMBRE,LINEA,PRECIO,DESCRIPCION,MODOUSO,CONTRAINDICACIONES,";
      sql += "img99x148 FROM Producto WHERE ID =?";
      db.executeSql(sql,[this.idProducto])
        .then(res => {
          this.detalleProducto = [];
            this.detalleProducto.push({
              ID: res.rows.item(0).ID,
              NOMBRE: res.rows.item(0).NOMBRE,
              LINEA: res.rows.item(0).LINEA,
              PRECIO: res.rows.item(0).PRECIO.toFixed(2),
              DESCRIPCION: res.rows.item(0).DESCRIPCION,
              MODOUSO: res.rows.item(0).MODOUSO,
              CONTRAINDICACIONES: res.rows.item(0).CONTRAINDICACIONES,
              img99x148: res.rows.item(0).img99x148
            });

            if (res.rows.item(0).MODOUSO != ""){
              this.bandera = 1;
            }
        }).catch(e => console.log(e));      

      db.executeSql('SELECT * FROM Favorito WHERE FK_idProducto=?',[this.idProducto])
      .then(res => {
        this.favorito = [];
        this.favorito.push({
          FK_idProducto: res.rows.item(0).FK_idProducto
        })
      }).catch(e => {console.log(e); });

      let ingrediente = "SELECT I.ID, I.NOMBRE, I.img99x148 FROM Ingrediente I ";
      ingrediente += "INNER JOIN ProductoIngrediente P ON P.FK_idIngredeinte = I.ID ";
      ingrediente += "WHERE P.FK_idProducto=?";
      db.executeSql(ingrediente, [this.idProducto])
        .then(res => {
          this.Ingredientes = [];
          for(var i = 0; i < res.rows.length; i++) {
            this.Ingredientes.push({
              ID: res.rows.item(i).ID,
              NOMBRE: res.rows.item(i).NOMBRE,
              img99x148: res.rows.item(i).img99x148
            })
          }
        }) .catch(e => console.log(e));
    }).catch(e => { console.log(e); });
  }
  //ABRE VENTANA PARA LA INFORMACION
  openInformacion(){
    this.navCtrl.setRoot( InformacionPage,  
      { idProducto: this.detalleProducto[0].ID,  
        MODOUSO: this.detalleProducto[0].MODOUSO, 
        CONTRAINDICACIONES: this.detalleProducto[0].CONTRAINDICACIONES } );
  }
  relacion(id,nombre){
    this.navCtrl.push( RelacionadosPage, {tipo: "Ingrediente", id: id, nombre: nombre} );
  }
  catalogo(){
    this.navCtrl.setRoot( ProductosPage );
  }
}