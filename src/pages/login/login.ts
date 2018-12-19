import { Component} from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { AlertController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { MenuController } from 'ionic-angular';
import { SqlProvider } from '../../providers/sql/sql';
import { WsappsProvider } from '../../providers/wsapps/wsapps';
import { DesarrolloProvider } from '../../providers/desarrollo/desarrollo';

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
  prmociones;

  constructor(
    public navCtrl: NavController,
    public db: SqlProvider,
    private ws: WsappsProvider,
    public alertCtrl: AlertController,
    public menu: MenuController,
    public loadingCtrl: LoadingController,
    private network: Network,
    private d: DesarrolloProvider) { 
      this.menu.enable(false); }


  ionViewDidLoad(){
    this.wsApp();
  }
  //EVENTO DE BOTON ENTRAR PARA VALIDES DE USUARIO
  submit(){
    if (this.user != "" && this.pass !=""){
      this.ws.getLogin(this.user,this.pass).subscribe(login => {
        if (login == null){
          let alert = this.alertCtrl.create({
            subTitle: 'Información incorrecta intena nuevamente',
          });
          alert.present(); 
          setTimeout(() => {
            alert.dismiss();
          }, 2000);     
        }
        else{
          if (login[0].status == 1){
            this.ws.getProductoTop(login[0].id).subscribe( Top => {
              this.db.IngresaData(login, this.vigenciaCatalogo, this.producto, 
                this.flayer, this.ingrediente, this.productoIngrediente, 
                Top, this.enfermedad, this.productoEnfermedad, this.casos, this.prmociones);
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
              subTitle: 'Cominicate con tu DMI',
            });
            alert.present(); 
            setTimeout(() => {
              alert.dismiss();
            }, 2000);
          }
        }
      });
    }
    else {
      let alert = this.alertCtrl.create({
        subTitle: 'Completa los datos',
      });
      alert.present(); 
      setTimeout(() => {
        alert.dismiss();
      }, 2000);
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

    this.ws.Promos().subscribe( promo => {
      this.prmociones = promo
    })
  }

  ionViewWillLeave(){
    this.db.Catalogo();
  }

  desarrollador(){
    this.bandera ++;
    if (this.bandera == 50){
      this.bandera = 0;
      this.d.ocultar();
    }
  }
}
