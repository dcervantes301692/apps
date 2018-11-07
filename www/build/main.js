webpackJsonp([7],{

/***/ 120:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wsapps_wsapps__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_pedido_pedido__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_sql_sql__ = __webpack_require__(36);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var HomePage = (function () {
    function HomePage(navCtrl, navParams, http, db, menu, alertCtrl, sqlite, toast, camera, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.db = db;
        this.menu = menu;
        this.alertCtrl = alertCtrl;
        this.sqlite = sqlite;
        this.toast = toast;
        this.camera = camera;
        this.loadingCtrl = loadingCtrl;
        this.Usuario = [];
        this.Foto = [];
        this.PromocionesFlayer = [];
        this.estacion = 0;
        this.lineChartColors = [{
                borderColor: '#CCCCCC',
                pointBackgroundColor: '#009999',
                pointBorderColor: '#009999',
            },];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.menu.enable(true);
        this.lineChartData = [{ data: [0, 0, 0, 0], label: '$ ' + 0 }];
        this.lineChartLabels = ["", "", "", ""];
        this.SelectData();
    }
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var loading = this.loadingCtrl.create({});
        loading.present();
        setTimeout(function () {
            loading.dismiss();
            _this.lineChartData = [{ data: [
                        _this.venta4.toFixed(2),
                        _this.venta3.toFixed(2),
                        _this.venta2.toFixed(2),
                        _this.venta1.toFixed(2)
                    ],
                    label: '$ ' + _this.venta_total.toFixed(2) }];
        }, 2000);
        setTimeout(function () {
            _this.db.Catalogo();
        }, 3000);
    };
    //EVENTO QUE MANDA LLAMAR LA VENTANA DE PEDIDO
    HomePage.prototype.Pedido = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_pedido_pedido__["a" /* PedidoPage */]);
    };
    //EVENTO DE FOTO PARA PERFIL
    HomePage.prototype.capturar = function () {
        var _this = this;
        var options = {
            destinationType: this.camera.DestinationType.DATA_URL,
            targetWidth: 70,
            targetHeight: 70,
            quality: 100
        };
        this.camera.getPicture(options)
            .then(function (imageData) {
            _this.sqlite.create({
                name: 'dbBlenApp.db',
                location: 'default'
            }).then(function (db) {
                db.executeSql('UPDATE Usuario SET FOTO=? WHERE ID=?', [imageData, _this.Usuario[0].ID])
                    .then(function (res) { console.log(res); }).catch(function (e) { console.log(e); });
                db.executeSql('SELECT FOTO FROM Usuario WHERE FOTO IS NOT NULL', {})
                    .then(function (res) {
                    _this.Foto = [];
                    _this.Foto.push({
                        FOTO: res.rows.item(0).FOTO
                    });
                    _this.base64Image = 'data:image/jpeg;base64,' + _this.Foto[0].FOTO;
                }).catch(function (e) { console.log(e); });
            }).catch(function (e) { console.log(e); });
        })
            .catch(function (error) {
            console.error(error);
        });
    };
    HomePage.prototype.SelectData = function () {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT FOTO FROM Usuario WHERE FOTO IS NOT NULL', {})
                .then(function (res) {
                _this.Foto = [];
                _this.Foto.push({
                    FOTO: res.rows.item(0).FOTO
                });
                _this.base64Image = 'data:image/jpeg;base64,' + _this.Foto[0].FOTO;
            }).catch(function (e) { console.log(e); });
            var sqlUsuario = 'SELECT ID,NOMBRE,DMI,ULTIMA_VENTA,PENULTIMA_VENTA,';
            sqlUsuario += 'ANTE_PENULTIMA_VENTA,ANTE_ANTE_PENULTIMA_VENTA,';
            sqlUsuario += '(ULTIMA_VENTA+PENULTIMA_VENTA+ANTE_PENULTIMA_VENTA+ANTE_ANTE_PENULTIMA_VENTA)';
            sqlUsuario += 'TOTAL_VENTA,E1,E2,E3,E4,VIGENCIAPERFIL,PUNTOS,FOTO FROM Usuario';
            db.executeSql(sqlUsuario, {})
                .then(function (res) {
                _this.lineChartLabels = [res.rows.item(0).E4,
                    res.rows.item(0).E3, res.rows.item(0).E2, res.rows.item(0).E1];
                _this.Usuario = [];
                _this.Usuario.push({
                    ID: "Código: " + res.rows.item(0).ID,
                    NOMBRE: res.rows.item(0).NOMBRE,
                    DMI: res.rows.item(0).DMI,
                    VIGENCIAPERFIL: res.rows.item(0).VIGENCIAPERFIL,
                    PUNTOS: new Intl.NumberFormat().format(res.rows.item(0).PUNTOS)
                });
                _this.venta1 = res.rows.item(0).ULTIMA_VENTA;
                _this.venta2 = res.rows.item(0).PENULTIMA_VENTA;
                _this.venta3 = res.rows.item(0).ANTE_PENULTIMA_VENTA;
                _this.venta4 = res.rows.item(0).ANTE_ANTE_PENULTIMA_VENTA;
                _this.venta_total = res.rows.item(0).TOTAL_VENTA;
            }).catch(function (e) { return console.log(e); });
            var sqlFlayer = 'SELECT ID,IMGFLAYER FROM Flayer ORDER BY ID';
            db.executeSql(sqlFlayer, {})
                .then(function (res) {
                _this.PromocionesFlayer = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.PromocionesFlayer.push({
                        ID: res.rows.item(i).ID,
                        IMGFLAYER: res.rows.item(i).IMGFLAYER
                    });
                }
            }).catch(function (e) { return console.log(e); });
            var sqlFechas = "SELECT (julianday(VIGENCIAPERFIL) - julianday('now')) pedido, ";
            sqlFechas += "(julianday(Date(julianday(VIGENCIAPERFIL)+15)) - julianday('now')) prox ";
            sqlFechas += "FROM Usuario";
            db.executeSql(sqlFechas, {})
                .then(function (res) {
                if (res.rows.item(0).pedido == 0) {
                    _this.proximoPedido = "Debes enviar tu pedido antes de la 01:00 pm, ";
                    _this.proximoPedido += "para que sea procesado.";
                }
                else if (res.rows.item(0).pedido > 1) {
                    _this.proximoPedido = "Faltan " + parseInt(res.rows.item(0).pedido);
                    _this.proximoPedido += " días para enviar tu pedido.";
                }
                else if (res.rows.item(0).pedido == 1) {
                    _this.proximoPedido = "Faltan " + parseInt(res.rows.item(0).pedido);
                    _this.proximoPedido += " día para enviar tu pedido.";
                }
                else if (res.rows.item(0).pedido < 0) {
                    _this.proximoPedido = " Faltan " + parseInt(res.rows.item(0).prox);
                    _this.proximoPedido += " para tu siguiente pedido.";
                }
            }).catch(function (e) { console.log(e); });
        }).catch(function (e) { console.log(e); });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-home',template:/*ion-inline-start:"/Users/Desarrollo/Desktop/apps/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <table class="encabezado">\n      <tr>\n        <td width="20px" align="left">\n          <button ion-button menuToggle clear>\n            <ion-icon name="menu" class="icono"></ion-icon>\n          </button>\n        </td>\n        <td align="center">\n          <label>Perfil</label>\n        </td>\n        <td width="20px" align="right">\n          <button ion-button clear (click)="Pedido()">\n            <ion-icon name="md-cart" class="icono"></ion-icon>\n          </button>\n        </td>\n      </tr>\n    </table>\n  </ion-navbar> \n</ion-header>\n\n<ion-content>\n  <div class="superiro">\n    <img src="assets/imgs/perfil2.png">\n    <div disabled>\n      <br>\n      <table *ngFor="let u of Usuario">\n        <tr>\n          <td width = "20%">\n              <img src="assets/imgs/photo.png" id="imgPerfil" (click)="capturar()">\n          </td>\n          <td class="nombre">\n              {{u.NOMBRE}}\n          </td>\n        </tr>\n        <tr>\n          <td colspan="2" class="codigo">\n            {{u.ID}}\n          </td>\n        </tr>\n        <tr>\n          <td colspan="2" class="puntos">\n            {{u.PUNTOS}}\n            <small>PTS</small>\n            <ion-icon name="md-star"></ion-icon>\n          </td>\n        </tr>\n      </table>\n    </div>\n  </div>\n  <ion-content class="medio">\n    <div padding class="grafica">\n      <p>Próximo día de pedido:</p>\n      <label>{{proximoPedido}}</label>\n    </div>\n    <ion-slides>\n      <div *ngFor="let f of PromocionesFlayer">\n      <ion-slide>\n        <img src = "{{f.IMGFLAYER}}" class="IMGFlayer" imageViewer>\n      </ion-slide>\n    </div>\n    </ion-slides>\n    <div padding class="grafica">\n      <p>Desempeño por estación</p>\n      <canvas baseChart width="250px"\n        [datasets]="lineChartData"\n        [labels]="lineChartLabels"\n        [colors]="lineChartColors"\n        [legend]="lineChartLegend"\n        [chartType]="lineChartType">\n      </canvas>\n    </div>\n  </ion-content>\n</ion-content>'/*ion-inline-end:"/Users/Desarrollo/Desktop/apps/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_wsapps_wsapps__["a" /* WsappsProvider */],
            __WEBPACK_IMPORTED_MODULE_7__providers_sql_sql__["a" /* SqlProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InformacionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__relacionados_relacionados__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pedido_pedido__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__detalle_producto_detalle_producto__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var InformacionPage = (function () {
    function InformacionPage(navCtrl, navParams, sqlite, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.loadingCtrl = loadingCtrl;
        this.Enfermedades = [];
        this.idProducto = navParams.get('idProducto');
        this.MODOUSO = navParams.get('MODOUSO');
        this.CONTRAINDICACIONES = navParams.get('CONTRAINDICACIONES');
    }
    InformacionPage.prototype.ionViewDidLoad = function () {
        this.SelectEnfermedad();
    };
    InformacionPage.prototype.ionViewDidEnter = function () {
        var loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: '<img src="assets/imgs/loading.gif" disabled>'
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 1000);
    };
    InformacionPage.prototype.SelectEnfermedad = function () {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var enferme = "SELECT E.ID, E.NOMBRE, E.img99x148 FROM Enfermedad E ";
            enferme += "INNER JOIN ProductoEnfermedad P ON P.FK_idEnfermedad = E.ID ";
            enferme += "WHERE FK_idProducto=?";
            db.executeSql(enferme, [_this.idProducto])
                .then(function (res) {
                _this.Enfermedades = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.Enfermedades.push({
                        ID: res.rows.item(i).ID,
                        NOMBRE: res.rows.item(i).NOMBRE,
                        img99x148: res.rows.item(i).img99x148
                    });
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) { console.log(e); });
    };
    InformacionPage.prototype.relacion = function (id, nombre) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__relacionados_relacionados__["a" /* RelacionadosPage */], { tipo: "Enfermedad", id: id, nombre: nombre });
    };
    InformacionPage.prototype.Pedido = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pedido_pedido__["a" /* PedidoPage */]);
    };
    InformacionPage.prototype.detalle = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { idProducto: this.idProducto });
    };
    InformacionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-informacion',template:/*ion-inline-start:"/Users/Desarrollo/Desktop/apps/src/pages/informacion/informacion.html"*/'<ion-header>\n    <ion-navbar color="blue">\n        <table class="encabezado">\n            <tr>\n                <td width="20px" align="left">\n                    <button ion-button clear (click)="detalle()">\n                        <ion-icon name="md-arrow-back" class="icono"></ion-icon>\n                    </button>\n                </td>\n                <td align="center">\n                    <label>Información</label>\n                </td>\n                <td width="20px" align="right">\n                    <button ion-button clear (click)="Pedido()">\n                        <ion-icon name="md-cart" class="icono"></ion-icon>\n                    </button>\n                </td>\n            </tr>\n        </table>\n    </ion-navbar> \n</ion-header>\n\n<ion-content padding>\n    <div class="informacion">\n        <p>MODO DE EMPLEO</p>\n        {{MODOUSO}}\n        <p *ngIf="Enfermedades != \'\'">PADECIMIENTOS</p>\n        <ion-slides slidesPerView = "3">\n            <div *ngFor="let e of Enfermedades">\n                <ion-slide>\n                    <img src = "{{e.img99x148}}" (click)= "relacion(e.ID,e.NOMBRE)" class="enfermedad">\n                    <p id="productoNombre">{{e.NOMBRE}}</p>\n                </ion-slide>\n            </div>\n        </ion-slides>\n        <p>CONTRAINDICACIÓN</p>\n        {{CONTRAINDICACIONES}}\n    </div>\n</ion-content>\n\n<ion-footer padding>\n    <button ion-button full clear color="blen" class="btnInformativo" \n    (click)="detalle()">VOLVER</button>\n</ion-footer>\n'/*ion-inline-end:"/Users/Desarrollo/Desktop/apps/src/pages/informacion/informacion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], InformacionPage);
    return InformacionPage;
}());

