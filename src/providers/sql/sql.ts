import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { WsappsProvider } from '../wsapps/wsapps';
import { Toast } from '@ionic-native/toast';

@Injectable()
export class SqlProvider {

  idPromotor;
  estacionActual;
  minimoVenta;
  codigoKit;
  Lineas: any = [];
  Productos: any = [];
  ProductoTop: any = [];
  ProductoNuevo: any = [];
  duplicado;

  constructor(public http: HttpClient,
    public ws: WsappsProvider,
    public alertCtrl: AlertController,
    private sqlite: SQLite,
    private toast: Toast,
    public loadingCtrl: LoadingController) {
         
  }

  IngresaData(login, vigenciaCatalogo, producto, flayer, 
    ingrediente, productoIngrediente, top, enfermedad, 
    productoEnfermedad, Ayuda){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let DropUsuario = "DROP TABLE IF EXISTS Usuario";
      db.executeSql(DropUsuario, {})
        .then(res => console.log(res + 'Executed SQL')).catch(err => console.log(err));

      let sqlUsuario = "CREATE TABLE IF NOT EXISTS Usuario ";
      sqlUsuario += "(ID INT PRIMARY KEY, NOMBRE TEXT, DMI INT, ULTIMA_VENTA REAL, ";
      sqlUsuario += "PENULTIMA_VENTA REAL, ANTE_PENULTIMA_VENTA REAL, ";
      sqlUsuario += "ANTE_ANTE_PENULTIMA_VENTA REAL, E1 INT, E2 INT, E3 INT, E4 INT, ";
      sqlUsuario += "VIGENCIAPERFIL DATE, VIGENCIAESTACION DATE, KIT INT, ";
      sqlUsuario += "CODIGOKIT TEXT, PUNTOS REAL, MINIMO_VENTA REAL, FOTO BLOB)";
      db.executeSql(sqlUsuario, {})
        .then(res => console.log(res + 'Executed SQL')).catch(err => console.log(err));

      db.executeSql('INSERT INTO Usuario VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NULL)',[
        login[0].id,
        login[0].nombre,
        login[0].DMI,
        login[0].v1,
        login[0].v2,
        login[0].v3,
        login[0].v4,
        login[0].e1,
        login[0].e2,
        login[0].e3,
        login[0].e4,
        login[0].vigenciaLogin,
        '2018-11-03',
        login[0].kit,
        login[0].codigoKit,
        login[0].puntos,
        login[0].minimoVenta
      ]).then(res => { console.log(res); 
        /*  this.toast.show('Usuario', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        ); */
      }).catch(e => { console.log(e); });

      let DropVigenciaCatalogo = "DROP TABLE IF EXISTS Vigencia_Catalogo";
      db.executeSql(DropVigenciaCatalogo, {})
        .then(res => console.log(res + 'Executed SQL')).catch(err => console.log(err));

      let SQLvigenciaCatalogo = "CREATE TABLE IF NOT EXISTS Vigencia_Catalogo ";
      SQLvigenciaCatalogo += "(ID INT PRIMARY KEY, NOMBRE TEXT, FIN_VIGENCIA DATE)"
      db.executeSql(SQLvigenciaCatalogo, {})
        .then(res => console.log(res,'Executed SQL')).catch(e => console.log(e));

      db.executeSql('INSERT INTO Vigencia_Catalogo VALUES(?,?,?)',[
        vigenciaCatalogo[0].clave,
        vigenciaCatalogo[0].name,
        vigenciaCatalogo[0].fin
      ]).then(res => { console.log(res); 
        /* this.toast.show('vigencia', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        ); */
      }).catch(e => { console.log(e); });

      let DropCatalogo = "DROP TABLE IF EXISTS Producto";
      db.executeSql(DropCatalogo, {})
        .then(res => console.log(res + 'Executed SQL')).catch(err => console.log(err));

      let sqlCatalogo = "CREATE TABLE IF NOT EXISTS Producto (ID INT PRIMARY KEY, ";
      sqlCatalogo += "NOMBRE TEXT, idLinea INT, LINEA TEXT, FK_idCatalogo INT, ";
      sqlCatalogo += "PRECIO REAL, COMISIONABLE INT, DESCRIPCION TEXT, MODOUSO TEXT, ";
      sqlCatalogo += "CONTRAINDICACIONES TEXT, img99x148 BLOB, CONVERSION INT, TIPO INT, ";
      sqlCatalogo += "ORDEN INT, NUEVO INT)";
      db.executeSql(sqlCatalogo, {})
        .then(res => console.log(res + 'Executed SQL')).catch(err => console.log(err));

      for (var a = 0; a < Object.keys(producto).length; a++){
        db.executeSql('INSERT INTO Producto VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[
          producto[a].id,
          producto[a].nombre,
          producto[a].idLinea,
          producto[a].linea,
          vigenciaCatalogo[0].clave,
          producto[a].precio,
          producto[a].comisionable,
          producto[a].descripcion,
          producto[a].modoUso,
          producto[a].contraIndicaciones,
          producto[a].imagen,
          0,
          0,
          producto[a].orden,
          producto[a].nuevo
        ]).then(res => { console.log(res); 
          /*  this.toast.show('Producto', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          ); */
        }).catch(e => { console.log(e); });
      }

