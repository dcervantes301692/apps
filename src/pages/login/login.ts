import { Component} from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { SqlProvider } from '../../providers/sql/sql';
import { WsappsProvider } from '../../providers/wsapps/wsapps';

@Component({
 templateUrl: 'login.html',
})
export class LoginPage {

  //variables para log
  user = ""//"82272";
  pass = "";//"BLEN82272563";
  bandera = 0;
  vigenciaCatalogo;
  producto;
  flayer;
  ingrediente;
  productoIngrediente;
  enfermedad;
  productoEnfermedad;
  casos;

  constructor(
    public navCtrl: NavController,
    public db: SqlProvider,
    private ws: WsappsProvider,
    public alertCtrl: AlertController,
    public menu: MenuController,
    private sqlite: SQLite,
    private toast: Toast,
    public loadingCtrl: LoadingController) { this.menu.enable(false); }


  ionViewDidLoad(){
    this.wsApp();
  }
  //EVENTO DE BOTON ENTRAR PARA VALIDES DE USUARIO
  submit(){
    if (this.user != "" && this.pass !=""){
      this.ws.getLogin(this.user,this.pass).subscribe(login => {
        if (login[0].status == 1){
          this.ws.getProductoTop(login[0].id).subscribe( Top => {
            this.db.IngresaData(login, this.vigenciaCatalogo, this.producto, 
              this.flayer, this.ingrediente, this.productoIngrediente, 
              Top, this.enfermedad, this.productoEnfermedad, this.casos);
          let loading = this.loadingCtrl.create({
            content: 'Descargando Complementos...'
          });
        
          loading.present();
        
          setTimeout(() => {
            loading.dismiss();
            this.navCtrl.setRoot( HomePage );
          }, 60000);
          });
        }
        else{
          let alert = this.alertCtrl.create({
            title: '',
            subTitle: 'Cominicate con tu DMI',
            buttons: ['Aceptar']
          });
          alert.present();
        }
      });
    }
    else {
      let alert = this.alertCtrl.create({
        title: 'Error 028',
        subTitle: 'Ingresa Datos',
        buttons: ['Aceptar']
      });
      alert.present();
    } 
  }

  wsApp(){
    this.ws.getVigenciaCatalogo().subscribe( VigenviaCatalogo => {
      this.vigenciaCatalogo = VigenviaCatalogo;
    });

    this.ws.getProducto().subscribe( Producto => {
      this.producto = Producto;
    });

    this.ws.getPromocionFlayer().subscribe( Flayer => {
      this.flayer = Flayer;
    });

    this.ws.getIngrediente().subscribe( Ingrediente => {
      this.ingrediente = Ingrediente;
    });

    this.ws.getProductoIngrediente().subscribe( ProductoIngrediente => {
      this.productoIngrediente = ProductoIngrediente;
    });

    this.ws.getEnfermedad().subscribe( Enfermedad => {
      this.enfermedad = Enfermedad;
    });

    this.ws.getProductoEnfermedad().subscribe( ProductoEnfermedad => {
      this.productoEnfermedad = ProductoEnfermedad;
    });

    this.ws.CasosApoyo().subscribe( Casos => {
      this.casos = Casos;
    })
  }

  ionViewWillLeave(){
    this.db.Catalogo();
  }

  desarrollador(){
    this.bandera ++;
    if (this.bandera == 20){
      alert("Diego Osvaldo Cervantes Guzman");
      this.bandera = 0;
    }
  }
}