//# sourceMappingURL=informacion.js.map

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MostrarPedidoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sql_sql__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pedido_pedido__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MostrarPedidoPage = (function () {
    function MostrarPedidoPage(navCtrl, db, navParams, sqlite, alertCtrl) {
        this.navCtrl = navCtrl;
        this.db = db;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.pedidoActual = [];
        this.duplicado = [];
        this.Comisionable = "0.00";
        this.NoComisionable = "0.00";
        this.TotalVenta = "0.00";
        this.Ganacia = "0.00";
        this.Pago = "0.00";
        this.alias = navParams.get('alias');
    }
    MostrarPedidoPage.prototype.ionViewDidLoad = function () {
        this.SelectPedidoBuscado();
    };
    MostrarPedidoPage.prototype.SelectPedidoBuscado = function () {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var pedido = 'SELECT P.idProducto, ';
            pedido += 'CASE WHEN length(C.NOMBRE) > 20 THEN substr(C.NOMBRE, 1,20) || "..." ELSE C.NOMBRE END NOMBRE, ';
            pedido += 'C.idLinea, C.LINEA, C.COMISIONABLE, C.img99x148, P.CANTIDAD, ';
            pedido += '(P.PRECIO*P.CANTIDAD) PRECIO ';
            pedido += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
            pedido += 'WHERE P.idPedido =?';
            db.executeSql(pedido, [_this.alias])
                .then(function (res) {
                _this.pedidoActual = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.pedidoActual.push({
                        idProducto: res.rows.item(i).idProducto,
                        NOMBRE: res.rows.item(i).NOMBRE,
                        idLinea: res.rows.item(i).idLinea,
                        LINEA: res.rows.item(i).LINEA,
                        COMISIONABLE: res.rows.item(i).COMISIONABLE,
                        img99x148: res.rows.item(i).img99x148,
                        CANTIDAD: res.rows.item(i).CANTIDAD,
                        PRECIO: res.rows.item(i).PRECIO.toFixed(2)
                    });
                }
            }).catch(function (e) { return console.log(e); });
            var Totales = 'SELECT SUM(P.PRECIO*P.CANTIDAD) TOTAL, ';
            Totales += 'SUM(CASE WHEN C.COMISIONABLE = 1 THEN (P.PRECIO*P.CANTIDAD) ELSE 0 END) COMI, ';
            Totales += 'SUM(CASE WHEN C.COMISIONABLE = 0 THEN (P.PRECIO*P.CANTIDAD) ELSE 0 END) NOCOMI ';
            Totales += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
            Totales += 'WHERE P.idPedido=?';
            db.executeSql(Totales, [_this.alias])
                .then(function (res) {
                _this.TotalVenta = res.rows.item(0).TOTAL.toFixed(2);
                _this.Comisionable = res.rows.item(0).COMI.toFixed(2);
                _this.NoComisionable = res.rows.item(0).NOCOMI.toFixed(2);
                _this.Pago = (parseFloat(res.rows.item(0).TOTAL) * 0.70).toFixed(2);
                _this.Ganacia = (parseFloat(res.rows.item(0).TOTAL) * 0.30).toFixed(2);
            }).catch(function (e) {
                console.log(e);
                _this.TotalVenta = (0).toFixed(2);
                _this.Comisionable = (0).toFixed(2);
                _this.NoComisionable = (0).toFixed(2);
                _this.Pago = (0).toFixed(2);
                _this.Ganacia = (0).toFixed(2);
                _this.pedidoActual = [];
            });
        }).catch(function (e) { console.log(e); });
    };
    MostrarPedidoPage.prototype.add = function (id, cantidad, precio) {
        var neto = precio / cantidad;
        this.db.addPedido(id, 1, neto);
    };
    MostrarPedidoPage.prototype.duplicar = function () {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var pedido = 'SELECT P.idProducto, P.CANTIDAD, P.PRECIO ';
            pedido += 'FROM Pedido_Detalle P ';
            pedido += 'WHERE P.idPedido =?';
            db.executeSql(pedido, [_this.alias])
                .then(function (res) {
                _this.duplicado = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.db.duplicarPedido(res.rows.item(i).idProducto, res.rows.item(i).CANTIDAD, res.rows.item(i).PRECIO);
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) { console.log(e); });
        var alert = this.alertCtrl.create({
            subTitle: 'Tu pedido fue duplicado con éxito',
        });
        alert.present();
        setTimeout(function () {
            alert.dismiss();
            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pedido_pedido__["a" /* PedidoPage */]);
        }, 1500);
    };
    MostrarPedidoPage.prototype.Pedido = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pedido_pedido__["a" /* PedidoPage */]);
    };
    MostrarPedidoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-mostrar-pedido',template:/*ion-inline-start:"/Users/Desarrollo/Desktop/apps/src/pages/mostrar-pedido/mostrar-pedido.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <table class="encabezado">\n      <tr>\n        <td width="20px" align="left">\n          <button ion-button menuToggle clear>\n            <ion-icon name="menu" class="icono"></ion-icon>\n          </button>\n        </td>\n        <td align="center">\n          <label>{{alias}}</label>\n        </td>\n        <td width="20px" align="right">\n          <button ion-button clear (click)="Pedido()">\n            <ion-icon name="md-cart" class="icono"></ion-icon>\n          </button>\n        </td>\n      </tr>\n    </table>\n  </ion-navbar> \n</ion-header>\n\n<ion-content>\n  <div>\n      <ion-list *ngFor="let p of pedidoActual">\n        <ion-item-sliding *ngIf="p.idLinea != 89">\n          <ion-item>\n            <table>\n              <tr>\n                <td rowspan="3" class="imgPedido">\n                  <img src="{{p.img99x148}}">\n                </td>\n                <td colspan="7" class="nombre">{{p.NOMBRE}}</td>\n                <td rowspan="3" class="moneda">$</td>\n                <td rowspan="3" class="precio">{{p.PRECIO}}</td>\n              </tr>\n              <tr>\n                <td colspan="5" class="linea">{{p.LINEA}}</td>\n              </tr>\n              <tr>\n                <td class="codPedido">{{p.idProducto}}</td>\n                <td class="cantidadPedido">Cantidad</td>\n                <td class="botonespedido"> </td>\n                <td class="numCantidadPedido">{{p.CANTIDAD}}</td>\n                <td class="botonespedido"></td>\n              </tr>\n            </table>\n          </ion-item>\n          <ion-item-options side="rigth">\n            <button ion-button color="green" (click) = "add(p.idProducto,p.CANTIDAD,p.PRECIO)">\n              <ion-icon name="md-add-circle"></ion-icon>\n            </button>\n          </ion-item-options>\n        </ion-item-sliding>\n      </ion-list>\n  </div>\n  <div>\n    <ion-list *ngFor="let p of pedidoActual">\n      <ion-item-sliding *ngIf="p.idLinea == 89">\n        <ion-item id="kit">\n          <table>\n            <tr>\n              <td rowspan="3" class="imgPedido">\n                <img src="{{p.img99x148}}">\n              </td>\n              <td colspan="7" class="nombre">{{p.NOMBRE}}</td>\n              <td rowspan="3" class="moneda">$</td>\n              <td rowspan="3" class="precio">{{p.PRECIO}}</td>\n            </tr>\n            <tr>\n              <td colspan="5" class="linea">{{p.LINEA}}</td>\n            </tr>\n            <tr>\n              <td class="codPedido">{{p.idProducto}}</td>\n              <td class="cantidadPedido">Cantidad</td>\n              <td class="botonespedido"></td>\n              <td class="numCantidadPedido">{{p.CANTIDAD}}</td>\n              <td class="botonespedido"></td>\n            </tr>\n          </table>\n        </ion-item>\n      </ion-item-sliding>\n    </ion-list>\n  </div>\n</ion-content>\n\n<ion-footer>\n  <div padding>\n    <table class="operaciones">\n      <tr>\n        <td class="TituloTicket">Total:</td>\n        <td class="SimboloTicket" width="5%">$</td>\n        <td class="TituloCosto" width="25%">{{TotalVenta}}</td>\n      </tr>\n      <tr>\n        <td class="SubtiruloTicket">Comisionable:</td>\n        <td class="SubtiruloTicketCosto" width="5%">$</td>\n        <td class="SubtiruloTicketCosto"  width="25%">{{Comisionable}}</td>\n      </tr>\n      <tr>\n        <td class="SubtiruloTicket">No Comisionable:</td>\n        <td class="SubtiruloTicketCosto" width="5%">$</td>\n        <td class="SubtiruloTicketCosto"  width="25%">{{NoComisionable}}</td>\n      </tr>\n      <tr>\n        <td class="TituloTicket">Pago Ticket:</td>\n        <td class="SimboloTicket" width="5%">$</td>\n        <td class="TituloCosto"  width="25%">{{Pago}}</td>\n      </tr>\n      <tr>\n        <td class="SubtiruloTicket">Tu Ganancia:</td>\n        <td class="SubtiruloTicketCosto" width="5%">$</td>\n        <td class="SubtiruloTicketCosto"  width="25%">{{Ganacia}}</td>\n      </tr>\n    </table>\n    <button ion-button full clear (click)="duplicar()" id="habil">Duplicar Pedido</button>\n  </div>\n</ion-footer>'/*ion-inline-end:"/Users/Desarrollo/Desktop/apps/src/pages/mostrar-pedido/mostrar-pedido.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_sql_sql__["a" /* SqlProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], MostrarPedidoPage);
    return MostrarPedidoPage;
}());

//# sourceMappingURL=mostrar-pedido.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoritosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detalle_producto_detalle_producto__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pedido_pedido__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var FavoritosPage = (function () {
    function FavoritosPage(navCtrl, navParams, sqlite) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.favoritos = [];
    }
    FavoritosPage.prototype.ionViewDidLoad = function () {
        this.MisFavoritosSQL();
    };
    FavoritosPage.prototype.MisFavoritosSQL = function () {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var fav = "SELECT C.ID, C.NOMBRE, C.img99x148 FROM Producto C ";
            fav += "INNER JOIN Favorito F ON F.FK_idProducto = C.ID";
            db.executeSql(fav, {})
                .then(function (res) {
                _this.favoritos = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.favoritos.push({
                        ID: res.rows.item(i).ID,
                        NOMBRE: res.rows.item(i).NOMBRE,
                        img99x148: res.rows.item(i).img99x148,
                    });
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) { console.log(e); });
    };
    FavoritosPage.prototype.detalle = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { idProducto: id, btn: 1 });
    };
    FavoritosPage.prototype.Pedido = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__pedido_pedido__["a" /* PedidoPage */]);
    };
    FavoritosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-favoritos',template:/*ion-inline-start:"/Users/Desarrollo/Desktop/apps/src/pages/favoritos/favoritos.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <table class="encabezado">\n      <tr>\n        <td width="20px" align="left">\n          <button ion-button menuToggle clear>\n            <ion-icon name="menu" class="icono"></ion-icon>\n          </button>\n        </td>\n        <td align="center">\n          <label>Favoritos</label>\n        </td>\n        <td width="20px" align="right">\n          <button ion-button clear (click)="Pedido()">\n            <ion-icon name="md-cart" class="icono"></ion-icon>\n          </button>\n        </td>\n      </tr>\n    </table>\n  </ion-navbar> \n</ion-header>\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row>\n      <ion-col col-6 col-md-4 col-xl-3 *ngFor="let f of favoritos">\n        <img src="{{f.img99x148}}" (click)= "detalle(f.ID)">\n        <p id="productoNombre">{{f.NOMBRE}}</p>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/Desarrollo/Desktop/apps/src/pages/favoritos/favoritos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]])
    ], FavoritosPage);
    return FavoritosPage;
}());

//# sourceMappingURL=favoritos.js.map

/***/ }),

/***/ 136:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 136;

/***/ }),

