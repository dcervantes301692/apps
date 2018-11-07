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
 
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;
  datos: any = [];
  x;

  constructor(public platform: Platform,
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,) {

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
      { title: 'Ayuda', component: AyudaPage }
    ];
  }

  openPage(page) {
    this.nav.setRoot( page.component );
  }
}
