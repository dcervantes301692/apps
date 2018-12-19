import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AyudaPage } from '../pages/ayuda/ayuda';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { HistorialPedidoPage } from '../pages/historial-pedido/historial-pedido';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { PedidoPage } from '../pages/pedido/pedido';
import { ProductosPage} from '../pages/productos/productos';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
 
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;
  datos: any = [];
  x;

  constructor(public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    private sqlite: SQLite) {
      this.vigencia();

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    //Datos de lo que tiene el menu
    this.pages = [
      { title: 'Perfil', component: HomePage },
      { title: 'Productos', component: ProductosPage },
      { title: 'Favoritos', component: FavoritosPage },
      { title: 'Pedido', component: PedidoPage },
      { title: 'Mis Pedidos', component: HistorialPedidoPage },
      { title: 'Atención a Cliente', component: AyudaPage },
    ];
  }
  openPage(page) {
    this.nav.setRoot( page.component );
  }

  vigencia(){
    this.rootPage = LoginPage;
   this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let sqlFecha = "SELECT  Date(julianday(VIGENCIAESTACION)+1) vigencia, ";
      sqlFecha += "Date(julianday('now')) hoy ";
      sqlFecha += "FROM Usuario";
      db.executeSql(sqlFecha,{})
      .then(res => {
        if (res.rows.item(0).hoy != res.rows.item(0).vigencia){
          this.rootPage = HomePage;
        }
        else{
          this.rootPage = LoginPage;
        }
      }).catch(e => { console.log(e);
        this.rootPage = LoginPage;
      });
    }).catch(e => { console.log(e); });
  }
}