/***/ 177:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/detalle-producto/detalle-producto.module": [
		489,
		6
	],
	"../pages/favoritos/favoritos.module": [
		490,
		5
	],
	"../pages/historial-pedido/historial-pedido.module": [
		491,
		4
	],
	"../pages/informacion/informacion.module": [
		492,
		3
	],
	"../pages/mostrar-pedido/mostrar-pedido.module": [
		493,
		2
	],
	"../pages/pedido/pedido.module": [
		494,
		1
	],
	"../pages/relacionados/relacionados.module": [
		495,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 177;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 27:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PedidoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_sql_sql__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__condiciones_condiciones__ = __webpack_require__(420);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var PedidoPage = (function () {
    function PedidoPage(navCtrl, sqlite, alertCtrl, db, modalCtrl) {
        this.navCtrl = navCtrl;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.db = db;
        this.modalCtrl = modalCtrl;
        this.pedidoActual = [];
        this.Comisionable = "0.00";
        this.NoComisionable = "0.00";
        this.TotalVenta = "0.00";
        this.Ganacia = "0.00";
        this.Pago = "0.00";
        this.BuscarP = "";
        this.ProductoBusqueda = [];
        this.banderakit = 0;
        __WEBPACK_IMPORTED_MODULE_4_jquery__(document).ready(function () {
            __WEBPACK_IMPORTED_MODULE_4_jquery__('.BTNbusqueda').click(function () {
                __WEBPACK_IMPORTED_MODULE_4_jquery__('.tablaBusqueda').slideToggle("slow");
                __WEBPACK_IMPORTED_MODULE_4_jquery__('#habil').toggle();
                __WEBPACK_IMPORTED_MODULE_4_jquery__('#inhabil').toggle();
                __WEBPACK_IMPORTED_MODULE_4_jquery__('.inputBusqueda').focus();
            });
        });
    }
    //EVENTO LOAD CONSULTA PARA LA VENTANA
    PedidoPage.prototype.ionViewDidLoad = function () {
        this.SelectPedidoActual();
    };
    //PEDIDO ACTUAL
    PedidoPage.prototype.SelectPedidoActual = function () {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT CODIGOKIT, MINIMO_VENTA FROM Usuario', {})
                .then(function (res) {
                _this.codigoKit = res.rows.item(0).CODIGOKIT;
                _this.minimoVenta = res.rows.item(0).MINIMO_VENTA;
            }).catch(function (e) { return console.log(e); });
            var Totales = 'SELECT SUM(P.PRECIO*P.CANTIDAD) TOTAL, ';
            Totales += 'SUM(CASE WHEN C.COMISIONABLE = 1 THEN (P.PRECIO*P.CANTIDAD) ELSE 0 END) COMI, ';
            Totales += 'SUM(CASE WHEN C.COMISIONABLE = 0 THEN (P.PRECIO*P.CANTIDAD) ELSE 0 END) NOCOMI ';
            Totales += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
            Totales += 'WHERE P.STATUS = 0 AND C.idLinea NOT IN (89)';
            db.executeSql(Totales, {})
                .then(function (res) {
                _this.TotalVenta = res.rows.item(0).TOTAL.toFixed(2);
                _this.Comisionable = res.rows.item(0).COMI.toFixed(2);
                _this.NoComisionable = res.rows.item(0).NOCOMI.toFixed(2);
                _this.Pago = (parseFloat(res.rows.item(0).TOTAL) * 0.70).toFixed(2);
                _this.Ganacia = (parseFloat(res.rows.item(0).TOTAL) * 0.30).toFixed(2);
                if (parseFloat(_this.TotalVenta) >= 900 && _this.codigoKit != "NA") {
                    _this.ObtieneKit();
                }
                else {
                    _this.deleteKit(_this.codigoKit);
                }
            }).catch(function (e) {
                console.log(e);
                _this.TotalVenta = (0).toFixed(2);
                _this.Comisionable = (0).toFixed(2);
                _this.NoComisionable = (0).toFixed(2);
                _this.Pago = (0).toFixed(2);
                _this.Ganacia = (0).toFixed(2);
                _this.pedidoActual = [];
            });
        }).catch(function (e) { console.log(e); });
    };
    //MODIFICA EL PEDIDO ACTUAL
    PedidoPage.prototype.removeProducto = function (idProducto, cantidad) {
        if (cantidad > 1) {
            var newCant = parseInt(cantidad) - 1;
            this.sqlite.create({
                name: 'dbBlenApp.db',
                location: 'default'
            }).then(function (db) {
                var sql = "UPDATE Pedido_Detalle SET CANTIDAD=? ";
                sql += "WHERE idPedido = 0 AND idProducto=?";
                db.executeSql(sql, [newCant, idProducto])
                    .then(function (res) { console.log(res); })
                    .catch(function (e) { console.log(e); });
            }).catch(function (e) { console.log(e); });
            this.SelectPedidoActual();
        }
    };
    PedidoPage.prototype.addProducto = function (idProducto, cantidad) {
        var newCant = parseInt(cantidad) + 1;
        if (newCant == 10) {
            var alert_1 = this.alertCtrl.create({
                title: '',
                subTitle: 'Favor de verificar la cantidad',
                buttons: ['Aceptar']
            });
            alert_1.present();
        }
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var sql = "UPDATE Pedido_Detalle SET CANTIDAD=? ";
            sql += "WHERE idPedido = 0 AND idProducto=?";
            db.executeSql(sql, [newCant, idProducto])
                .then(function (res) { console.log(res); })
                .catch(function (e) { console.log(e); });
        }).catch(function (e) { console.log(e); });
        this.SelectPedidoActual();
    };
    PedidoPage.prototype.deleteProducto = function (id) {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('DELETE FROM Pedido_Detalle WHERE idPedido = 0 AND idProducto=?', [id])
                .then(function (res) { console.log(res); }).catch(function (e) { console.log(e); });
        }).catch(function (e) { console.log(e); });
        setTimeout(function () {
            _this.SelectPedidoActual();
        }, 1000);
    };
    //BUSCAR PRODUCTO CATALOGO
    PedidoPage.prototype.btnBuscar = function () {
        var _this = this;
        this.cantidadBuscador = 1;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var sql = 'SELECT C.ID, C.LINEA, C.PRECIO, C.img99x148, ';
            sql += 'CASE WHEN length(C.NOMBRE) > 20 THEN substr(C.NOMBRE, 1,20) || "..." ELSE C.NOMBRE END NOMBRE ';
            sql += 'FROM Producto C WHERE ID=? AND C.idLinea NOT IN (89)';
            db.executeSql(sql, [_this.BuscarP])
                .then(function (res) {
                _this.ProductoBusqueda = [];
                _this.ProductoBusqueda.push({
                    ID: res.rows.item(0).ID,
                    NOMBRE: res.rows.item(0).NOMBRE,
                    LINEA: res.rows.item(0).LINEA,
                    PRECIO: res.rows.item(0).PRECIO.toFixed(2),
                    img99x148: res.rows.item(0).img99x148
                });
                _this.BuscarP = "";
            }).catch(function (e) {
                console.log(e);
                var alert = _this.alertCtrl.create({
                    subTitle: 'Ingresa un código valido',
                });
                alert.present();
                setTimeout(function () {
                    alert.dismiss();
                }, 1500);
            });
        }).catch(function (e) { console.log(e); });
    };
    PedidoPage.prototype.removeBusqueda = function () {
        if (this.cantidadBuscador > 1) {
            this.cantidadBuscador = this.cantidadBuscador - 1;
        }
    };
    PedidoPage.prototype.addBusqueda = function () {
        this.cantidadBuscador = this.cantidadBuscador + 1;
        if (this.cantidadBuscador == 10) {
            var alert_2 = this.alertCtrl.create({
                title: '',
                subTitle: 'Favor de verificar la cantidad',
                buttons: ['Aceptar']
            });
            alert_2.present();
        }
    };
    PedidoPage.prototype.btnCancelar = function () {
        this.ProductoBusqueda = [];
        document.getElementById("tablaBusqueda").style.display = "none";
        document.getElementById("habil").style.display = "block";
        document.getElementById("inhabil").style.display = "none";
        this.cantidadBuscador = 1;
        this.BuscarP = "";
    };
    PedidoPage.prototype.btnAgregar = function (id, precio) {
        var _this = this;
        this.db.addPedido(id, this.cantidadBuscador, precio);
        document.getElementById("tablaBusqueda").style.display = "none";
        document.getElementById("habil").style.display = "block";
        document.getElementById("inhabil").style.display = "none";
        this.ProductoBusqueda = [];
        setTimeout(function () {
            _this.SelectPedidoActual();
        }, 1000);
    };
    PedidoPage.prototype.ocultar = function () {
        this.BuscarP = "";
    };
    /////////////////////////////
    //KITS    
    PedidoPage.prototype.ObtieneKit = function () {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var sql = "SELECT ID,PRECIO FROM Producto WHERE ID=?";
            db.executeSql(sql, [_this.codigoKit])
                .then(function (res) {
                _this.banderakit = 1;
                _this.db.addPedido(res.rows.item(0).ID, 1, res.rows.item(0).PRECIO);
                setTimeout(function () {
                    _this.totalesKit();
                }, 1000);
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) { console.log(e); });
    };
    PedidoPage.prototype.totalesKit = function () {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var pedido = 'SELECT P.idProducto, ';
            pedido += 'CASE WHEN length(C.NOMBRE) > 20 THEN substr(C.NOMBRE, 1,20) || "..." ELSE C.NOMBRE END NOMBRE, ';
            pedido += 'C.idLinea, C.LINEA, C.img99x148, P.CANTIDAD, ';
            pedido += '(P.PRECIO*P.CANTIDAD) PRECIO ';
            pedido += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
            pedido += 'WHERE P.STATUS = 0';
            db.executeSql(pedido, [])
                .then(function (res) {
                _this.pedidoActual = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.pedidoActual.push({
                        idProducto: res.rows.item(i).idProducto,
                        NOMBRE: res.rows.item(i).NOMBRE,
                        idLinea: res.rows.item(i).idLinea,
                        LINEA: res.rows.item(i).LINEA,
                        img99x148: res.rows.item(i).img99x148,
                        CANTIDAD: res.rows.item(i).CANTIDAD,
                        PRECIO: res.rows.item(i).PRECIO.toFixed(2)
                    });
                }
            }).catch(function (e) { return console.log(e); });
            var Totales2 = 'SELECT SUM(P.PRECIO*P.CANTIDAD) TOTAL, ';
            Totales2 += 'SUM(CASE WHEN C.COMISIONABLE = 1 THEN (P.PRECIO*P.CANTIDAD) ELSE 0 END) COMI, ';
            Totales2 += 'SUM(CASE WHEN C.COMISIONABLE = 0 THEN (P.PRECIO*P.CANTIDAD) ELSE 0 END) NOCOMI ';
            Totales2 += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
            Totales2 += 'WHERE P.STATUS = 0';
            db.executeSql(Totales2, {})
                .then(function (res) {
                _this.TotalVenta = res.rows.item(0).TOTAL.toFixed(2);
                _this.Comisionable = res.rows.item(0).COMI.toFixed(2);
                _this.NoComisionable = res.rows.item(0).NOCOMI.toFixed(2);
                _this.Pago = (parseFloat(res.rows.item(0).TOTAL) * 0.70).toFixed(2);
                _this.Ganacia = (parseFloat(res.rows.item(0).TOTAL) * 0.30).toFixed(2);
            }).catch(function (e) {
                console.log(e);
                _this.TotalVenta = (0).toFixed(2);
                _this.Comisionable = (0).toFixed(2);
                _this.NoComisionable = (0).toFixed(2);
                _this.Pago = (0).toFixed(2);
                _this.Ganacia = (0).toFixed(2);
                _this.pedidoActual = [];
            });
        }).catch(function (e) { console.log(e); });
    };
    PedidoPage.prototype.removekit = function (idProducto, cantidad) {
        if (cantidad == 1) {
            var newCant = parseInt(cantidad) - 1;
            this.sqlite.create({
                name: 'dbBlenApp.db',
                location: 'default'
            }).then(function (db) {
                var sql = "UPDATE Pedido_Detalle SET CANTIDAD=? ";
                sql += "WHERE idPedido = 0 AND idProducto=?";
                db.executeSql(sql, [newCant, idProducto])
                    .then(function (res) { console.log(res); })
                    .catch(function (e) { console.log(e); });
            }).catch(function (e) { console.log(e); });
            this.SelectPedidoActual();
        }
    };
    PedidoPage.prototype.addkit = function (idProducto, cantidad) {
        if (cantidad == 0) {
            var newCant = parseInt(cantidad) + 1;
            this.sqlite.create({
                name: 'dbBlenApp.db',
                location: 'default'
            }).then(function (db) {
                var sql = "UPDATE Pedido_Detalle SET CANTIDAD=? ";
                sql += "WHERE idPedido = 0 AND idProducto=?";
                db.executeSql(sql, [newCant, idProducto])
                    .then(function (res) { console.log(res); })
                    .catch(function (e) { console.log(e); });
            }).catch(function (e) { console.log(e); });
            this.SelectPedidoActual();
        }
    };
    PedidoPage.prototype.deleteKit = function (id) {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('DELETE FROM Pedido_Detalle WHERE idPedido=0 AND STATUS=0 AND idProducto=?', [id])
                .then(function (res) { console.log(res); }).catch(function (e) { console.log(e); });
            var pedido = 'SELECT P.idProducto, ';
            pedido += 'CASE WHEN length(C.NOMBRE) > 20 THEN substr(C.NOMBRE, 1,20) || "..." ELSE C.NOMBRE END NOMBRE, ';
            pedido += 'C.idLinea, C.LINEA, C.img99x148, P.CANTIDAD, ';
            pedido += '(P.PRECIO*P.CANTIDAD) PRECIO ';
            pedido += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
            pedido += 'WHERE P.STATUS = 0';
            db.executeSql(pedido, [])
                .then(function (res) {
                _this.pedidoActual = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.pedidoActual.push({
                        idProducto: res.rows.item(i).idProducto,
                        NOMBRE: res.rows.item(i).NOMBRE,
                        idLinea: res.rows.item(i).idLinea,
                        LINEA: res.rows.item(i).LINEA,
                        img99x148: res.rows.item(i).img99x148,
                        CANTIDAD: res.rows.item(i).CANTIDAD,
                        PRECIO: res.rows.item(i).PRECIO.toFixed(2)
                    });
                }
            }).catch(function (e) { return console.log(e); });
            var Totales = 'SELECT SUM(P.PRECIO*P.CANTIDAD) TOTAL, ';
            Totales += 'SUM(CASE WHEN C.COMISIONABLE = 1 THEN (P.PRECIO*P.CANTIDAD) ELSE 0 END) COMI, ';
            Totales += 'SUM(CASE WHEN C.COMISIONABLE = 0 THEN (P.PRECIO*P.CANTIDAD) ELSE 0 END) NOCOMI ';
            Totales += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
            Totales += 'WHERE P.idPedido = 0 AND C.idLinea NOT IN (89)';
            db.executeSql(Totales, {})
                .then(function (res) {
                _this.TotalVenta = res.rows.item(0).TOTAL.toFixed(2);
                _this.Comisionable = res.rows.item(0).COMI.toFixed(2);
                _this.NoComisionable = res.rows.item(0).NOCOMI.toFixed(2);
                _this.Pago = (parseFloat(res.rows.item(0).TOTAL) * 0.70).toFixed(2);
                _this.Ganacia = (parseFloat(res.rows.item(0).TOTAL) * 0.30).toFixed(2);
            }).catch(function (e) {
                console.log(e);
                _this.TotalVenta = (0).toFixed(2);
                _this.Comisionable = (0).toFixed(2);
                _this.NoComisionable = (0).toFixed(2);
                _this.Pago = (0).toFixed(2);
                _this.Ganacia = (0).toFixed(2);
                _this.pedidoActual = [];
            });
        }).catch(function (e) { console.log(e); });
    };
    ///////////////////////////////
    //ENVIO DE PEDIDO
    PedidoPage.prototype.Enviar = function () {
        if (parseFloat(this.TotalVenta) == 0) {
            var alert_3 = this.alertCtrl.create({
                subTitle: ' Tú pedido se encuentra vacío ',
            });
            alert_3.present();
            setTimeout(function () {
                alert_3.dismiss();
            }, 1500);
        }
        else if (parseFloat(this.TotalVenta) < this.minimoVenta) {
            var alert_4 = this.alertCtrl.create({
                subTitle: 'Recuerda que tu pedido debe tener un minimo de $ ' + this.minimoVenta.toFixed(2),
            });
            alert_4.present();
            setTimeout(function () {
                alert_4.dismiss();
            }, 1500);
        }
        else if (parseFloat(this.TotalVenta) >= this.minimoVenta) {
            this.validacion();
        }
    };
    PedidoPage.prototype.validacion = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: 'Verifica los productos y promociones en tu pedido',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.terminos();
                    }
                }
            ]
        });
        alert.present();
    };
    PedidoPage.prototype.terminos = function () {
        var terminosModal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_5__condiciones_condiciones__["a" /* CondicionesPage */]);
        terminosModal.present();
    };
    PedidoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-pedido',template:/*ion-inline-start:"/Users/Desarrollo/Desktop/apps/src/pages/pedido/pedido.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <table class="encabezado">\n      <tr>\n        <td width="20px" align="left">\n          <button ion-button menuToggle clear>\n            <ion-icon name="menu" class="icono"></ion-icon>\n          </button>\n        </td>\n        <td align="center">\n          <label>Pedido</label>\n        </td>\n        <td width="40px" align="right">\n          <button ion-button clear class="BTNbusqueda" (click) = "ocultar()">\n            Buscar Producto</button>\n        </td>\n      </tr>\n    </table>\n  </ion-navbar> \n</ion-header>\n\n<ion-content>\n  <div padding class="tablaBusqueda" id="tablaBusqueda" align ="center">\n    <label>Ingresa un código valido que deseas buscar</label>\n    <table>\n      <tr>\n        <td width="45%">\n          <input type="number" [(ngModel)]="BuscarP" class="inputBusqueda">\n        </td>\n        <td width="5%"></td>\n        <td width="25%">\n          <button ion-button full clear class="btnBuscador" (click) = "btnBuscar()">\n            Buscar</button>\n        </td>\n        <td width="25%">\n          <button ion-button full clear class="btnBuscadorCancelar" (click)="btnCancelar()">\n            Cancelar</button>\n        </td>\n      </tr>\n    </table>\n  </div>\n  <div>\n    <ion-list *ngFor="let b of ProductoBusqueda">\n      <ion-item-sliding>\n        <ion-item id="kit">\n          <table>\n            <tr>\n              <td rowspan="3" class="imgPedido">\n                <img src="{{b.img99x148}}">\n              </td>\n              <td colspan="7" class="nombre">{{b.NOMBRE}}</td>\n              <td rowspan="3" class="moneda">$</td>\n              <td rowspan="3" class="precio">{{b.PRECIO}}</td>\n            </tr>\n            <tr>\n              <td colspan="5" class="linea">{{b.LINEA}}</td>\n            </tr>\n            <tr>\n              <td>{{b.ID}}</td>\n              <td class="cantidadPedido">Cantidad</td>\n              <td class="botonespedido">\n                  <ion-icon name="remove-circle" \n                  (click)="removeBusqueda()"  color = "red"></ion-icon>\n              </td>\n              <td class="numCantidadPedido">{{cantidadBuscador}}</td>\n              <td class="botonespedido">\n                  <ion-icon name="add-circle" \n                  (click)="addBusqueda()" color = "green"></ion-icon>\n              </td>\n            </tr>\n          </table>\n          <table class="BotonoesBusqueda">\n            <tr>\n                <td>\n                    <button ion-button full clear \n                    class="cancelarPedidoBusqueda" (click)="btnCancelar()">Cancelar</button>\n                </td>\n                <td>\n                  <button ion-button full clear \n                  class="btnBuscador" (click)="btnAgregar(b.ID,b.PRECIO)">Agregar</button>\n                </td>\n              </tr>\n          </table>\n        </ion-item>\n      </ion-item-sliding>\n    </ion-list>\n  </div>\n  <div>\n    <ion-list *ngFor="let p of pedidoActual">\n      <ion-item-sliding *ngIf="p.idLinea != 89">\n        <ion-item>\n          <table>\n            <tr>\n              <td rowspan="3" class="imgPedido">\n                <img src="{{p.img99x148}}">\n              </td>\n              <td colspan="7" class="nombre">{{p.NOMBRE}}</td>\n              <td rowspan="3" class="moneda">$</td>\n              <td rowspan="3" class="precio">{{p.PRECIO}}</td>\n            </tr>\n            <tr>\n              <td colspan="5" class="linea">{{p.LINEA}}</td>\n            </tr>\n            <tr>\n              <td class="codPedido">{{p.idProducto}}</td>\n              <td class="cantidadPedido">Cantidad</td>\n              <td class="botonespedido">\n                  <ion-icon name="remove-circle" \n                  (click)="removeProducto(p.idProducto,p.CANTIDAD)"  color = "red"></ion-icon>\n              </td>\n              <td class="numCantidadPedido">{{p.CANTIDAD}}</td>\n              <td class="botonespedido">\n                  <ion-icon name="add-circle" \n                  (click)="addProducto(p.idProducto,p.CANTIDAD)" color = "green"></ion-icon>\n              </td>\n            </tr>\n          </table>\n        </ion-item>\n        <ion-item-options side="rigth">\n          <button ion-button color="red" (click) = "deleteProducto(p.idProducto)">\n            <ion-icon name="trash"></ion-icon>\n          </button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n  </div>\n  <div>\n    <ion-list *ngFor="let p of pedidoActual">\n      <ion-item-sliding *ngIf="p.idLinea == 89">\n        <ion-item id="kit">\n          <table>\n            <tr>\n              <td rowspan="3" class="imgPedido">\n                <img src="{{p.img99x148}}">\n              </td>\n              <td colspan="7" class="nombre">{{p.NOMBRE}}</td>\n              <td rowspan="3" class="moneda">$</td>\n              <td rowspan="3" class="precio">{{p.PRECIO}}</td>\n            </tr>\n            <tr>\n              <td colspan="5" class="linea">{{p.LINEA}}</td>\n            </tr>\n            <tr>\n              <td>{{p.idProducto}}</td>\n              <td class="cantidadPedido">Cantidad</td>\n              <td class="botonespedido">\n                  <ion-icon name="remove-circle" \n                  (click)="removekit(p.idProducto,p.CANTIDAD)"  color = "red"></ion-icon>\n              </td>\n              <td class="numCantidadPedido">{{p.CANTIDAD}}</td>\n              <td class="botonespedido">\n                  <ion-icon name="add-circle" \n                  (click)="addkit(p.idProducto,p.CANTIDAD)" color = "green"></ion-icon>\n              </td>\n            </tr>\n          </table>\n        </ion-item>\n      </ion-item-sliding>\n    </ion-list>\n  </div>\n</ion-content>\n<ion-footer>\n  <div padding>\n    <table class="operaciones">\n      <tr>\n        <td class="TituloTicket">Total:</td>\n        <td class="SimboloTicket" width="5%">$</td>\n        <td class="TituloCosto" width="25%">{{TotalVenta}}</td>\n      </tr>\n      <tr>\n        <td class="SubtiruloTicket">Comisionable:</td>\n        <td class="SubtiruloTicketCosto" width="5%">$</td>\n        <td class="SubtiruloTicketCosto"  width="25%">{{Comisionable}}</td>\n      </tr>\n      <tr>\n        <td class="SubtiruloTicket">No Comisionable:</td>\n        <td class="SubtiruloTicketCosto" width="5%">$</td>\n        <td class="SubtiruloTicketCosto"  width="25%">{{NoComisionable}}</td>\n      </tr>\n      <tr>\n        <td class="TituloTicket">Pago Ticket:</td>\n        <td class="SimboloTicket" width="5%">$</td>\n        <td class="TituloCosto"  width="25%">{{Pago}}</td>\n      </tr>\n      <tr>\n        <td class="SubtiruloTicket">Tu Ganancia:</td>\n        <td class="SubtiruloTicketCosto" width="5%">$</td>\n        <td class="SubtiruloTicketCosto"  width="25%">{{Ganacia}}</td>\n      </tr>\n    </table>\n    <button ion-button full clear (click)="Enviar()" id="habil">Enviar mi Pedido</button>\n    <button ion-button full clear id="inhabil" disabled>Enviar mi Pedido</button>\n  </div>\n</ion-footer>\n'/*ion-inline-end:"/Users/Desarrollo/Desktop/apps/src/pages/pedido/pedido.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_sql_sql__["a" /* SqlProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */]])
    ], PedidoPage);
    return PedidoPage;
}());

//# sourceMappingURL=pedido.js.map

/***/ }),

