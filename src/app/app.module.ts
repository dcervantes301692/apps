import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { SqlProvider } from '../providers/sql/sql';
import { WsappsProvider } from '../providers/wsapps/wsapps';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';

//pantallas
import { AyudaPage } from '../pages/ayuda/ayuda';
import { ComunicadosPage } from '../pages/comunicados/comunicados';
import { DetalleProductoPage } from '../pages/detalle-producto/detalle-producto';
import { FavoritosPage } from '../pages/favoritos/favoritos';
import { InformacionPage } from '../pages/informacion/informacion';
import { HistorialPedidoPage } from '../pages/historial-pedido/historial-pedido';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MostrarPedidoPage } from '../pages/mostrar-pedido/mostrar-pedido';
import { PedidoPage} from '../pages/pedido/pedido';
import { ProductosPage } from '../pages/productos/productos';
import { RelacionadosPage } from '../pages/relacionados/relacionados';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    MyApp,
    AyudaPage,
    ComunicadosPage,
    DetalleProductoPage,
    FavoritosPage,
    InformacionPage,
    HistorialPedidoPage,
    HomePage,
    LoginPage,
    MostrarPedidoPage,
    PedidoPage,
    ProductosPage,
    RelacionadosPage,
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AyudaPage,
    ComunicadosPage,
    DetalleProductoPage,
    FavoritosPage,
    InformacionPage,
    HistorialPedidoPage,
    HomePage,
    LoginPage,
    MostrarPedidoPage,
    PedidoPage,
    ProductosPage,
    RelacionadosPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WsappsProvider,
    SQLite,
    Toast,
    SqlProvider,
    SqlProvider,
    SqlProvider,
    SqlProvider,
  ]
})
export class AppModule {}
