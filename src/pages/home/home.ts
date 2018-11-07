import { Component } from '@angular/core';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { WsappsProvider } from '../../providers/wsapps/wsapps';
import { PedidoPage } from '../../pages/pedido/pedido';
import { MenuController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { SqlProvider } from '../../providers/sql/sql';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  Usuario: any = [];
  Foto: any = [];
  PromocionesFlayer: any = [];
  venta1;
  venta2;
  venta3;
  venta4;
  venta_total;
  estacion = 0;
  proximoPedido;
  //ventas = [1,2,3,4];

  base64Image: string;



  public lineChartColors:Array<any> = [{
    borderColor: '#CCCCCC',//Linea de la graficado
    pointBackgroundColor: '#009999', //Puntos de graficado
    pointBorderColor: '#009999', //Contorno de puntos
  },];
  public lineChartLegend:boolean = true;
  public lineChartType:string = 'line';
  public lineChartData:Array<any>;
  public lineChartLabels:Array<any>

 constructor(public navCtrl: NavController,
    public navParams: NavParams, 
    public http: WsappsProvider,
    public db: SqlProvider,
    public menu: MenuController,
    public alertCtrl: AlertController,
    private sqlite: SQLite,
    private toast: Toast,
    private camera: Camera,
    public loadingCtrl: LoadingController){
      this.menu.enable(true);
      this.lineChartData = [{data: [0,0,0,0], label: '$ ' + 0}];
      this.lineChartLabels = ["","","",""];
      this.SelectData();
  }
  ionViewDidEnter(){
    let loading = this.loadingCtrl.create({
      //content: 'Espera un momento...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
      this.lineChartData = [{data: [
        this.venta4.toFixed(2),
        this.venta3.toFixed(2),
        this.venta2.toFixed(2),
        this.venta1.toFixed(2)], 
        label: '$ ' + this.venta_total.toFixed(2)}];
    }, 2000);

    setTimeout(() => {
      this.db.Catalogo();
    }, 3000);
  }
  //EVENTO QUE MANDA LLAMAR LA VENTANA DE PEDIDO
  Pedido(){
    this.navCtrl.setRoot( PedidoPage );
  }
  //EVENTO DE FOTO PARA PERFIL
  capturar() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 70,
      targetHeight: 70,
      quality: 100
    }
    this.camera.getPicture( options )
    .then(imageData => {
      this.sqlite.create({
        name: 'dbBlenApp.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        db.executeSql('UPDATE Usuario SET FOTO=? WHERE ID=?',[imageData,this.Usuario[0].ID])
        .then(res => { console.log(res); }).catch(e => { console.log(e); });

        db.executeSql('SELECT FOTO FROM Usuario WHERE FOTO IS NOT NULL',{})
        .then(res => {
          this.Foto = [];
          this.Foto.push({
            FOTO: res.rows.item(0).FOTO
          });
          this.base64Image = 'data:image/jpeg;base64,' + this.Foto[0].FOTO;
        }).catch(e => { console.log(e); });
      }).catch(e => { console.log(e); });
    })
    .catch(error =>{
      console.error( error );
    });
  }
  SelectData(){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('SELECT FOTO FROM Usuario WHERE FOTO IS NOT NULL',{})
        .then(res => {
          this.Foto = [];
          this.Foto.push({
            FOTO: res.rows.item(0).FOTO
          });
          this.base64Image = 'data:image/jpeg;base64,' + this.Foto[0].FOTO;
        }).catch(e => { console.log(e); });

      let sqlUsuario = 'SELECT ID,NOMBRE,DMI,ULTIMA_VENTA,PENULTIMA_VENTA,';
      sqlUsuario += 'ANTE_PENULTIMA_VENTA,ANTE_ANTE_PENULTIMA_VENTA,';
      sqlUsuario += '(ULTIMA_VENTA+PENULTIMA_VENTA+ANTE_PENULTIMA_VENTA+ANTE_ANTE_PENULTIMA_VENTA)';
      sqlUsuario += 'TOTAL_VENTA,E1,E2,E3,E4,VIGENCIAPERFIL,PUNTOS,FOTO FROM Usuario';
      db.executeSql(sqlUsuario, {})
        .then(res => {
          this.lineChartLabels = [res.rows.item(0).E4,
            res.rows.item(0).E3,res.rows.item(0).E2,res.rows.item(0).E1];

          this.Usuario = [];
            this.Usuario.push({
              ID: "Código: " + res.rows.item(0).ID,
              NOMBRE: res.rows.item(0).NOMBRE,
              DMI: res.rows.item(0).DMI,
              VIGENCIAPERFIL: res.rows.item(0).VIGENCIAPERFIL,
              PUNTOS: new Intl.NumberFormat().format(res.rows.item(0).PUNTOS)
            });

            this.venta1 = res.rows.item(0).ULTIMA_VENTA;
            this.venta2 = res.rows.item(0).PENULTIMA_VENTA;
            this.venta3 = res.rows.item(0).ANTE_PENULTIMA_VENTA;
            this.venta4 = res.rows.item(0).ANTE_ANTE_PENULTIMA_VENTA;
            this.venta_total = res.rows.item(0).TOTAL_VENTA;
        }).catch(e => console.log(e));

      let sqlFlayer = 'SELECT ID,IMGFLAYER FROM Flayer ORDER BY ID';
      db.executeSql(sqlFlayer, {})
        .then(res => {
          this.PromocionesFlayer = [];
          for(var i = 0; i < res.rows.length; i++) {
            this.PromocionesFlayer.push({
              ID: res.rows.item(i).ID,
              IMGFLAYER: res.rows.item(i).IMGFLAYER
            })
          }
        }).catch(e => console.log(e)); 

      let sqlFechas = "SELECT (julianday(VIGENCIAPERFIL) - julianday('now')) pedido, ";
      sqlFechas += "(julianday(Date(julianday(VIGENCIAPERFIL)+15)) - julianday('now')) prox ";
      sqlFechas += "FROM Usuario";
      db.executeSql(sqlFechas,{})
      .then(res => {
        if (res.rows.item(0).pedido == 0){
          this.proximoPedido = "Debes enviar tu pedido antes de la 01:00 pm, ";
          this.proximoPedido += "para que sea procesado.";
        }
        else if (res.rows.item(0).pedido > 1){ 
          this.proximoPedido = "Faltan " + parseInt(res.rows.item(0).pedido);
          this.proximoPedido += " días para enviar tu pedido.";
        }
        else if (res.rows.item(0).pedido == 1){
          this.proximoPedido = "Faltan " + parseInt(res.rows.item(0).pedido); 
          this.proximoPedido += " día para enviar tu pedido.";
        }
        else if (res.rows.item(0).pedido < 0){
          this.proximoPedido = " Faltan " + parseInt(res.rows.item(0).prox);
          this.proximoPedido += " para tu siguiente pedido.";
        }
      }).catch(e => { console.log(e); });      
    }).catch(e => { console.log(e); });
  }
}