/***/ 350:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AyudaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wsapps_wsapps__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(179);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var AyudaPage = (function () {
    function AyudaPage(navCtrl, http, camera, sqlite, alertCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.camera = camera;
        this.sqlite = sqlite;
        this.alertCtrl = alertCtrl;
        this.Dep = [];
        this.tematica = [];
        this.selectDepto = '0';
        this.opcionSeleccionado = '0';
        this.mensaje = "";
        this.titulo = "";
        this.idCategoria = "";
        this.idSubCategoria = "";
        __WEBPACK_IMPORTED_MODULE_5_jquery__(document).ready(function () {
            document.getElementById('contador').innerHTML = "0/500";
            document.getElementById('contadorTitulo').innerHTML = "0/100";
            __WEBPACK_IMPORTED_MODULE_5_jquery__('#mensaje').keyup(function () {
                var limit = __WEBPACK_IMPORTED_MODULE_5_jquery__(this).attr("maxlength"); // Límite del textarea
                var value = __WEBPACK_IMPORTED_MODULE_5_jquery__(this).val(); // Valor actual del textarea
                var current = value.length; // Número de caracteres actual
                if (limit < current) {
                    // Establece el valor del textarea al límite
                    __WEBPACK_IMPORTED_MODULE_5_jquery__(this).val(value.substring(0, limit));
                }
                else {
                    document.getElementById('contador').innerHTML = current + "/500";
                }
            });
            __WEBPACK_IMPORTED_MODULE_5_jquery__('#titulo').keyup(function () {
                var limit = __WEBPACK_IMPORTED_MODULE_5_jquery__(this).attr("maxlength"); // Límite del textarea
                var value = __WEBPACK_IMPORTED_MODULE_5_jquery__(this).val(); // Valor actual del textarea
                var current = value.length; // Número de caracteres actual
                if (limit < current) {
                    // Establece el valor del textarea al límite
                    __WEBPACK_IMPORTED_MODULE_5_jquery__(this).val(value.substring(0, limit));
                }
                else {
                    document.getElementById('contadorTitulo').innerHTML = current + "/10";
                }
            });
        });
    }
    AyudaPage.prototype.ionViewDidLoad = function () {
        this.Departamento();
    };
    AyudaPage.prototype.Departamento = function () {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var sql = 'SELECT CATEGORIA FROM CasosAyuda GROUP BY CATEGORIA ORDER BY idCategoria';
            db.executeSql(sql, {})
                .then(function (res) {
                _this.Dep = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.Dep.push({
                        CATEGORIA: res.rows.item(i).CATEGORIA
                    });
                }
            }).catch(function (e) { console.log(e); });
            var sqlsub = 'SELECT SUBCATEGORIA FROM CasosAyuda WHERE idSubCategoria = 0';
            db.executeSql(sqlsub, {})
                .then(function (res) {
                _this.tematica = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.tematica.push({
                        SUBCATEGORIA: res.rows.item(i).SUBCATEGORIA
                    });
                }
            }).catch(function (e) { console.log(e); });
            db.executeSql('SELECT ID FROM Usuario', {})
                .then(function (res) {
                _this.usuario = res.rows.item(0).ID;
            }).catch(function (e) { console.log(e); });
        }).catch(function (e) { console.log(e); });
    };
    AyudaPage.prototype.SubCategoria = function () {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var sql = 'SELECT SUBCATEGORIA FROM CasosAyuda WHERE CATEGORIA =? ';
            sql += 'OR idSubCategoria = 0 ORDER BY idSubCategoria';
            db.executeSql(sql, [_this.selectDepto])
                .then(function (res) {
                _this.tematica = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.tematica.push({
                        SUBCATEGORIA: res.rows.item(i).SUBCATEGORIA
                    });
                }
            }).catch(function (e) { console.log(e); });
        }).catch(function (e) { console.log(e); });
    };
    AyudaPage.prototype.Solicitud = function () {
        var _this = this;
        var folio = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
        this.FolioTicket = folio[Math.floor(Math.random() * folio.length)];
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var sql = 'SELECT idCategoria, idSubCategoria FROM CasosAyuda WHERE SUBCATEGORIA =?';
            db.executeSql(sql, [_this.opcionSeleccionado])
                .then(function (res) {
                _this.enviado(res.rows.item(0).idCategoria, res.rows.item(0).idSubCategoria);
            }).catch(function (e) {
                console.log(e);
                var alert = _this.alertCtrl.create({
                    title: '',
                    subTitle: 'Debes llenar todos los datos',
                    buttons: ['Aceptar']
                });
                alert.present();
            });
        }).catch(function (e) { console.log(e); });
    };
    AyudaPage.prototype.enviado = function (idCategoria, idSubCategoria) {
        var _this = this;
        if (idCategoria != 0 && idSubCategoria != 0 && this.mensaje != "" && this.titulo != "") {
            this.http.Clientes(this.usuario, this.FolioTicket, idCategoria, idSubCategoria, this.titulo, this.mensaje).subscribe(function (res) {
                if (res[0].mensaje != "" || res[0].mensaje != 0 || res != null) {
                    _this.limpiar();
                }
            });
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: '',
                subTitle: 'Debes llenar todos los datos',
                buttons: ['Aceptar']
            });
            alert_1.present();
        }
    };
    AyudaPage.prototype.limpiar = function () {
        this.idCategoria = "";
        this.idSubCategoria = "";
        this.mensaje = "";
        this.titulo = "";
        this.Departamento();
    };
    AyudaPage.prototype.capturar = function () {
        var _this = this;
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, function (err) {
            // Handle error
        });
    };
    AyudaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-ayuda',template:/*ion-inline-start:"/Users/Desarrollo/Desktop/apps/src/pages/ayuda/ayuda.html"*/'<ion-header>\n    <ion-navbar color="blue">\n      <table class="encabezado">\n        <tr>\n          <td width="20px" align="left">\n            <button ion-button menuToggle clear>\n              <ion-icon name="menu" class="icono"></ion-icon>\n            </button>\n          </td>\n          <td align="center">\n            <label>Atención a Cliente</label>\n          </td>\n          <td width="20px" align="right"></td>\n        </tr>\n      </table>\n    </ion-navbar> \n  </ion-header>\n\n\n<ion-content padding>\n  <div class="Categoria">\n    <label>Departamento:</label>\n    <select [(ngModel)]="selectDepto" (change)="SubCategoria()" >\n      <option *ngFor="let d of Dep">{{d.CATEGORIA}}</option>\n    </select>\n    <label>Tematica:</label>\n    <select [(ngModel)]="opcionSeleccionado">\n      <option *ngFor="let t of tematica">{{t.SUBCATEGORIA}}</option>\n    </select>\n    <br>\n    <br>\n    <table>\n      <tr>\n        <td><label>Titulo:</label></td>\n        <td align="right"><p id="contadorTitulo"></p></td>\n      </tr>\n    </table>\n    <textarea name="textarea" id="titulo" [(ngModel)]="titulo" maxlength="100"></textarea>\n    <br>\n    <table>\n      <tr>\n        <td><label>Mensaje:</label></td>\n        <td align="right"><p id="contador"></p></td>\n      </tr>\n    </table>\n    <textarea name="textarea" id="mensaje" [(ngModel)]="mensaje" maxlength="500"></textarea>\n  </div>\n</ion-content>\n<ion-footer padding>\n  <table>\n    <tr>\n      <td colspan="3" align="center">\n        <button ion-fab clear class="btnCamara">\n          <ion-icon name="md-camera"></ion-icon>\n        </button>\n      </td>\n    </tr>\n    <br>\n    <tr>\n      <td width= "40%">\n        <button ion-button full clear class="btnchat" (click)= "limpiar()">BORRAR</button>\n      </td>\n      <td width="10%"></td>\n      <td width ="40%">\n        <button ion-button full clear  class="btnchat" (click)="Solicitud()">ENVIAR</button>\n      </td>\n    </tr>\n  </table>\n</ion-footer>\n'/*ion-inline-end:"/Users/Desarrollo/Desktop/apps/src/pages/ayuda/ayuda.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_wsapps_wsapps__["a" /* WsappsProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], AyudaPage);
    return AyudaPage;
}());

//# sourceMappingURL=ayuda.js.map

/***/ }),