      let Dropflayer = "DROP TABLE IF EXISTS Flayer";
      db.executeSql(Dropflayer, {})
        .then(res => console.log(res + 'Executed SQL')).catch(err => console.log(err));

      let SQLflayer = "CREATE TABLE IF NOT EXISTS Flayer ";
      SQLflayer += "(ID INT PRIMARY KEY, BASE TEXT, IMGFLAYER BLOB)"
      db.executeSql(SQLflayer, {})
        .then(res => console.log(res,'Executed SQL')).catch(e => console.log(e));

      for (var b = 0; b < Object.keys(flayer).length; b++){
        db.executeSql('INSERT INTO Flayer VALUES(?,?,?)',[
          flayer[b].id,
          flayer[b].base_promocion,
          flayer[b].img
        ]).then(res => { console.log(res); 
          /* this.toast.show('flayer', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          ); */
        }).catch(e => { console.log(e); });
      }

      let sqlIngrediente = "CREATE TABLE IF NOT EXISTS Ingrediente ";
      sqlIngrediente += "(ID INT PRIMARY KEY, NOMBRE TEXT, img99x148 BLOB)";
      db.executeSql(sqlIngrediente, {})
        .then(res => console.log(res + 'Executed SQL')).catch(err => console.log(err));

      for (var c = 0; c < Object.keys(ingrediente).length; c++){
        db.executeSql('INSERT INTO Ingrediente VALUES(?,?,?)',[
          ingrediente[c].id,
          ingrediente[c].nombre,
          ingrediente[c].img
        ]).then(res => { console.log(res); 
          /*  this.toast.show('Ingrediente', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          ); */
        }).catch(e => { console.log(e); });
      }

      let DropIngredientecatalogo = "DROP TABLE IF EXISTS ProductoIngrediente";
      db.executeSql(DropIngredientecatalogo, {})
        .then(res => console.log(res + 'Executed SQL')).catch(err => console.log(err));

      let SQLingrediente_Producto = "CREATE TABLE IF NOT EXISTS ProductoIngrediente ";
      SQLingrediente_Producto += "(FK_idProducto INT, FK_idIngredeinte INT)"
      db.executeSql(SQLingrediente_Producto, {})
        .then(res => console.log(res,'Executed SQL')).catch(e => console.log(e));

      for (var d = 0; d < Object.keys(productoIngrediente).length; d++){
        db.executeSql('INSERT INTO ProductoIngrediente VALUES(?,?)',[
          productoIngrediente[d].idProducto,
          productoIngrediente[d].idIngredinte
        ]).then(res => { console.log(res); 
          /*  this.toast.show('producto_Ingrediente', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          ); */
        }).catch(e => { console.log(e); });
      }

      let DropTop = "DROP TABLE IF EXISTS Top";
      db.executeSql(DropTop, {})
        .then(res => console.log(res + 'Executed SQL')).catch(err => console.log(err));

      let SQLTop = "CREATE TABLE IF NOT EXISTS Top (FK_idProducto INT)"
      db.executeSql(SQLTop, {})
        .then(res => console.log(res,'Executed SQL')).catch(e => console.log(e));

