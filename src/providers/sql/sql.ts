import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, Img } from 'ionic-angular';
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
  duplicado = 0;
  promosCantidad: any = [];
  img64;

  constructor(public http: HttpClient,
    public ws: WsappsProvider,
    public alertCtrl: AlertController,
    private sqlite: SQLite,
    private toast: Toast,
    public loadingCtrl: LoadingController) {}

  IngresaData(login, vigenciaCatalogo, producto, flayer, 
    ingrediente, productoIngrediente, top, enfermedad, 
    productoEnfermedad, Ayuda, Promociones){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let DroPromo = "DROP TABLE IF EXISTS PromoLineas";
      db.executeSql(DroPromo, {})
        .then(res => console.log(res + 'Executed SQL')).catch(err => console.log(err));

      let sqlPrmo = "CREATE TABLE IF NOT EXISTS PromoLineas ";
      sqlPrmo += "(ID INT PRIMARY KEY, MINIMO_PIEZAS INT, EXCEPCION TEXT, ";
      sqlPrmo += "LINEAS TEXT, MINIMO_COMPRA REAL, MULTIPLE INT, ";
      sqlPrmo += "CODIGOS_UNICOS TEXT, CANTIDAD INT)";
      db.executeSql(sqlPrmo, {})
        .then(res => console.log(res + 'Executed SQL')).catch(err => console.log(err));

      for (var m = 0; m < Object.keys(Promociones).length; m++){
      db.executeSql('INSERT INTO PromoLineas VALUES(?,?,?,?,?,?,?,?)',[
        Promociones[m].Codigo,
        Promociones[m].MinimoPiezas,
        Promociones[m].ExcepcionCodigo,
        Promociones[m].LineasAplicada,
        Promociones[m].MinimoCompra,
        Promociones[m].Multiple,
        Promociones[m].CodigosUnicos,
        1
      ]).then(res => { console.log(res); 
        /* this.toast.show('hola', '5000', 'center').subscribe(
          toast => {
            console.log(toast);
          }
        ); */
      }).catch(e => { console.log(e); });
    }

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
        login[0].vigenciaEstacion,
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
      sqlCatalogo += "CONTRAINDICACIONES TEXT, img99x148 BLOB, CONVERSION INT, VISIBLE INT, ";
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
          producto[a].img99x148,
          0,
          producto[a].visible,
          producto[a].orden,
          producto[a].nuevo
        ]).then(res => { console.log(res); 
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
    3 - ENBARCADO*/

  //VALIDADO DE PRODUCTO Y AGREGADO A PEDIDO VIGENTE
  addPedido(idProducto, cantidad, precio,tipo,otorga){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT CODIGOKIT FROM Usuario', {})
      .then(res => {
        this.codigoKit = res.rows.item(0).CODIGOKIT;
      }).catch(e => console.log(e));

      let producto = "SELECT idProducto FROM Pedido_Detalle ";
      producto += "WHERE STATUS=0 AND idProducto =?"
      db.executeSql(producto, [idProducto])
      .then(res => {
        this.mismoProducto(res.rows.item(0).idProducto);
      }).catch(e => { console.log(e);
        this.insertPedidoDetalle(idProducto,cantidad,precio,tipo,otorga); 
      });
    }).catch(e => { console.log(e); });
  }
  mismoProducto(idProducto){
    if (idProducto != this.codigoKit){
      let alert = this.alertCtrl.create({
        subTitle: 'El producto se encuentra en tu pedido actual',
      });
      alert.present(); 
      setTimeout(() => {
        alert.dismiss();
      }, 1500);
    }
  }
  insertPedidoDetalle(idProducto,cantidad,precio,tipo,otorga){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let Pedido = "CREATE TABLE IF NOT EXISTS Pedido_Detalle ";
      Pedido += "(idPedido TEXT, idProducto INT, CANTIDAD INT, ";
      Pedido += "PRECIO REAL, STATUS INT, TIPO INT, OTORGA INT)";
      db.executeSql(Pedido, {})
        .then(res => console.log(res,'Executed SQL')).catch(e => console.log(e));

        db.executeSql('INSERT INTO Pedido_Detalle VALUES(?,?,?,?,?,?,?)',
        ["0",idProducto,cantidad,precio,0,tipo,otorga]).then(res => { console.log(res);
          if ((idProducto != this.codigoKit || this.duplicado == 0) && otorga == 0){
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
  Eliminarproducto(id){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('DELETE FROM Pedido_Detalle WHERE idPedido = 0 AND idProducto=?',[id])
      .then(res => { console.log(res); }).catch(e => { console.log(e); });
    }).catch(e => { console.log(e); });
  }
  DecrementarCantidad(idProducto, cantidad){
    if (cantidad > 1){
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
    }
  }
  IncrementarCantidad(idProducto, cantidad){
    var newCant = parseInt(cantidad)+1;
      if (newCant == 10){
        let alert = this.alertCtrl.create({
          title: '',
          subTitle: 'Favor de verificar la cantidad',
          buttons: ['Aceptar']
        });
        alert.present();
      }
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
  }
  duplicarPedido(idProducto, cantidad, precio){
    this.duplicado = 1;
    this.addPedido(idProducto, cantidad, precio,0,0);
  }
  CambiarStatusPedido(alias){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let sqlPedido = "UPDATE Pedido_Detalle SET idPedido=?, STATUS=1 ";
      sqlPedido += "WHERE STATUS = 0";
      db.executeSql(sqlPedido,[alias])
        .then(res => { console.log(res);}).catch(e => { console.log(e); });
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
      sqlLineas += "WHERE VISIBLE != 0 ";
      sqlLineas += "GROUP BY idLinea, LINEA ";
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

      let sqlCatalogo = "SELECT ID,NOMBRE,idLinea,img99x148 FROM Producto ";
      sqlCatalogo += "WHERE VISIBLE != 0";
      db.executeSql(sqlCatalogo, {})
        .then(res => {
          this.Productos = [];
          for(var i = 0; i < res.rows.length; i++) {
            this.Productos.push({
              ID: res.rows.item(i).ID,
              NOMBRE: res.rows.item(i).NOMBRE,
              idLinea: res.rows.item(i).idLinea,
              img99x148: res.rows.item(i).img99x148
            });
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
  
  //PROMOCIONES DE LINEA
  borrarPromo(){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let borrarPromo = "DELETE FROM Pedido_Detalle ";
      borrarPromo += "WHERE idPedido = 0 AND STATUS = 0 AND TIPO = 1 ";
      db.executeSql(borrarPromo,[])
      .then(res => { console.log(res); }).catch(e => { console.log(e); });
    }).catch(e => { console.log(e); });
  }
  buscarPromo(){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let promo ="SELECT * FROM ( "
      promo += "SELECT CODIGO_PROMO, CAST(SUM(CANTIDAD)/MINIMO_PIEZAS AS INT) OTORGA, ";
      promo += "PRECIO FROM ( ";
      promo += "SELECT P.CANTIDAD, PR.ID CODIGO_PROMO, PR.MINIMO_PIEZAS, ";
      promo += "PR.PRECIO ";
      promo += "FROM Pedido_Detalle P ";
      promo += "INNER JOIN Producto C ON C.ID = P.idProducto ";
      promo += "LEFT JOIN ( ";
      promo += "SELECT * FROM PromoLineas ";
      promo += "INNER JOIN Producto ON Producto.ID = PromoLineas.ID ";
      promo +=  ") PR ON (instr(PR.LINEAS, C.idLinea)> 0 AND ";
      promo += "instr(PR.EXCEPCION, P.idProducto) = 0) OR ";
      promo += "instr(CODIGOS_UNICOS, P.idProducto) > 0 ";
      promo += "WHERE P.STATUS = 0 ) ";
      promo += "WHERE CODIGO_PROMO IS NOT NULL ";
      promo += "AND MINIMO_PIEZAS > 0 ";
      promo += "GROUP BY CODIGO_PROMO, MINIMO_PIEZAS ";
      promo += "UNION ";
      promo += "SELECT CODIGO_PROMO, CAST(MONTO/MINIMO_COMPRA AS INT) OTORGA, ";
      promo += "PRECIO FROM ( ";
      promo += "SELECT PR.ID CODIGO_PROMO, ";
      promo += "SUM(P.CANTIDAD *P.PRECIO) MONTO, ";
      promo += "PR.MINIMO_COMPRA, PR.PRECIO ";
      promo += "FROM Pedido_Detalle P ";
      promo += "INNER JOIN Producto C ON C.ID = P.idProducto ";
      promo += "LEFT JOIN ( SELECT * FROM PromoLineas ";
      promo += "INNER JOIN Producto ON Producto.ID = PromoLineas.ID ";
      promo += ") PR ON instr(PR.LINEAS, C.idLinea)> 0 AND ";
      promo += "instr(PR.EXCEPCION, P.idProducto) = 0 ";
      promo += "WHERE P.STATUS = 0 AND PR.MINIMO_PIEZAS = 0 ";
      promo += "GROUP BY PR.ID, PR.MINIMO_COMPRA ";
      promo += ")WHERE MONTO > MINIMO_COMPRA ) ";
      promo += "WHERE OTORGA > 0";
      db.executeSql(promo, {})
      .then(res => {
        for (var i = 0; i < Object.keys(res).length; i++ ){
          this.consultaCantidad(
            res.rows.item(i).CODIGO_PROMO,
            res.rows.item(i).PRECIO,
            res.rows.item(i).OTORGA);
        }
      }).catch(e => console.log(e));
    }).catch(e => { console.log(e); });
  }
  consultaCantidad(idProducto, precio, otorgada){
    let cantidad = 0;
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let sqlpromos = "SELECT CANTIDAD FROM PromoLineas ";
      sqlpromos += "WHERE ID =?";
      db.executeSql(sqlpromos, [idProducto])
      .then(res => {
        if  (otorgada == 1){
          cantidad = 1;
        }
        else if (otorgada ==  res.rows.item(0).CANTIDAD){
          cantidad = res.rows.item(0).CANTIDAD;
        }
        else if (otorgada < res.rows.item(0).CANTIDAD){
          cantidad =  otorgada;
        }
        else if (otorgada > res.rows.item(0).CANTIDAD){
          cantidad = res.rows.item(0).CANTIDAD;
        }
        this.insertarPromo(idProducto,cantidad,precio,otorgada);
      }).catch(e => console.log(e));
    }).catch(e => { console.log(e); });
  }
  insertarPromo(idProducto, cantidad, precio, otorgada){
    this.duplicado = 1;
    this.addPedido(idProducto, cantidad, precio,1,otorgada);
  }
  IncrementaPromo(idProducto, cantidad, disponible){
    var newCant = parseInt(cantidad)+1;
      if (newCant <= disponible){
        this.sqlite.create({
          name: 'dbBlenApp.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          let sqlPedido = "UPDATE Pedido_Detalle SET CANTIDAD=? ";
          sqlPedido += "WHERE idPedido = 0 AND idProducto=?";
          db.executeSql(sqlPedido,[newCant,idProducto])
            .then(res => { console.log(res); }).catch(e => { console.log(e); });
            let sqlPromo = "UPDATE PromoLineas SET CANTIDAD=? ";
          sqlPromo += "WHERE ID=?";
          db.executeSql(sqlPromo,[newCant,idProducto])
            .then(res => { console.log(res); }).catch(e => { console.log(e); });
        }).catch(e => { console.log(e); });
      }
  }
  DecrementarPromo(idProducto, cantidad){
    if (cantidad > 1){
      var newCant = parseInt(cantidad)-1;
      this.sqlite.create({
        name: 'dbBlenApp.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        let sqlPedido = "UPDATE Pedido_Detalle SET CANTIDAD=? ";
        sqlPedido += "WHERE idPedido = 0 AND idProducto=?";
        db.executeSql(sqlPedido,[newCant,idProducto])
          .then(res => { console.log(res); }).catch(e => { console.log(e); });
        let sqlPromo = "UPDATE PromoLineas SET CANTIDAD=? ";
        sqlPromo += "WHERE idPedido = 0 AND idProducto=?";
        db.executeSql(sqlPromo,[newCant,idProducto])
          .then(res => { console.log(res); }).catch(e => { console.log(e); });
      }).catch(e => { console.log(e); });
    }
  }
  ModificarPromo(){
        this.sqlite.create({
          name: 'dbBlenApp.db',
          location: 'default'
        }).then((db: SQLiteObject) => {
          let sql = "UPDATE PrmoLineas SET CANTIDAD = 1 ";
          sql += "WHERE ID IN( ";
          sql += "SELECT PL.ID ";
          sql += "FROM PromoLineas PL ";
          sql += "LEFT JOIN Pedido_Detalle PD ON PD.idProducto = PL.ID ";
          sql += "WHERE PD.IdProducto is null)";
          db.executeSql(sql,{})
            .then(res => { console.log(res); }).catch(e => { console.log(e); });
        }).catch(e => { console.log(e); });
  }
}