/***/ 351:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_home_home__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sql_sql__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_wsapps_wsapps__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var LoginPage = (function () {
    function LoginPage(navCtrl, db, ws, alertCtrl, menu, sqlite, toast, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.db = db;
        this.ws = ws;
        this.alertCtrl = alertCtrl;
        this.menu = menu;
        this.sqlite = sqlite;
        this.toast = toast;
        this.loadingCtrl = loadingCtrl;
        //variables para log
        this.user = ""; //"82272";
        this.pass = ""; //"BLEN82272563";
        this.bandera = 0;
        this.menu.enable(false);
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        this.wsApp();
    };
    //EVENTO DE BOTON ENTRAR PARA VALIDES DE USUARIO
    LoginPage.prototype.submit = function () {
        var _this = this;
        if (this.user != "" && this.pass != "") {
            this.ws.getLogin(this.user, this.pass).subscribe(function (login) {
                if (login[0].status == 1) {
                    _this.ws.getProductoTop(login[0].id).subscribe(function (Top) {
                        _this.db.IngresaData(login, _this.vigenciaCatalogo, _this.producto, _this.flayer, _this.ingrediente, _this.productoIngrediente, Top, _this.enfermedad, _this.productoEnfermedad, _this.casos);
                        var loading = _this.loadingCtrl.create({
                            content: 'Descargando Complementos...'
                        });
                        loading.present();
                        setTimeout(function () {
                            loading.dismiss();
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_home_home__["a" /* HomePage */]);
                        }, 60000);
                    });
                }
                else {
                    var alert_1 = _this.alertCtrl.create({
                        title: '',
                        subTitle: 'Cominicate con tu DMI',
                        buttons: ['Aceptar']
                    });
                    alert_1.present();
                }
            });
        }
        else {
            var alert_2 = this.alertCtrl.create({
                title: 'Error 028',
                subTitle: 'Ingresa Datos',
                buttons: ['Aceptar']
            });
            alert_2.present();
        }
    };
    LoginPage.prototype.wsApp = function () {
        var _this = this;
        this.ws.getVigenciaCatalogo().subscribe(function (VigenviaCatalogo) {
            _this.vigenciaCatalogo = VigenviaCatalogo;
        });
        this.ws.getProducto().subscribe(function (Producto) {
            _this.producto = Producto;
        });
        this.ws.getPromocionFlayer().subscribe(function (Flayer) {
            _this.flayer = Flayer;
        });
        this.ws.getIngrediente().subscribe(function (Ingrediente) {
            _this.ingrediente = Ingrediente;
        });
        this.ws.getProductoIngrediente().subscribe(function (ProductoIngrediente) {
            _this.productoIngrediente = ProductoIngrediente;
        });
        this.ws.getEnfermedad().subscribe(function (Enfermedad) {
            _this.enfermedad = Enfermedad;
        });
        this.ws.getProductoEnfermedad().subscribe(function (ProductoEnfermedad) {
            _this.productoEnfermedad = ProductoEnfermedad;
        });
        this.ws.CasosApoyo().subscribe(function (Casos) {
            _this.casos = Casos;
        });
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        this.db.Catalogo();
    };
    LoginPage.prototype.desarrollador = function () {
        this.bandera++;
        if (this.bandera == 20) {
            alert("Diego Osvaldo Cervantes Guzman");
            this.bandera = 0;
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/Desarrollo/Desktop/apps/src/pages/login/login.html"*/'<ion-content>\n  <div style="width: 100%; height: 100%;">\n    <img src="assets/imgs/portada.png" width="100%" height="100%" (click) = "desarrollador()">\n    <div style="height: 30%; width: 100%; position: absolute; bottom: 15%;" padding = "20%">\n      <table width="100%">\n        <tr>\n          <td colspan="2">\n            <input style="width: 100%; \n            height: 50px; \n            text-align: center;\n            font-size: 30px;\n            border-radius: 10px;\n            border: 0;" type="number" [(ngModel)]="user" (click)="DatosVigencia()"></td>\n        </tr>\n        <br>\n        <tr>\n          <td colspan="2">\n            <input style="width: 100%; \n            height: 50px; \n            text-align: center;\n            font-size: 30px;\n            border-radius: 10px;\n            border: 0;" type="password" [(ngModel)]="pass"></td>\n        </tr>\n        <br>\n        <tr>\n          <td>\n            <button ion-button full style="height: 50px; \n            font-size: 30px;\n            border-radius: 10px;\n            border: 0;" \n            color = "blen" (click)="submit()">Entrar</button>\n          </td>\n        </tr>\n      </table>\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/Desarrollo/Desktop/apps/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5__providers_sql_sql__["a" /* SqlProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_wsapps_wsapps__["a" /* WsappsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* MenuController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 352:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(353);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(374);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 36:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SqlProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__wsapps_wsapps__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SqlProvider = (function () {
    function SqlProvider(http, ws, alertCtrl, sqlite, toast, loadingCtrl) {
        this.http = http;
        this.ws = ws;
        this.alertCtrl = alertCtrl;
        this.sqlite = sqlite;
        this.toast = toast;
        this.loadingCtrl = loadingCtrl;
        this.Lineas = [];
        this.Productos = [];
        this.ProductoTop = [];
        this.ProductoNuevo = [];
    }
    SqlProvider.prototype.IngresaData = function (login, vigenciaCatalogo, producto, flayer, ingrediente, productoIngrediente, top, enfermedad, productoEnfermedad, Ayuda) {
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var DropUsuario = "DROP TABLE IF EXISTS Usuario";
            db.executeSql(DropUsuario, {})
                .then(function (res) { return console.log(res + 'Executed SQL'); }).catch(function (err) { return console.log(err); });
            var sqlUsuario = "CREATE TABLE IF NOT EXISTS Usuario ";
            sqlUsuario += "(ID INT PRIMARY KEY, NOMBRE TEXT, DMI INT, ULTIMA_VENTA REAL, ";
            sqlUsuario += "PENULTIMA_VENTA REAL, ANTE_PENULTIMA_VENTA REAL, ";
            sqlUsuario += "ANTE_ANTE_PENULTIMA_VENTA REAL, E1 INT, E2 INT, E3 INT, E4 INT, ";
            sqlUsuario += "VIGENCIAPERFIL DATE, VIGENCIAESTACION DATE, KIT INT, ";
            sqlUsuario += "CODIGOKIT TEXT, PUNTOS REAL, MINIMO_VENTA REAL, FOTO BLOB)";
            db.executeSql(sqlUsuario, {})
                .then(function (res) { return console.log(res + 'Executed SQL'); }).catch(function (err) { return console.log(err); });
            db.executeSql('INSERT INTO Usuario VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,NULL)', [
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
            ]).then(function (res) {
                console.log(res);
                /*  this.toast.show('Usuario', '5000', 'center').subscribe(
                  toast => {
                    console.log(toast);
                  }
                ); */
            }).catch(function (e) { console.log(e); });
            var DropVigenciaCatalogo = "DROP TABLE IF EXISTS Vigencia_Catalogo";
            db.executeSql(DropVigenciaCatalogo, {})
                .then(function (res) { return console.log(res + 'Executed SQL'); }).catch(function (err) { return console.log(err); });
            var SQLvigenciaCatalogo = "CREATE TABLE IF NOT EXISTS Vigencia_Catalogo ";
            SQLvigenciaCatalogo += "(ID INT PRIMARY KEY, NOMBRE TEXT, FIN_VIGENCIA DATE)";
            db.executeSql(SQLvigenciaCatalogo, {})
                .then(function (res) { return console.log(res, 'Executed SQL'); }).catch(function (e) { return console.log(e); });
            db.executeSql('INSERT INTO Vigencia_Catalogo VALUES(?,?,?)', [
                vigenciaCatalogo[0].clave,
                vigenciaCatalogo[0].name,
                vigenciaCatalogo[0].fin
            ]).then(function (res) {
                console.log(res);
                /* this.toast.show('vigencia', '5000', 'center').subscribe(
                  toast => {
                    console.log(toast);
                  }
                ); */
            }).catch(function (e) { console.log(e); });
            var DropCatalogo = "DROP TABLE IF EXISTS Producto";
            db.executeSql(DropCatalogo, {})
                .then(function (res) { return console.log(res + 'Executed SQL'); }).catch(function (err) { return console.log(err); });
            var sqlCatalogo = "CREATE TABLE IF NOT EXISTS Producto (ID INT PRIMARY KEY, ";
            sqlCatalogo += "NOMBRE TEXT, idLinea INT, LINEA TEXT, FK_idCatalogo INT, ";
            sqlCatalogo += "PRECIO REAL, COMISIONABLE INT, DESCRIPCION TEXT, MODOUSO TEXT, ";
            sqlCatalogo += "CONTRAINDICACIONES TEXT, img99x148 BLOB, CONVERSION INT, TIPO INT, ";
            sqlCatalogo += "ORDEN INT, NUEVO INT)";
            db.executeSql(sqlCatalogo, {})
                .then(function (res) { return console.log(res + 'Executed SQL'); }).catch(function (err) { return console.log(err); });
            for (var a = 0; a < Object.keys(producto).length; a++) {
                db.executeSql('INSERT INTO Producto VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
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
                ]).then(function (res) {
                    console.log(res);
                    /*  this.toast.show('Producto', '5000', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      }
                    ); */
                }).catch(function (e) { console.log(e); });
            }
            var Dropflayer = "DROP TABLE IF EXISTS Flayer";
            db.executeSql(Dropflayer, {})
                .then(function (res) { return console.log(res + 'Executed SQL'); }).catch(function (err) { return console.log(err); });
            var SQLflayer = "CREATE TABLE IF NOT EXISTS Flayer ";
            SQLflayer += "(ID INT PRIMARY KEY, BASE TEXT, IMGFLAYER BLOB)";
            db.executeSql(SQLflayer, {})
                .then(function (res) { return console.log(res, 'Executed SQL'); }).catch(function (e) { return console.log(e); });
            for (var b = 0; b < Object.keys(flayer).length; b++) {
                db.executeSql('INSERT INTO Flayer VALUES(?,?,?)', [
                    flayer[b].id,
                    flayer[b].base_promocion,
                    flayer[b].img
                ]).then(function (res) {
                    console.log(res);
                    /* this.toast.show('flayer', '5000', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      }
                    ); */
                }).catch(function (e) { console.log(e); });
            }
            var sqlIngrediente = "CREATE TABLE IF NOT EXISTS Ingrediente ";
            sqlIngrediente += "(ID INT PRIMARY KEY, NOMBRE TEXT, img99x148 BLOB)";
            db.executeSql(sqlIngrediente, {})
                .then(function (res) { return console.log(res + 'Executed SQL'); }).catch(function (err) { return console.log(err); });
            for (var c = 0; c < Object.keys(ingrediente).length; c++) {
                db.executeSql('INSERT INTO Ingrediente VALUES(?,?,?)', [
                    ingrediente[c].id,
                    ingrediente[c].nombre,
                    ingrediente[c].img
                ]).then(function (res) {
                    console.log(res);
                    /*  this.toast.show('Ingrediente', '5000', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      }
                    ); */
                }).catch(function (e) { console.log(e); });
            }
            var DropIngredientecatalogo = "DROP TABLE IF EXISTS ProductoIngrediente";
            db.executeSql(DropIngredientecatalogo, {})
                .then(function (res) { return console.log(res + 'Executed SQL'); }).catch(function (err) { return console.log(err); });
            var SQLingrediente_Producto = "CREATE TABLE IF NOT EXISTS ProductoIngrediente ";
            SQLingrediente_Producto += "(FK_idProducto INT, FK_idIngredeinte INT)";
            db.executeSql(SQLingrediente_Producto, {})
                .then(function (res) { return console.log(res, 'Executed SQL'); }).catch(function (e) { return console.log(e); });
            for (var d = 0; d < Object.keys(productoIngrediente).length; d++) {
                db.executeSql('INSERT INTO ProductoIngrediente VALUES(?,?)', [
                    productoIngrediente[d].idProducto,
                    productoIngrediente[d].idIngredinte
                ]).then(function (res) {
                    console.log(res);
                    /*  this.toast.show('producto_Ingrediente', '5000', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      }
                    ); */
                }).catch(function (e) { console.log(e); });
            }
            var DropTop = "DROP TABLE IF EXISTS Top";
            db.executeSql(DropTop, {})
                .then(function (res) { return console.log(res + 'Executed SQL'); }).catch(function (err) { return console.log(err); });
            var SQLTop = "CREATE TABLE IF NOT EXISTS Top (FK_idProducto INT)";
            db.executeSql(SQLTop, {})
                .then(function (res) { return console.log(res, 'Executed SQL'); }).catch(function (e) { return console.log(e); });
            for (var e = 0; e < Object.keys(top).length; e++) {
                db.executeSql('INSERT INTO Top VALUES(?)', [
                    top[e].id
                ]).then(function (res) {
                    console.log(res);
                    /*  this.toast.show('Top', '5000', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      }
                    ); */
                }).catch(function (e) { console.log(e); });
            }
            var sqlEnfermedad = "CREATE TABLE IF NOT EXISTS Enfermedad ";
            sqlEnfermedad += "(ID INT PRIMARY KEY, NOMBRE TEXT, img99x148 BLOB)";
            db.executeSql(sqlEnfermedad, {})
                .then(function (res) { return console.log(res + 'Executed SQL'); }).catch(function (err) { return console.log(err); });
            for (var f = 0; f < Object.keys(enfermedad).length; f++) {
                db.executeSql('INSERT INTO Enfermedad VALUES(?,?,?)', [
                    enfermedad[f].id,
                    enfermedad[f].nombre,
                    enfermedad[f].img
                ]).then(function (res) {
                    console.log(res);
                    /* this.toast.show('Enfermedad', '5000', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      }
                    ); */
                }).catch(function (e) { console.log(e); });
            }
            var DropProductoEnfermedado = "DROP TABLE IF EXISTS ProductoEnfermedad";
            db.executeSql(DropProductoEnfermedado, {})
                .then(function (res) { return console.log(res + 'Executed SQL'); }).catch(function (err) { return console.log(err); });
            var SQLProductoEnfermedad = "CREATE TABLE IF NOT EXISTS ProductoEnfermedad ";
            SQLProductoEnfermedad += "(FK_idProducto INT, FK_idEnfermedad INT)";
            db.executeSql(SQLProductoEnfermedad, {})
                .then(function (res) { return console.log(res, 'Executed SQL'); }).catch(function (e) { return console.log(e); });
            for (var g = 0; g < Object.keys(productoEnfermedad).length; g++) {
                db.executeSql('INSERT INTO ProductoEnfermedad VALUES(?,?)', [
                    productoEnfermedad[g].idProducto,
                    productoEnfermedad[g].idEnfermedad
                ]).then(function (res) {
                    console.log(res);
                    /*  this.toast.show('Producto_Enfermedad', '5000', 'center').subscribe(
                      toast => {
                        console.log(toast);
                      }
                    ); */
                }).catch(function (e) { console.log(e); });
            }
            var DropCasos = "DROP TABLE IF EXISTS CasosAyuda";
            db.executeSql(DropCasos, {})
                .then(function (res) { return console.log(res + 'Executed SQL'); }).catch(function (err) { return console.log(err); });
            var Casos = "CREATE TABLE IF NOT EXISTS CasosAyuda ";
            Casos += "(idCategoria INT, CATEGORIA TEXT, idSubCategoria INT PRIMARY KEY, ";
            Casos += "SUBCATEGORIA TEXT)";
            db.executeSql(Casos, {})
                .then(function (res) { return console.log(res, 'Executed SQL'); }).catch(function (e) { return console.log(e); });
            var registroCero = "INSERT INTO CasosAyuda VALUES(0,'Selecciona una opción', ";
            registroCero += "0, 'Selecciona una opción')";
            db.executeSql(registroCero, {}).then(function (res) { console.log(res); })
                .catch(function (e) { console.log(e); });
            for (var h = 0; h < Object.keys(Casos).length; h++) {
                db.executeSql('INSERT INTO CasosAyuda VALUES(?,?,?,?)', [
                    Ayuda[h].idCategoria,
                    Ayuda[h].Categoria,
                    Ayuda[h].idSubCategoria,
                    Ayuda[h].SubCategoria
                ]).then(function (res) {
                    console.log(res);
                    /*this.toast.show('Casos Ayuda', '5000', 'center').subscribe(
                        toast => {
                          console.log(toast);
                        }
                      );*/
                }).catch(function (e) { console.log(e); });
            }
        }).catch(function (e) { console.log(e); });
    };
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
    SqlProvider.prototype.addPedido = function (idProducto, cantidad, precio) {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT CODIGOKIT FROM Usuario', {})
                .then(function (res) {
                _this.codigoKit = res.rows.item(0).CODIGOKIT;
            }).catch(function (e) { return console.log(e); });
            var producto = "SELECT idProducto FROM Pedido_Detalle ";
            producto += "WHERE idPedido=0 AND idProducto =?";
            db.executeSql(producto, [idProducto])
                .then(function (res) {
                _this.mismoProducto(res.rows.item(0).idProducto);
            }).catch(function (e) {
                console.log(e);
                _this.insertPedidoDetalle(idProducto, cantidad, precio);
            });
        }).catch(function (e) { console.log(e); });
    };
    SqlProvider.prototype.mismoProducto = function (idProducto) {
        if (idProducto != "" && idProducto != this.codigoKit) {
            var alert_1 = this.alertCtrl.create({
                subTitle: 'Se encuentra en tu pedido',
            });
            alert_1.present();
            setTimeout(function () {
                alert_1.dismiss();
            }, 1500);
        }
    };
    SqlProvider.prototype.insertPedidoDetalle = function (idProducto, cantidad, precio) {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var Pedido = "CREATE TABLE IF NOT EXISTS Pedido_Detalle ";
            Pedido += "(idPedido TEXT, idProducto INT, CANTIDAD INT, PRECIO REAL, STATUS INT)";
            db.executeSql(Pedido, {})
                .then(function (res) { return console.log(res, 'Executed SQL'); }).catch(function (e) { return console.log(e); });
            db.executeSql('INSERT INTO Pedido_Detalle VALUES(?,?,?,?,?)', ["0", idProducto, cantidad, precio, 0]).then(function (res) {
                console.log(res);
                if (idProducto != _this.codigoKit && _this.duplicado != 1) {
                    _this.duplicado = 0;
                    var alert_2 = _this.alertCtrl.create({
                        subTitle: 'Agregado a tu pedido vigente',
                    });
                    alert_2.present();
                    setTimeout(function () {
                        alert_2.dismiss();
                    }, 1500);
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) { console.log(e); });
    };
    //////////////////////////////////////////////////
    //GESTIONA LA TABLA DE FAVORITOS
    SqlProvider.prototype.addFavorito = function (id) {
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var SQLvigenciaCatalogo = "CREATE TABLE IF NOT EXISTS Favorito ";
            SQLvigenciaCatalogo += "(FK_idProducto INT PRIMARY KEY)";
            db.executeSql(SQLvigenciaCatalogo, {})
                .then(function (res) { return console.log(res, 'Executed SQL'); }).catch(function (e) { return console.log(e); });
            db.executeSql('INSERT INTO Favorito VALUES(?)', [id])
                .then(function (res) { console.log(res); }).catch(function (e) { console.log(e); });
        }).catch(function (e) { console.log(e); });
    };
    SqlProvider.prototype.removeFavorito = function (id) {
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('DELETE FROM Favorito WHERE FK_idProducto=?', [id])
                .then(function (res) { console.log(res); }).catch(function (e) { console.log(e); });
        }).catch(function (e) { console.log(e); });
    };
    //SELECT PARA EL CATALOGO EN VARIABLE GLOBAL
    SqlProvider.prototype.Catalogo = function () {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var sqlLineas = "SELECT idLinea,LINEA FROM Producto ";
            sqlLineas += "WHERE idLinea NOT IN (89) GROUP BY idLinea, LINEA ";
            sqlLineas += "ORDER BY ORDEN ASC";
            db.executeSql(sqlLineas, {})
                .then(function (res) {
                _this.Lineas = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.Lineas.push({
                        idLinea: res.rows.item(i).idLinea,
                        LINEA: res.rows.item(i).LINEA
                    });
                }
            }).catch(function (e) { return console.log(e); });
            db.executeSql('SELECT ID,NOMBRE,idLinea,img99x148 FROM Producto', {})
                .then(function (res) {
                _this.Productos = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.Productos.push({
                        ID: res.rows.item(i).ID,
                        NOMBRE: res.rows.item(i).NOMBRE,
                        idLinea: res.rows.item(i).idLinea,
                        img99x148: res.rows.item(i).img99x148
                    });
                }
            }).catch(function (e) { return console.log(e); });
            db.executeSql('SELECT ID,NOMBRE,idLinea,img99x148 FROM Producto WHERE NUEVO = 1', {})
                .then(function (res) {
                _this.ProductoNuevo = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.ProductoNuevo.push({
                        ID: res.rows.item(i).ID,
                        NOMBRE: res.rows.item(i).NOMBRE,
                        idLinea: res.rows.item(i).idLinea,
                        img99x148: res.rows.item(i).img99x148
                    });
                }
            }).catch(function (e) { return console.log(e); });
            var topProducto = "SELECT P.ID,P.NOMBRE,P.idLinea,P.img99x148 FROM Producto P ";
            topProducto += "INNER JOIN Top T ON T.FK_idProducto = P.ID";
            db.executeSql(topProducto, {})
                .then(function (res) {
                _this.ProductoTop = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.ProductoTop.push({
                        ID: res.rows.item(i).ID,
                        NOMBRE: res.rows.item(i).NOMBRE,
                        idLinea: res.rows.item(i).idLinea,
                        img99x148: res.rows.item(i).img99x148
                    });
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) { console.log(e); });
    };
    SqlProvider.prototype.duplicarPedido = function (idProducto, cantidad, precio) {
        this.duplicado = 1;
        this.addPedido(idProducto, cantidad, precio);
    };
    SqlProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_4__wsapps_wsapps__["a" /* WsappsProvider */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* LoadingController */]])
    ], SqlProvider);
    return SqlProvider;
}());

//# sourceMappingURL=sql.js.map

/***/ }),

/***/ 37:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WsappsProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_first__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_first___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_first__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var WsappsProvider = (function () {
    function WsappsProvider(http) {
        this.http = http;
        this.urlServidor = "http://servicios.blen.com.mx/api/";
    }
    WsappsProvider.prototype.getVigenciaCatalogo = function () {
        var vigencia = this.urlServidor + "vigenciaCatalogo";
        return this.http.get(vigencia);
    };
    WsappsProvider.prototype.getProducto = function () {
        var urlProducto = this.urlServidor + "producto";
        return this.http.get(urlProducto);
    };
    WsappsProvider.prototype.getLogin = function (user, pass) {
        var urlUser = this.urlServidor + "login/login/" + user + "/" + pass;
        return this.http.get(urlUser);
    };
    WsappsProvider.prototype.getPromocionFlayer = function () {
        var urlPromocionFlayer = this.urlServidor + "promocionFlayer";
        return this.http.get(urlPromocionFlayer);
    };
    WsappsProvider.prototype.getIngrediente = function () {
        var urlIngrediente = this.urlServidor + "ingrediente";
        return this.http.get(urlIngrediente);
    };
    WsappsProvider.prototype.getProductoIngrediente = function () {
        var urlProductoIngrediente = this.urlServidor + "productoIngrediente";
        return this.http.get(urlProductoIngrediente);
    };
    WsappsProvider.prototype.getProductoTop = function (user) {
        var urlproductoTop = this.urlServidor + "productoTop/productoTop/" + user;
        return this.http.get(urlproductoTop);
    };
    WsappsProvider.prototype.getEnfermedad = function () {
        var urlEnfermedad = this.urlServidor + "enfermedad";
        return this.http.get(urlEnfermedad);
    };
    WsappsProvider.prototype.getProductoEnfermedad = function () {
        var urlProductoEnfermedad = this.urlServidor + "productoEnfermedad";
        return this.http.get(urlProductoEnfermedad);
    };
    WsappsProvider.prototype.CasosApoyo = function () {
        var Casos = this.urlServidor + "CasosAyuda";
        return this.http.get(Casos);
    };
    WsappsProvider.prototype.Clientes = function (usuario, folio, categoria, subcategoria, tema, mensaje) {
        var Ticket = this.urlServidor + "TicketServicio/Ticket/";
        Ticket += usuario + "/" + folio + "/" + categoria + "/" + subcategoria + "/";
        Ticket += tema + "/" + mensaje;
        return this.http.get(Ticket);
    };
    WsappsProvider.prototype.EncabezadoPedido = function (usuario, catalogo, estacion, piezas, total) {
        var Encabezado = this.urlServidor + "EnviarPedido/Enviar/";
        Encabezado += usuario + "/" + catalogo + "/" + estacion + "/" + piezas + "/" + total + "/";
        return this.http.get(Encabezado);
    };
    WsappsProvider.prototype.DetallePedido = function (usuario, producto, precio, cantidad, pedido, tipo) {
        var detalle = this.urlServidor + "EnviarProducto/Enviar/";
        detalle += usuario + "/" + producto + "/" + precio + "/" + cantidad + "/" + pedido;
        detalle += "/" + tipo;
        return this.http.get(detalle);
    };
    WsappsProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], WsappsProvider);
    return WsappsProvider;
}());