      for (var e = 0; e < Object.keys(top).length; e++){
        db.executeSql('INSERT INTO Top VALUES(?)',[
          top[e].id
        ]).then(res => { console.log(res); 
          /*  this.toast.show('Top', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          ); */
        }).catch(e => { console.log(e); });
      }

      let sqlEnfermedad = "CREATE TABLE IF NOT EXISTS Enfermedad ";
      sqlEnfermedad += "(ID INT PRIMARY KEY, NOMBRE TEXT, img99x148 BLOB)";
      db.executeSql(sqlEnfermedad, {})
        .then(res => console.log(res + 'Executed SQL')).catch(err => console.log(err));

      for (var f = 0; f < Object.keys(enfermedad).length; f++){
        db.executeSql('INSERT INTO Enfermedad VALUES(?,?,?)',[
          enfermedad[f].id,
          enfermedad[f].nombre,
          enfermedad[f].img
        ]).then(res => { console.log(res); 
          /* this.toast.show('Enfermedad', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          ); */
        }).catch(e => { console.log(e); });
      }

      let DropProductoEnfermedado = "DROP TABLE IF EXISTS ProductoEnfermedad";
      db.executeSql(DropProductoEnfermedado, {})
        .then(res => console.log(res + 'Executed SQL')).catch(err => console.log(err));

      let SQLProductoEnfermedad = "CREATE TABLE IF NOT EXISTS ProductoEnfermedad ";
      SQLProductoEnfermedad += "(FK_idProducto INT, FK_idEnfermedad INT)"
      db.executeSql(SQLProductoEnfermedad, {})
        .then(res => console.log(res,'Executed SQL')).catch(e => console.log(e));

      for (var g = 0; g < Object.keys(productoEnfermedad).length; g++){
        db.executeSql('INSERT INTO ProductoEnfermedad VALUES(?,?)',[
          productoEnfermedad[g].idProducto,
          productoEnfermedad[g].idEnfermedad
        ]).then(res => { console.log(res); 
          /*  this.toast.show('Producto_Enfermedad', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          ); */
        }).catch(e => { console.log(e); });
      }

      let DropCasos = "DROP TABLE IF EXISTS CasosAyuda";
      db.executeSql(DropCasos, {})
        .then(res => console.log(res + 'Executed SQL')).catch(err => console.log(err));

      let Casos = "CREATE TABLE IF NOT EXISTS CasosAyuda ";
      Casos += "(idCategoria INT, CATEGORIA TEXT, idSubCategoria INT PRIMARY KEY, ";
      Casos += "SUBCATEGORIA TEXT)";
      db.executeSql(Casos,{})

      .then(res => console.log(res,'Executed SQL')).catch(e => console.log(e));
      let registroCero = "INSERT INTO CasosAyuda VALUES(0,'Selecciona una opción', ";
      registroCero += "0, 'Selecciona una opción')";
      db.executeSql(registroCero,{}).then(res => { console.log(res); })
      .catch(e => { console.log(e); });