//# sourceMappingURL=wsapps.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_charts__ = __webpack_require__(438);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ng2_charts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_ng2_charts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_sql_sql__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_wsapps_wsapps__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_sqlite__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_toast__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__ = __webpack_require__(119);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__app_component__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_ayuda_ayuda__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_comunicados_comunicados__ = __webpack_require__(488);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_detalle_producto_detalle_producto__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_favoritos_favoritos__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_informacion_informacion__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_historial_pedido_historial_pedido__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_home_home__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_login_login__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_mostrar_pedido_mostrar_pedido__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__pages_pedido_pedido__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_productos_productos__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_relacionados_relacionados__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__ionic_native_status_bar__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__ionic_native_splash_screen__ = __webpack_require__(349);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};











//pantallas














var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_ayuda_ayuda__["a" /* AyudaPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_comunicados_comunicados__["a" /* ComunicadosPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_detalle_producto_detalle_producto__["a" /* DetalleProductoPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_favoritos_favoritos__["a" /* FavoritosPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_informacion_informacion__["a" /* InformacionPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_historial_pedido_historial_pedido__["a" /* HistorialPedidoPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_mostrar_pedido_mostrar_pedido__["a" /* MostrarPedidoPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_pedido_pedido__["a" /* PedidoPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_productos_productos__["a" /* ProductosPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_relacionados_relacionados__["a" /* RelacionadosPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3_ng2_charts__["ChartsModule"],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/detalle-producto/detalle-producto.module#DetalleProductoPageModule', name: 'DetalleProductoPage', segment: 'detalle-producto', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/favoritos/favoritos.module#FavoritosPageModule', name: 'FavoritosPage', segment: 'favoritos', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/historial-pedido/historial-pedido.module#HistorialPedidoPageModule', name: 'HistorialPedidoPage', segment: 'historial-pedido', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/informacion/informacion.module#InformacionPageModule', name: 'InformacionPage', segment: 'informacion', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mostrar-pedido/mostrar-pedido.module#MostrarPedidoPageModule', name: 'MostrarPedidoPage', segment: 'mostrar-pedido', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/pedido/pedido.module#PedidoPageModule', name: 'PedidoPage', segment: 'pedido', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/relacionados/relacionados.module#RelacionadosPageModule', name: 'RelacionadosPage', segment: 'relacionados', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_10__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_11__pages_ayuda_ayuda__["a" /* AyudaPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_comunicados_comunicados__["a" /* ComunicadosPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_detalle_producto_detalle_producto__["a" /* DetalleProductoPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_favoritos_favoritos__["a" /* FavoritosPage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_informacion_informacion__["a" /* InformacionPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_historial_pedido_historial_pedido__["a" /* HistorialPedidoPage */],
                __WEBPACK_IMPORTED_MODULE_17__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_18__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_19__pages_mostrar_pedido_mostrar_pedido__["a" /* MostrarPedidoPage */],
                __WEBPACK_IMPORTED_MODULE_20__pages_pedido_pedido__["a" /* PedidoPage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_productos_productos__["a" /* ProductosPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_relacionados_relacionados__["a" /* RelacionadosPage */],
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_23__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_24__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_camera__["a" /* Camera */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["ErrorHandler"], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_6__providers_wsapps_wsapps__["a" /* WsappsProvider */],
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_toast__["a" /* Toast */],
                __WEBPACK_IMPORTED_MODULE_5__providers_sql_sql__["a" /* SqlProvider */],
                __WEBPACK_IMPORTED_MODULE_5__providers_sql_sql__["a" /* SqlProvider */],
                __WEBPACK_IMPORTED_MODULE_5__providers_sql_sql__["a" /* SqlProvider */],
                __WEBPACK_IMPORTED_MODULE_5__providers_sql_sql__["a" /* SqlProvider */],
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 42:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetalleProductoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sql_sql__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__informacion_informacion__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pedido_pedido__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__relacionados_relacionados__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__productos_productos__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var DetalleProductoPage = (function () {
    function DetalleProductoPage(navCtrl, alertCtrl, navParams, sqlite, db, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.db = db;
        this.loadingCtrl = loadingCtrl;
        this.detalleProducto = [];
        this.Ingredientes = [];
        this.favorito = [];
        this.cantidad = 1;
        this.bandera = 0;
        this.idProducto = navParams.get('idProducto');
    }
    DetalleProductoPage.prototype.ionViewDidLoad = function () {
        this.SelectProducto();
        this.favorito = this.detalleProducto[0].FAVORITO;
    };
    DetalleProductoPage.prototype.ionViewDidEnter = function () {
        var loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: '<img src="assets/imgs/loading.gif" disabled>'
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 3000);
    };
    //MODIFICA CANTIDADES DE PIEZAS CON RESPECTO AL PRODUCTO
    DetalleProductoPage.prototype.addCantidad = function () {
        this.cantidad = this.cantidad + 1;
        if (this.cantidad == 10) {
            var alert_1 = this.alertCtrl.create({
                title: '',
                subTitle: 'Favor de verificar la cantidad',
                buttons: ['Aceptar']
            });
            alert_1.present();
        }
    };
    DetalleProductoPage.prototype.removeCantidad = function () {
        if (this.cantidad > 1) {
            this.cantidad = (this.cantidad - 1);
        }
    };
    //MODIFICA STATUS FAVORITOS
    DetalleProductoPage.prototype.addFavorito = function () {
        this.db.addFavorito(this.idProducto);
        this.SelectProducto();
    };
    DetalleProductoPage.prototype.removeFavorito = function () {
        this.db.removeFavorito(this.idProducto);
        this.SelectProducto();
    };
    ///AGREGA PRODUCTO A PEDIDO ACTUAL
    DetalleProductoPage.prototype.btnAgregarPedido = function (id, precio) {
        this.db.addPedido(id, this.cantidad, precio);
    };
    //FUNCION PARA CAMBIAR DE VENTANA A I PEDIDO VIGENTE
    DetalleProductoPage.prototype.Pedido = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__pedido_pedido__["a" /* PedidoPage */]);
    };
    //FUNCION PARA CONSULTAR SQLITE DETALLE DE PRODUCTO
    DetalleProductoPage.prototype.SelectProducto = function () {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var sql = "SELECT ID,NOMBRE,LINEA,PRECIO,DESCRIPCION,MODOUSO,CONTRAINDICACIONES,";
            sql += "img99x148 FROM Producto WHERE ID =?";
            db.executeSql(sql, [_this.idProducto])
                .then(function (res) {
                _this.detalleProducto = [];
                _this.detalleProducto.push({
                    ID: res.rows.item(0).ID,
                    NOMBRE: res.rows.item(0).NOMBRE,
                    LINEA: res.rows.item(0).LINEA,
                    PRECIO: res.rows.item(0).PRECIO.toFixed(2),
                    DESCRIPCION: res.rows.item(0).DESCRIPCION,
                    MODOUSO: res.rows.item(0).MODOUSO,
                    CONTRAINDICACIONES: res.rows.item(0).CONTRAINDICACIONES,
                    img99x148: res.rows.item(0).img99x148
                });
                if (res.rows.item(0).MODOUSO != "") {
                    _this.bandera = 1;
                }
            }).catch(function (e) { return console.log(e); });
            db.executeSql('SELECT * FROM Favorito WHERE FK_idProducto=?', [_this.idProducto])
                .then(function (res) {
                _this.favorito = [];
                _this.favorito.push({
                    FK_idProducto: res.rows.item(0).FK_idProducto
                });
            }).catch(function (e) { console.log(e); });
            var ingrediente = "SELECT I.ID, I.NOMBRE, I.img99x148 FROM Ingrediente I ";
            ingrediente += "INNER JOIN ProductoIngrediente P ON P.FK_idIngredeinte = I.ID ";
            ingrediente += "WHERE P.FK_idProducto=?";
            db.executeSql(ingrediente, [_this.idProducto])
                .then(function (res) {
                _this.Ingredientes = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.Ingredientes.push({
                        ID: res.rows.item(i).ID,
                        NOMBRE: res.rows.item(i).NOMBRE,
                        img99x148: res.rows.item(i).img99x148
                    });
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) { console.log(e); });
    };
    //ABRE VENTANA PARA LA INFORMACION
    DetalleProductoPage.prototype.openInformacion = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__informacion_informacion__["a" /* InformacionPage */], { idProducto: this.detalleProducto[0].ID,
            MODOUSO: this.detalleProducto[0].MODOUSO,
            CONTRAINDICACIONES: this.detalleProducto[0].CONTRAINDICACIONES });
    };
    DetalleProductoPage.prototype.relacion = function (id, nombre) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__relacionados_relacionados__["a" /* RelacionadosPage */], { tipo: "Ingrediente", id: id, nombre: nombre });
    };
    DetalleProductoPage.prototype.catalogo = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_7__productos_productos__["a" /* ProductosPage */]);
    };
    DetalleProductoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-detalle-producto',template:/*ion-inline-start:"/Users/Desarrollo/Desktop/apps/src/pages/detalle-producto/detalle-producto.html"*/'<ion-header>\n    <ion-navbar color="blue">\n        <table class="encabezado">\n            <tr>\n                <td width="20px" align="left">\n                    <button ion-button clear (click)="catalogo()">\n                        <ion-icon name="md-arrow-back" class="icono"></ion-icon>\n                    </button>\n                </td>\n                <td align="center">\n                    <label>Producto</label>\n                </td>\n                <td width="20px" align="right">\n                    <button ion-button clear (click)="Pedido()">\n                        <ion-icon name="md-cart" class="icono"></ion-icon>\n                    </button>\n                </td>\n            </tr>\n        </table>\n    </ion-navbar> \n</ion-header>\n\n<ion-content>\n    <ion-header class="imgheader">\n        <div *ngFor="let d of detalleProducto" padding align="center">\n            <img class="fav" src="assets/imgs/vacio.png" (click)= "addFavorito()">\n            <img class="fav" *ngIf="favorito != \'\'" src="assets/imgs/lleno.png" (click)= "removeFavorito()">\n            <img src="{{d.img99x148}}" width="40%" imageViewer>\n        </div>\n    </ion-header>\n    <ion-content>\n        <div>\n            <div class="divInicial" *ngFor="let d of detalleProducto">\n                <table>\n                    <tr>\n                        <td class="nombre" colspan="5">{{d.NOMBRE}}</td>\n                    </tr>\n                    <tr>\n                        <td class="marca" colspan="5">{{d.LINEA}}</td>\n                    </tr>\n                    <tr>\n                        <td colspan="5" class="codigoProducto">COD: {{d.ID}}</td>\n                    </tr>\n                    <tr>\n                        <td class="moneda">$</td>\n                        <td class="costo">{{d.PRECIO}}</td>\n                        <td class="btnCompra">\n                            <ion-icon name="remove-circle" color = "red"\n                            (click)="removeCantidad()"></ion-icon>\n                        </td>\n                        <td class="cantidad">{{cantidad}}</td>\n                        <td class="btnCompra">\n                            <ion-icon name="add-circle" color = "green"\n                            (click)="addCantidad()"></ion-icon>\n                        </td>\n                    </tr>\n                </table>\n                <button ion-button full clear color = "blen" class="btnAddPedido" \n                (click)="btnAgregarPedido(d.ID,d.PRECIO)">\n                    Agregar a pedido \n                    <ion-icon name="md-cart" padding-left = "1px"></ion-icon>\n                </button> \n            </div>\n            <div *ngFor="let d of detalleProducto">\n                <div class="descipcion">\n                    <p>DESCRIPCIÓN</p>\n                    {{d.DESCRIPCION}}\n                </div>\n            </div>\n            <br>\n            <div class="descipcion">\n                <p *ngIf="Ingredientes != \'\'">INGREDIENTES</p>\n                <ion-slides slidesPerView = "3">\n                    <div *ngFor="let i of Ingredientes">\n                        <ion-slide>\n                            <img src = "{{i.img99x148}}" (click)= "relacion(i.ID,i.NOMBRE)" class="Ingrediente">\n                            <p id="productoNombre">{{i.NOMBRE}}</p>\n                        </ion-slide>\n                    </div>\n                </ion-slides>\n            </div>\n        </div>\n        <div padding *ngIf="bandera == 1">\n            <button ion-button full clear color="blen" class="btnInformativo" (click)="openInformacion()">SABER MÁS</button>\n        </div>\n    </ion-content>\n</ion-content>\n'/*ion-inline-end:"/Users/Desarrollo/Desktop/apps/src/pages/detalle-producto/detalle-producto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_3__providers_sql_sql__["a" /* SqlProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], DetalleProductoPage);
    return DetalleProductoPage;
}());

//# sourceMappingURL=detalle-producto.js.map

/***/ }),

/***/ 420:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CondicionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_wsapps_wsapps__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__historial_pedido_historial_pedido__ = __webpack_require__(69);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CondicionesPage = (function () {
    function CondicionesPage(alertCtrl, navCtrl, navParams, sqlite, ws, modalCtrl) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.ws = ws;
        this.modalCtrl = modalCtrl;
        this.pedidoActual = [];
        this.pedido = [];
        this.bandera = 0;
    }
    CondicionesPage.prototype.ionViewDidLoad = function () {
        this.SelectPedidoActual();
        var f = new Date();
        this.anio = f.getFullYear();
    };
    CondicionesPage.prototype.aceptar = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: 'Una vez enviado tu pedido, no puede modificarse',
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    handler: function () {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Aceptar',
                    handler: function () {
                        _this.alias = "APP" + _this.usuario + _this.estacion + _this.anio;
                        _this.enviar();
                    }
                }
            ]
        });
        alert.present();
    };
    CondicionesPage.prototype.SelectPedidoActual = function () {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT ID,E1 FROM Usuario', {})
                .then(function (res) {
                _this.usuario = res.rows.item(0).ID;
                _this.estacion = res.rows.item(0).E1;
            }).catch(function (e) { console.log(e); });
            db.executeSql('SELECT ID FROM Vigencia_Catalogo', {})
                .then(function (res) {
                _this.catalogo = res.rows.item(0).ID;
            }).catch(function (e) { console.log(e); });
            var pedido = 'SELECT P.idProducto, ';
            pedido += 'CASE WHEN C.idLinea != 96 THEN 0 ELSE 1 END TIPO, ';
            pedido += 'P.CANTIDAD, P.PRECIO ';
            pedido += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
            pedido += 'WHERE P.idPedido = 0';
            db.executeSql(pedido, [])
                .then(function (res) {
                _this.pedidoActual = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.pedidoActual.push({
                        idProducto: res.rows.item(i).idProducto,
                        TIPO: res.rows.item(i).TIPO,
                        CANTIDAD: res.rows.item(i).CANTIDAD,
                        PRECIO: res.rows.item(i).PRECIO
                    });
                }
            }).catch(function (e) { return console.log(e); });
            var Totales = 'SELECT SUM(P.PRECIO*P.CANTIDAD) TOTAL, SUM(CANTIDAD) PIEZAS ';
            Totales += 'FROM Pedido_Detalle P INNER JOIN Producto C ON C.ID = P.idProducto ';
            Totales += 'WHERE P.idPedido = 0';
            db.executeSql(Totales, {})
                .then(function (res) {
                _this.TotalVenta = res.rows.item(0).TOTAL;
                _this.TotalPiezas = res.rows.item(0).PIEZAS;
            }).catch(function (e) { console.log(e); });
            var EncabezadoPedido = 'SELECT * FROM Pedido';
            db.executeSql(EncabezadoPedido, {})
                .then(function (res) {
                _this.pedido = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.pedido.push({
                        NOMBRE: res.rows.item(i).NOMBRE,
                        ESTACION: res.rows.item(i).ESTACION,
                        ANIO: res.rows.item(i).ANIO,
                        STATUS: res.rows.item(i).STATUS
                    });
                }
            }).catch(function (e) { console.log(e); });
        }).catch(function (e) { console.log(e); });
    };
    CondicionesPage.prototype.enviar = function () {
        var _this = this;
        this.ws.EncabezadoPedido(this.usuario, this.catalogo, this.estacion, this.TotalPiezas, this.TotalVenta).subscribe(function (res) {
            if (res[0].valido == "001") {
                var alert_1 = _this.alertCtrl.create({
                    subTitle: 'Comunicate con tu DMI',
                });
                alert_1.present();
                setTimeout(function () {
                    alert_1.dismiss();
                }, 2000);
                _this.navCtrl.pop();
            }
            else if (res[0].valido != _this.alias && res[0].valido != "001") {
                for (var i = 0; i < _this.pedidoActual.length; i++) {
                    _this.ws.DetallePedido(_this.usuario, _this.pedidoActual[i].idProducto, _this.pedidoActual[i].PRECIO, _this.pedidoActual[i].CANTIDAD, res[0].valido, _this.pedidoActual[i].TIPO).subscribe(function (ok) {
                        if (ok[0].valido == _this.TotalVenta) {
                            _this.bandera = 1;
                            var alert_2 = _this.alertCtrl.create({
                                subTitle: 'Tu pedio fue enviado con éxito',
                            });
                            alert_2.present();
                            setTimeout(function () {
                                alert_2.dismiss();
                            }, 1500);
                            _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__historial_pedido_historial_pedido__["a" /* HistorialPedidoPage */]);
                        }
                    });
                }
            }
            else if (res[0].valido == _this.alias) {
                var alert_3 = _this.alertCtrl.create({
                    subTitle: 'Tienes un pedido enviado con rstreo ' + '"' + res[0].valido + '"',
                });
                alert_3.present();
                setTimeout(function () {
                    alert_3.dismiss();
                }, 1500);
                _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__historial_pedido_historial_pedido__["a" /* HistorialPedidoPage */]);
            }
        });
    };
    CondicionesPage.prototype.ionViewWillLeave = function () {
        var _this = this;
        if (this.bandera == 1) {
            this.sqlite.create({
                name: 'dbBlenApp.db',
                location: 'default'
            }).then(function (db) {
                var pedido = 'SELECT P.idProducto ';
                pedido += 'FROM Pedido_Detalle P ';
                pedido += 'WHERE P.STATUS = 0 AND idPedido="0"';
                db.executeSql(pedido, [])
                    .then(function (res) {
                    _this.pedidoActual = [];
                    for (var i = 0; i < res.rows.length; i++) {
                        var sql = "UPDATE Pedido_Detalle SET idPedido=?, STATUS=? ";
                        sql += "WHERE STATUS=0 AND idProducto=?";
                        db.executeSql(sql, [_this.alias, 1, res.rows.item(i).idProducto])
                            .then(function (res) { console.log(res); }).catch(function (e) { console.log(e); });
                    }
                }).catch(function (e) { return console.log(e); });
            }).catch(function (e) { console.log(e); });
        }
    };
    CondicionesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Component"])({
            selector: 'page-condiciones',template:/*ion-inline-start:"/Users/Desarrollo/Desktop/apps/src/pages/condiciones/condiciones.html"*/'<!-- <ion-header>\n  <ion-navbar color="blue">\n    <table class="encabezado">\n      <tr>\n        <td width="20px" align="left">\n          <button ion-button menuToggle clear>\n            <ion-icon name="menu" class="icono"></ion-icon>\n          </button>\n        </td>\n        <td align="center">\n          <label>{{nombreVentana}}</label>\n        </td>\n        <td width="20px" align="right">\n          <button ion-button clear (click)="Productos()">\n            <ion-icon name="md-bookmarks" class="icono"></ion-icon>\n          </button>\n        </td>\n      </tr>\n    </table>\n  </ion-navbar> \n</ion-header> -->\n<ion-content padding class="encabezado">\n  <label>Términos y Condiciones</label>\n    <p>\n      Los Términos y Condiciones, también denominados como Condiciones \n      Generales de Uso, son un documento diseñado para aquellas personas \n      que van a crear o administrar una página o sitio web, en el cual se \n      establecen las condiciones bajo las cuales los usuarios ingresarán y harán \n      uso del sitio web.\n      El documento se encuentra diseñado para sitios que sean operados \n      o manejados por personas o empresas que tengan su domicilio en la \n      República Mexicana o que estén destinados a personas que habitan en \n      este país, no obstante, su contenido hace referencia a disposiciones \n      civiles comunes en la mayoría de los países del mundo.\n      Este documento es utilizado para regular las condiciones y reglas a las que se \n      someten tanto los usuarios de un sitio web como su propietario y/o administrador, \n      en lo referente al acceso y utilización del sitio web. De igual manera, hace \n      referencia a las políticas de privacidad, protección de datos personales, enlaces, etc., \n      que se tomarán para proteger la privacidad de los usuarios.\n      Dichas reglas y principios aportan un mayor nivel de confianza y seguridad \n      jurídica a los usuarios del sitio web así como a sus propietarios y/o administradores, \n      puesto que también se establece el tipo de personas a las que va dirigido y las \n      responsabilidades que estos adquieren al hacer uso del sitio o de los servicios \n      que en él son ofrecidos.\n      Existe además otro documento conocido generalmente como \n      "Condiciones Generales de Venta" que se utiliza para regular \n      la adquisición de productos o servicios a través de internet, \n      no obstante, este último no debe ser confundido con el presente documento, \n      puesto que el presente sólo se limita a regular el acceso, funcionamiento e \n      interacción del usuario con el sitio web, sin que se incluya las condiciones \n      bajo las cuales se formalizará la adquisición de productos o servicios que tengan \n      un costo o que requieran una licencia; y que se puedan obtener o adquirir a través \n      del mismo sitio web.\n    </p>\n  <ion-list>\n    <ion-item>\n      <ion-label #terminos>Acepto los Términos y Condiciones</ion-label>\n      <ion-checkbox [(ngModel)]="valida" (ionChange)="aceptar()" color="blen"></ion-checkbox>\n    </ion-item>\n  </ion-list>\n  <div *ngFor="let p of pedido">\n    <div>\n      {{p.NOMBRE}}\n      <br>\n      {{p.ESTACION}}\n      <br>\n      {{p.ANIO}}\n      <br>\n      {{p.STATUS}}\n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/Users/Desarrollo/Desktop/apps/src/pages/condiciones/condiciones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_3__providers_wsapps_wsapps__["a" /* WsappsProvider */],
            __WEBPACK_IMPORTED_MODULE_0_ionic_angular__["h" /* ModalController */]])
    ], CondicionesPage);
    return CondicionesPage;
}());

//# sourceMappingURL=condiciones.js.map

/***/ }),

/***/ 468:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 225,
	"./af.js": 225,
	"./ar": 226,
	"./ar-dz": 227,
	"./ar-dz.js": 227,
	"./ar-kw": 228,
	"./ar-kw.js": 228,
	"./ar-ly": 229,
	"./ar-ly.js": 229,
	"./ar-ma": 230,
	"./ar-ma.js": 230,
	"./ar-sa": 231,
	"./ar-sa.js": 231,
	"./ar-tn": 232,
	"./ar-tn.js": 232,
	"./ar.js": 226,
	"./az": 233,
	"./az.js": 233,
	"./be": 234,
	"./be.js": 234,
	"./bg": 235,
	"./bg.js": 235,
	"./bm": 236,
	"./bm.js": 236,
	"./bn": 237,
	"./bn.js": 237,
	"./bo": 238,
	"./bo.js": 238,
	"./br": 239,
	"./br.js": 239,
	"./bs": 240,
	"./bs.js": 240,
	"./ca": 241,
	"./ca.js": 241,
	"./cs": 242,
	"./cs.js": 242,
	"./cv": 243,
	"./cv.js": 243,
	"./cy": 244,
	"./cy.js": 244,
	"./da": 245,
	"./da.js": 245,
	"./de": 246,
	"./de-at": 247,
	"./de-at.js": 247,
	"./de-ch": 248,
	"./de-ch.js": 248,
	"./de.js": 246,
	"./dv": 249,
	"./dv.js": 249,
	"./el": 250,
	"./el.js": 250,
	"./en-au": 251,
	"./en-au.js": 251,
	"./en-ca": 252,
	"./en-ca.js": 252,
	"./en-gb": 253,
	"./en-gb.js": 253,
	"./en-ie": 254,
	"./en-ie.js": 254,
	"./en-il": 255,
	"./en-il.js": 255,
	"./en-nz": 256,
	"./en-nz.js": 256,
	"./eo": 257,
	"./eo.js": 257,
	"./es": 258,
	"./es-do": 259,
	"./es-do.js": 259,
	"./es-us": 260,
	"./es-us.js": 260,
	"./es.js": 258,
	"./et": 261,
	"./et.js": 261,
	"./eu": 262,
	"./eu.js": 262,
	"./fa": 263,
	"./fa.js": 263,
	"./fi": 264,
	"./fi.js": 264,
	"./fo": 265,
	"./fo.js": 265,
	"./fr": 266,
	"./fr-ca": 267,
	"./fr-ca.js": 267,
	"./fr-ch": 268,
	"./fr-ch.js": 268,
	"./fr.js": 266,
	"./fy": 269,
	"./fy.js": 269,
	"./gd": 270,
	"./gd.js": 270,
	"./gl": 271,
	"./gl.js": 271,
	"./gom-latn": 272,
	"./gom-latn.js": 272,
	"./gu": 273,
	"./gu.js": 273,
	"./he": 274,
	"./he.js": 274,
	"./hi": 275,
	"./hi.js": 275,
	"./hr": 276,
	"./hr.js": 276,
	"./hu": 277,
	"./hu.js": 277,
	"./hy-am": 278,
	"./hy-am.js": 278,
	"./id": 279,
	"./id.js": 279,
	"./is": 280,
	"./is.js": 280,
	"./it": 281,
	"./it.js": 281,
	"./ja": 282,
	"./ja.js": 282,
	"./jv": 283,
	"./jv.js": 283,
	"./ka": 284,
	"./ka.js": 284,
	"./kk": 285,
	"./kk.js": 285,
	"./km": 286,
	"./km.js": 286,
	"./kn": 287,
	"./kn.js": 287,
	"./ko": 288,
	"./ko.js": 288,
	"./ky": 289,
	"./ky.js": 289,
	"./lb": 290,
	"./lb.js": 290,
	"./lo": 291,
	"./lo.js": 291,
	"./lt": 292,
	"./lt.js": 292,
	"./lv": 293,
	"./lv.js": 293,
	"./me": 294,
	"./me.js": 294,
	"./mi": 295,
	"./mi.js": 295,
	"./mk": 296,
	"./mk.js": 296,
	"./ml": 297,
	"./ml.js": 297,
	"./mn": 298,
	"./mn.js": 298,
	"./mr": 299,
	"./mr.js": 299,
	"./ms": 300,
	"./ms-my": 301,
	"./ms-my.js": 301,
	"./ms.js": 300,
	"./mt": 302,
	"./mt.js": 302,
	"./my": 303,
	"./my.js": 303,
	"./nb": 304,
	"./nb.js": 304,
	"./ne": 305,
	"./ne.js": 305,
	"./nl": 306,
	"./nl-be": 307,
	"./nl-be.js": 307,
	"./nl.js": 306,
	"./nn": 308,
	"./nn.js": 308,
	"./pa-in": 309,
	"./pa-in.js": 309,
	"./pl": 310,
	"./pl.js": 310,
	"./pt": 311,
	"./pt-br": 312,
	"./pt-br.js": 312,
	"./pt.js": 311,
	"./ro": 313,
	"./ro.js": 313,
	"./ru": 314,
	"./ru.js": 314,
	"./sd": 315,
	"./sd.js": 315,
	"./se": 316,
	"./se.js": 316,
	"./si": 317,
	"./si.js": 317,
	"./sk": 318,
	"./sk.js": 318,
	"./sl": 319,
	"./sl.js": 319,
	"./sq": 320,
	"./sq.js": 320,
	"./sr": 321,
	"./sr-cyrl": 322,
	"./sr-cyrl.js": 322,
	"./sr.js": 321,
	"./ss": 323,
	"./ss.js": 323,
	"./sv": 324,
	"./sv.js": 324,
	"./sw": 325,
	"./sw.js": 325,
	"./ta": 326,
	"./ta.js": 326,
	"./te": 327,
	"./te.js": 327,
	"./tet": 328,
	"./tet.js": 328,
	"./tg": 329,
	"./tg.js": 329,
	"./th": 330,
	"./th.js": 330,
	"./tl-ph": 331,
	"./tl-ph.js": 331,
	"./tlh": 332,
	"./tlh.js": 332,
	"./tr": 333,
	"./tr.js": 333,
	"./tzl": 334,
	"./tzl.js": 334,
	"./tzm": 335,
	"./tzm-latn": 336,
	"./tzm-latn.js": 336,
	"./tzm.js": 335,
	"./ug-cn": 337,
	"./ug-cn.js": 337,
	"./uk": 338,
	"./uk.js": 338,
	"./ur": 339,
	"./ur.js": 339,
	"./uz": 340,
	"./uz-latn": 341,
	"./uz-latn.js": 341,
	"./uz.js": 340,
	"./vi": 342,
	"./vi.js": 342,
	"./x-pseudo": 343,
	"./x-pseudo.js": 343,
	"./yo": 344,
	"./yo.js": 344,
	"./zh-cn": 345,
	"./zh-cn.js": 345,
	"./zh-hk": 346,
	"./zh-hk.js": 346,
	"./zh-tw": 347,
	"./zh-tw.js": 347
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 468;

/***/ }),

/***/ 487:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(348);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(349);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_ayuda_ayuda__ = __webpack_require__(350);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_favoritos_favoritos__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_historial_pedido_historial_pedido__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_home_home__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_login_login__ = __webpack_require__(351);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_pedido_pedido__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_productos_productos__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_8__pages_login_login__["a" /* LoginPage */];
        this.datos = [];
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
        });
        //Datos de lo que tiene el menu
        this.pages = [
            { title: 'Perfil', component: __WEBPACK_IMPORTED_MODULE_7__pages_home_home__["a" /* HomePage */] },
            { title: 'Productos', component: __WEBPACK_IMPORTED_MODULE_10__pages_productos_productos__["a" /* ProductosPage */] },
            { title: 'Favoritos', component: __WEBPACK_IMPORTED_MODULE_5__pages_favoritos_favoritos__["a" /* FavoritosPage */] },
            { title: 'Pedido', component: __WEBPACK_IMPORTED_MODULE_9__pages_pedido_pedido__["a" /* PedidoPage */] },
            { title: 'Mis Pedidos', component: __WEBPACK_IMPORTED_MODULE_6__pages_historial_pedido_historial_pedido__["a" /* HistorialPedidoPage */] },
            { title: 'Ayuda', component: __WEBPACK_IMPORTED_MODULE_4__pages_ayuda_ayuda__["a" /* AyudaPage */] }
        ];
    }
    MyApp.prototype.openPage = function (page) {
        this.nav.setRoot(page.component);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* Nav */])
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({template:/*ion-inline-start:"/Users/Desarrollo/Desktop/apps/src/app/app.html"*/'<ion-menu [content]="content">\n  <ion-header >\n    <ion-navbar color="light">\n      <table class="encabezado">\n        <tr>\n          <td width="20px" align="left">\n            <button ion-button menuToggle>\n              <ion-icon name="menu" color="blen" class="icono"></ion-icon>\n            </button>\n          </td>\n          <td width="20px" align="right">\n            <button ion-button clear >\n              <ion-icon name="md-mail" color="blen" class="icono"></ion-icon>\n            </button>\n          </td>\n        </tr>\n      </table>\n    </ion-navbar>\n  </ion-header>\n    \n  <ion-content padding class="menu">\n    <img src="assets/imgs/blen-mini.png" width="10%">\n    <label>Menú</label>\n    <p menuClose *ngFor="let p of pages" (click)="openPage(p)">\n      <ion-icon name="radio-button-off" class="iconPunto"></ion-icon>\n      {{p.title}}\n    </p>\n    <ion-icon name="remove" class="visual"></ion-icon>\n  </ion-content>\n</ion-menu>\n<ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>\n'/*ion-inline-end:"/Users/Desarrollo/Desktop/apps/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 488:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComunicadosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_wsapps_wsapps__ = __webpack_require__(37);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ComunicadosPage = (function () {
    function ComunicadosPage(navCtrl, http, alertCtrl) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
    }
    //BTN DE BORRADO DE COMUNICADOS DE LAS PROMOTORAS
    ComunicadosPage.prototype.borrado = function (id) {
        //muestra el valor espesifico de lo que cliqueas
        var vista = this.comunicados.filter(function (e, i) { return e.id == id; })[0];
        var buscar = this.comunicados.indexOf(vista);
        var ultimo = this.comunicados.length;
        console.log(vista);
        console.log(buscar);
        console.log(ultimo);
    };
    //DETALLADO DE EL COMUNICADO EN ESPECIFICO
    ComunicadosPage.prototype.detalle = function (id) {
        var vista = this.comunicados.filter(function (e, i) { return e.id == id; })[0];
        var alert = this.alertCtrl.create({
            title: vista.linea,
            subTitle: 'Your frienddddddddddddddddddddddddddddddddddddddddd' +
                'd, Obi wan Kenobi, just accepted your friend request!',
            buttons: ['ACEPTAR']
        });
        alert.present();
    };
    ComunicadosPage.prototype.no = function (id) {
        var vista = this.comunicados.filter(function (e, i) { return e.id == id; })[0];
        var buscar = this.comunicados.indexOf(vista);
        var ultimo = this.comunicados.length;
        console.log(vista);
        console.log(buscar);
        console.log(ultimo);
    };
    ComunicadosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-comunicados',template:/*ion-inline-start:"/Users/Desarrollo/Desktop/apps/src/pages/comunicados/comunicados.html"*/'<ion-header>\n    <ion-navbar color = "blen">\n      <button ion-button menuToggle>\n        <ion-icon name="menu"></ion-icon>\n      </button>\n      <ion-title align = "center" >Comunicados</ion-title>\n    </ion-navbar>\n  </ion-header>\n\n\n<ion-content>\n  <ion-list name = "con" *ngFor="let com of comunicados">\n      <ion-item-sliding>\n        <ion-item>\n          <button ion-button clear class="btncominity" (click) = "detalle(com.id)">\n            <p>{{com.linea}}</p>\n          </button>\n        </ion-item>\n        <ion-item-options side="right">\n          <button ion-button color = "blen" (click) = "no(com.id)">\n            <ion-icon name="md-eye-off"></ion-icon>\n            NO LEÍDO\n          </button>\n          <button ion-button color="danger" (click) ="borrado(com.id)">\n            <ion-icon name="md-close"></ion-icon>\n            BORRAR\n          </button>\n        </ion-item-options>\n      </ion-item-sliding>\n    </ion-list>\n</ion-content>\n'/*ion-inline-end:"/Users/Desarrollo/Desktop/apps/src/pages/comunicados/comunicados.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_wsapps_wsapps__["a" /* WsappsProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]])
    ], ComunicadosPage);
    return ComunicadosPage;
}());

//# sourceMappingURL=comunicados.js.map

/***/ }),