      for (var h = 0; h < Object.keys(Casos).length; h++){
        db.executeSql('INSERT INTO CasosAyuda VALUES(?,?,?,?)',[
          Ayuda[h].idCategoria,
          Ayuda[h].Categoria,
          Ayuda[h].idSubCategoria,
          Ayuda[h].SubCategoria
        ]).then(res => { console.log(res); 
        /*this.toast.show('Casos Ayuda', '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );*/
        }).catch(e => { console.log(e); });
      }
    }).catch(e => { console.log(e); });
  }

  /* SATATUS
    0 - EDICIÓN 
    1 - ENVIADO - AVION
    2 - AUTORIZADO - PALOMITAS 
    3 - ENBARCADO - CAMION
    4 - ENTREGADO - BLEN
    5 - NO ENVIADO - WARNING
    
    WEB
    1 - ENVIADO
    2 - TRANSFERIDO
    4 - ENBARCADO*/

  //VALIDADO DE PRODUCTO Y AGREGADO A PEDIDO VIGENTE
  addPedido(idProducto, cantidad, precio){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT CODIGOKIT FROM Usuario', {})
      .then(res => {
        this.codigoKit = res.rows.item(0).CODIGOKIT;
      }).catch(e => console.log(e));

      let producto = "SELECT idProducto FROM Pedido_Detalle ";
      producto += "WHERE idPedido=0 AND idProducto =?"
      db.executeSql(producto, [idProducto])
      .then(res => {
        this.mismoProducto(res.rows.item(0).idProducto);
      }).catch(e => { console.log(e);
        this.insertPedidoDetalle(idProducto,cantidad,precio); 
      });
    }).catch(e => { console.log(e); });
  }
  mismoProducto(idProducto){
    if (idProducto != "" && idProducto != this.codigoKit){
      let alert = this.alertCtrl.create({
        subTitle: 'Se encuentra en tu pedido',
      });
      alert.present(); 
      setTimeout(() => {
        alert.dismiss();
      }, 1500);
    }
  }
  insertPedidoDetalle(idProducto,cantidad,precio){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let Pedido = "CREATE TABLE IF NOT EXISTS Pedido_Detalle ";
      Pedido += "(idPedido TEXT, idProducto INT, CANTIDAD INT, PRECIO REAL, STATUS INT)";
      db.executeSql(Pedido, {})
        .then(res => console.log(res,'Executed SQL')).catch(e => console.log(e));

        db.executeSql('INSERT INTO Pedido_Detalle VALUES(?,?,?,?,?)',
        ["0",idProducto,cantidad,precio,0]).then(res => { console.log(res);
          if (idProducto != this.codigoKit && this.duplicado != 1){
            this.duplicado = 0;
            let alert = this.alertCtrl.create({
              subTitle: 'Agregado a tu pedido vigente',
            });
            alert.present(); 
            setTimeout(() => {
              alert.dismiss();
            }, 1500);
          }
       }).catch(e => console.log(e) );
    }).catch(e => { console.log(e); });
  }
  //////////////////////////////////////////////////
  
  //GESTIONA LA TABLA DE FAVORITOS
  addFavorito(id){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let SQLvigenciaCatalogo = "CREATE TABLE IF NOT EXISTS Favorito ";
      SQLvigenciaCatalogo += "(FK_idProducto INT PRIMARY KEY)"
      db.executeSql(SQLvigenciaCatalogo, {})
        .then(res => console.log(res,'Executed SQL')).catch(e => console.log(e));

      db.executeSql('INSERT INTO Favorito VALUES(?)',[id])
      .then(res => { console.log(res); }).catch(e => { console.log(e); });
    }).catch(e => { console.log(e); });
  }
  removeFavorito(id){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM Favorito WHERE FK_idProducto=?',[id])
        .then(res => { console.log(res); }).catch(e => { console.log(e); });
    }).catch(e => { console.log(e); });
  }  

  //SELECT PARA EL CATALOGO EN VARIABLE GLOBAL
  Catalogo(){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let sqlLineas = "SELECT idLinea,LINEA FROM Producto ";
      sqlLineas += "WHERE idLinea NOT IN (89) GROUP BY idLinea, LINEA ";
      sqlLineas += "ORDER BY ORDEN ASC";
      db.executeSql(sqlLineas, {})
      .then(res => {
        this.Lineas = [];
        for(var i = 0; i < res.rows.length; i++) {
          this.Lineas.push({
            idLinea: res.rows.item(i).idLinea,
            LINEA: res.rows.item(i).LINEA
          })
        }
      }).catch(e => console.log(e));

      db.executeSql('SELECT ID,NOMBRE,idLinea,img99x148 FROM Producto', {})
        .then(res => {
          this.Productos = [];
          for(var i = 0; i < res.rows.length; i++) {
            this.Productos.push({
              ID: res.rows.item(i).ID,
              NOMBRE: res.rows.item(i).NOMBRE,
              idLinea: res.rows.item(i).idLinea,
              img99x148: res.rows.item(i).img99x148
            })
          }
        }) .catch(e => console.log(e));

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

  duplicarPedido(idProducto, cantidad, precio){
    this.duplicado = 1;
    this.addPedido(idProducto, cantidad, precio);
  }
}