/***/ 53:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProductosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_detalle_producto_detalle_producto__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_sql_sql__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pedido_pedido__ = __webpack_require__(27);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProductosPage = (function () {
    function ProductosPage(navCtrl, navParams, loadingCtrl, db, sqlite) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.db = db;
        this.sqlite = sqlite;
        this.Lineas = [];
        this.Productos = [];
        this.ProductoTop = [];
        this.ProductoNuevo = [];
        this.Bandera = 0;
    }
    ProductosPage.prototype.ionViewDidLoad = function () {
        var loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: '<img src="assets/imgs/loading.gif" disabled>'
        });
        setTimeout(function () {
            document.getElementById('ocultaCatalogo').style.display = "none";
        }, 2500);
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 3000);
    };
    ProductosPage.prototype.ionViewDidEnter = function () {
        this.Productos = this.db.Productos;
        this.Lineas = this.db.Lineas;
        this.ProductoNuevo = this.db.ProductoNuevo;
        this.ProductoTop = this.db.ProductoTop;
    };
    ProductosPage.prototype.detalle = function (id) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { idProducto: id });
    };
    ProductosPage.prototype.SelectData = function () {
        var _this = this;
        this.Productos = [];
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('SELECT ID,NOMBRE,idLinea,img99x148 FROM Producto WHERE NUEVO = 1', {})
                .then(function (res) {
                _this.ProductoNuevo = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.ProductoNuevo.push({
                        ID: res.rows.item(i).ID,
                        NOMBRE: res.rows.item(i).NOMBRE,
                        idLinea: res.rows.item(i).idLinea,
                        img99x148: res.rows.item(i).img99x148
                    });
                }
            }).catch(function (e) { return console.log(e); });
            var topProducto = "SELECT P.ID,P.NOMBRE,P.idLinea,P.img99x148 FROM Producto P ";
            topProducto += "INNER JOIN Top T ON T.FK_idProducto = P.ID";
            db.executeSql(topProducto, {})
                .then(function (res) {
                _this.ProductoTop = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.ProductoTop.push({
                        ID: res.rows.item(i).ID,
                        NOMBRE: res.rows.item(i).NOMBRE,
                        idLinea: res.rows.item(i).idLinea,
                        img99x148: res.rows.item(i).img99x148
                    });
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) { console.log(e); });
    };
    ProductosPage.prototype.Pedido = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__pedido_pedido__["a" /* PedidoPage */]);
    };
    ProductosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-productos',template:/*ion-inline-start:"/Users/Desarrollo/Desktop/apps/src/pages/productos/productos.html"*/'<ion-header>\n    <ion-navbar color="blue">\n      <table class="encabezado">\n        <tr>\n          <td width="20px" align="left">\n            <button ion-button menuToggle clear>\n              <ion-icon name="menu" class="icono"></ion-icon>\n            </button>\n          </td>\n          <td align="center">\n            <label>Productos</label>\n          </td>\n          <td width="20px" align="right">\n            <button ion-button clear (click)="Pedido()">\n              <ion-icon name="md-cart" class="icono"></ion-icon>\n            </button>\n          </td>\n        </tr>\n      </table>\n    </ion-navbar> \n</ion-header>\n    \n<ion-content>\n    <div>\n        <p>Producto Nuevos</p>\n        <ion-slides slidesPerView = "3">\n            <div *ngFor="let pn of ProductoNuevo">\n                <ion-slide>\n                    <img src = "{{pn.img99x148}}" (click)= "detalle(pn.ID)" class="productoIMG">\n                    <p id="productoNombre">{{pn.NOMBRE}}</p>\n                </ion-slide>\n            </div>\n        </ion-slides>\n    </div>\n    <div *ngFor="let l of Lineas">\n        <p>{{l.LINEA}}</p>\n        <ion-slides slidesPerView = "3">\n            <div *ngFor="let p of Productos">\n                <div *ngIf="p.idLinea == l.idLinea">\n                    <ion-slide>\n                        <img src = "{{p.img99x148}}" (click)= "detalle(p.ID)" class="productoIMG">\n                        <p id="productoNombre">{{p.NOMBRE}}</p>\n                    </ion-slide>\n                </div>\n            </div>\n        </ion-slides>\n    </div>\n    <div>\n        <p>Tus 10 productos mas comprados</p>\n        <ion-slides slidesPerView = "3">\n            <div *ngFor="let t of ProductoTop">\n                <ion-slide>\n                    <img src = "{{t.img99x148}}" (click)= "detalle(t.ID)" class="productoIMG">\n                    <p id="productoNombre">{{t.NOMBRE}}</p>\n                </ion-slide>\n            </div>\n        </ion-slides>\n    </div>\n    <div id="ocultaCatalogo" disable></div>\n</ion-content>\n\n'/*ion-inline-end:"/Users/Desarrollo/Desktop/apps/src/pages/productos/productos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_sql_sql__["a" /* SqlProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */]])
    ], ProductosPage);
    return ProductosPage;
}());

//# sourceMappingURL=productos.js.map

/***/ }),

/***/ 68:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RelacionadosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detalle_producto_detalle_producto__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__productos_productos__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RelacionadosPage = (function () {
    function RelacionadosPage(navCtrl, navParams, sqlite) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.data = [];
        this.Tipo = navParams.get('tipo');
        this.id = navParams.get('id');
        this.nombre = navParams.get('nombre');
    }
    RelacionadosPage.prototype.ionViewDidLoad = function () {
        this.Select();
    };
    RelacionadosPage.prototype.Select = function () {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            if (_this.Tipo == "Enfermedad") {
                var sql = "SELECT P.ID, P.NOMBRE, P.img99x148 FROM Producto P ";
                sql += "INNER JOIN ProductoEnfermedad E ON E.FK_idProducto = P.ID ",
                    sql += "WHERE FK_idEnfermedad=?";
                db.executeSql(sql, [_this.id])
                    .then(function (res) {
                    _this.data = [];
                    for (var i = 0; i < res.rows.length; i++) {
                        _this.data.push({
                            ID: res.rows.item(i).ID,
                            NOMBRE: res.rows.item(i).NOMBRE,
                            img99x148: res.rows.item(i).img99x148,
                        });
                    }
                }).catch(function (e) { return console.log(e); });
            }
            else if (_this.Tipo == "Ingrediente") {
                var sql = "SELECT P.ID, P.NOMBRE, P.img99x148 FROM Producto P ";
                sql += "INNER JOIN ProductoIngrediente I ON I.FK_idProducto = P.ID ";
                sql += "WHERE FK_idIngredeinte=?";
                db.executeSql(sql, [_this.id])
                    .then(function (res) {
                    _this.data = [];
                    for (var i = 0; i < res.rows.length; i++) {
                        _this.data.push({
                            ID: res.rows.item(i).ID,
                            NOMBRE: res.rows.item(i).NOMBRE,
                            img99x148: res.rows.item(i).img99x148,
                        });
                    }
                }).catch(function (e) { return console.log(e); });
            }
        }).catch(function (e) { console.log(e); });
    };
    RelacionadosPage.prototype.detalle = function (id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detalle_producto_detalle_producto__["a" /* DetalleProductoPage */], { idProducto: id });
    };
    RelacionadosPage.prototype.productos = function () {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__productos_productos__["a" /* ProductosPage */]);
    };
    RelacionadosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-relacionados',template:/*ion-inline-start:"/Users/Desarrollo/Desktop/apps/src/pages/relacionados/relacionados.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <table class="encabezado">\n      <tr>\n        <td width="20px" align="left">\n          <button ion-button menuToggle clear>\n            <ion-icon name="menu" class="icono"></ion-icon>\n          </button>\n        </td>\n        <td align="center">\n          <label>Otros Productos</label>\n        </td>\n        <td width="20px" align="right">\n          <button ion-button clear (click)="productos()">\n            <ion-icon name="md-book" class="icono"></ion-icon>\n          </button>\n        </td>\n      </tr>\n    </table>\n  </ion-navbar> \n</ion-header>\n\n<ion-content padding>\n  <p id="etiqueta" *ngIf="Tipo == \'Enfermedad\'">Para: {{nombre}}</p>\n  <p id="etiqueta" *ngIf="Tipo == \'Ingrediente\'">Con: {{nombre}}</p>\n<ion-grid>\n  <ion-row>\n    <ion-col col-6 col-md-4 col-xl-3 *ngFor="let d of data">\n      <img src="{{d.img99x148}}" (click)= "detalle(d.ID)">\n      <p id="productoNombre">{{d.NOMBRE}}</p>\n    </ion-col>\n  </ion-row>\n</ion-grid>\n</ion-content>\n'/*ion-inline-end:"/Users/Desarrollo/Desktop/apps/src/pages/relacionados/relacionados.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */]])
    ], RelacionadosPage);
    return RelacionadosPage;
}());

//# sourceMappingURL=relacionados.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HistorialPedidoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mostrar_pedido_mostrar_pedido__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__productos_productos__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var HistorialPedidoPage = (function () {
    function HistorialPedidoPage(navCtrl, navParams, sqlite, toast, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.sqlite = sqlite;
        this.toast = toast;
        this.loadingCtrl = loadingCtrl;
        this.pedidos = [];
        this.nombreVentana = "Mis Pedidos";
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
    HistorialPedidoPage.prototype.ionViewDidLoad = function () {
        this.SelectPedidos();
    };
    HistorialPedidoPage.prototype.SelectPedidos = function () {
        var _this = this;
        this.sqlite.create({
            name: 'dbBlenApp.db',
            location: 'default'
        }).then(function (db) {
            var sql = "SELECT P.idPedido, P.STATUS, substr(P.idPedido,-4) ANIO, ";
            sql += "substr(P.idPedido,-6,2) ESTACION, ";
            sql += "SUM((P.PRECIO*P.CANTIDAD)) TOTAL, SUM((P.CANTIDAD)) PIEZAS ";
            sql += "FROM Pedido_Detalle P WHERE P.STATUS > 0 ";
            sql += "GROUP BY P.idPedido, P.STATUS";
            db.executeSql(sql, [])
                .then(function (res) {
                _this.pedidos = [];
                for (var i = 0; i < res.rows.length; i++) {
                    _this.pedidos.push({
                        idPedido: res.rows.item(i).idPedido,
                        ESTACION: "Estación: " + res.rows.item(i).ESTACION + " - " + res.rows.item(i).ANIO,
                        STATUS: res.rows.item(i).STATUS,
                        TOTAL: new Intl.NumberFormat().format(res.rows.item(0).TOTAL),
                        PIEZAS: res.rows.item(i).PIEZAS + " artículos"
                    });
                }
            }).catch(function (e) { return console.log(e); });
        }).catch(function (e) { console.log(e); });
    };
    HistorialPedidoPage.prototype.ver = function (referencia) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__mostrar_pedido_mostrar_pedido__["a" /* MostrarPedidoPage */], { alias: referencia });
    };
    HistorialPedidoPage.prototype.detalle = function (pedido) {
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_4__mostrar_pedido_mostrar_pedido__["a" /* MostrarPedidoPage */], { alias: pedido });
    };
    HistorialPedidoPage.prototype.Productos = function () {
        this.pedidos = [];
        this.nombreVentana = "Productos";
        this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__productos_productos__["a" /* ProductosPage */]);
    };
    HistorialPedidoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'page-historial-pedido',template:/*ion-inline-start:"/Users/Desarrollo/Desktop/apps/src/pages/historial-pedido/historial-pedido.html"*/'<ion-header>\n  <ion-navbar color="blue">\n    <table class="encabezado">\n      <tr>\n        <td width="20px" align="left">\n          <button ion-button menuToggle clear>\n            <ion-icon name="menu" class="icono"></ion-icon>\n          </button>\n        </td>\n        <td align="center">\n          <label>{{nombreVentana}}</label>\n        </td>\n        <td width="20px" align="right">\n          <button ion-button clear (click)="Productos()">\n            <ion-icon name="md-bookmarks" class="icono"></ion-icon>\n          </button>\n        </td>\n      </tr>\n    </table>\n  </ion-navbar> \n</ion-header>\n<ion-content>\n  <div *ngFor="let p of pedidos" padding>\n    <button class="btnPedido">\n      <table class="tablaPedidos" (click) = "detalle(p.idPedido)">\n        <tr class="titulo" width="45%">\n          <td align="left">{{p.idPedido}}</td>\n          <td class="color" width="30%">${{p.TOTAL}}</td>\n          <td width="25%" rowspan="2" align="center" class="status">\n            <ion-icon name="paper-plane"  *ngIf="p.STATUS == 1" class="gris"></ion-icon>\n            <ion-icon name="md-done-all" *ngIf="p.STATUS == 2" class="aceptado"></ion-icon>\n            <ion-icon name="md-bus" *ngIf="p.STATUS == 3" class="embarcado"></ion-icon>\n            <img src="assets/imgs/blen-mini.png" width="35%"  *ngIf="p.STATUS == 4">\n            <ion-icon name="md-close-circle" *ngIf="p.STATUS == 5" class="rechazado"></ion-icon>\n            <ion-icon name="md-warning" *ngIf="p.STATUS == 6" class="noEnviaado"></ion-icon>\n            <br>\n            <label *ngIf="p.STATUS == 1">Enviado</label>\n            <label *ngIf="p.STATUS == 2">Autorizado</label>\n            <label *ngIf="p.STATUS == 3">Embarcado</label>\n            <label *ngIf="p.STATUS == 4">Entregado</label>\n            <label *ngIf="p.STATUS == 5">Rechazado</label>\n            <label *ngIf="p.STATUS == 6">No Enviado</label>\n          </td>\n        </tr>\n        <tr>\n          <td align="left">{{p.ESTACION}}</td>\n          <td class="color">{{p.PIEZAS}}</td>\n        </tr>\n      </table>\n    </button>\n  </div>\n  <!-- <div class="bloqueo" id="bloqueo" disabled>\n    <img src="assets/imgs/loading.gif" disabled>\n  </div> -->\n</ion-content>\n'/*ion-inline-end:"/Users/Desarrollo/Desktop/apps/src/pages/historial-pedido/historial-pedido.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */]])
    ], HistorialPedidoPage);
    return HistorialPedidoPage;
}());

//# sourceMappingURL=historial-pedido.js.map

/***/ })

},[352]);
//# sourceMappingURL=main.js.map