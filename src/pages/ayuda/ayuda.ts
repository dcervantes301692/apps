import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WsappsProvider } from '../../providers/wsapps/wsapps';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AlertController } from 'ionic-angular';
import * as $ from "jquery";

@Component({
  selector: 'page-ayuda',
  templateUrl: 'ayuda.html',
})
export class AyudaPage {
  Dep: any = [];
  tematica: any = [];
  base64Image: string;
  selectDepto: string  = '0';
  opcionSeleccionado: string  = '0';
  mensaje = "";
  titulo = "";
  usuario;
  idCategoria="";
  idSubCategoria="";
  FolioTicket;
  constructor(
    public navCtrl: NavController,
    public http: WsappsProvider,
    private camera: Camera,
    private sqlite: SQLite,
    public alertCtrl: AlertController) {
    $(document).ready(function(){
      document.getElementById('contador').innerHTML = "0/500";
      document.getElementById('contadorTitulo').innerHTML = "0/100";
      $('#mensaje').keyup(function(){
        var limit   = $(this).attr("maxlength"); // Límite del textarea
        var value   = $(this).val();             // Valor actual del textarea
        var current = value.length;              // Número de caracteres actual
        if (limit < current) {                   // Más del límite de caracteres?
        // Establece el valor del textarea al límite
        $(this).val(value.substring(0, limit));
        }
        else{
          document.getElementById('contador').innerHTML = current + "/500";
        }
      });
      $('#titulo').keyup(function(){
        var limit   = $(this).attr("maxlength"); // Límite del textarea
        var value   = $(this).val();             // Valor actual del textarea
        var current = value.length;              // Número de caracteres actual
        if (limit < current) {                   // Más del límite de caracteres?
        // Establece el valor del textarea al límite
        $(this).val(value.substring(0, limit));
        }
        else{
          document.getElementById('contadorTitulo').innerHTML = current + "/10";
        }
      });
    });
  }
  ionViewDidLoad(){
    this.Departamento();
  }
  Departamento(){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let sql = 'SELECT CATEGORIA FROM CasosAyuda GROUP BY CATEGORIA ORDER BY idCategoria';
      db.executeSql(sql,{})
      .then(res => {
        this.Dep = [];
        for(var i=0; i<res.rows.length; i++){
          this.Dep.push({
            CATEGORIA:res.rows.item(i).CATEGORIA
          });
        }
      }).catch(e => {console.log(e); });

      let sqlsub = 'SELECT SUBCATEGORIA FROM CasosAyuda WHERE idSubCategoria = 0';
      db.executeSql(sqlsub,{})
      .then(res => {
        this.tematica = [];
        for(var i=0; i<res.rows.length; i++){
          this.tematica.push({
            SUBCATEGORIA:res.rows.item(i).SUBCATEGORIA
          });
        }
      }).catch(e => {console.log(e); });

      db.executeSql('SELECT ID FROM Usuario',{})
      .then(res => {
        this.usuario = res.rows.item(0).ID;
      }).catch(e => { console.log(e); });
    }).catch(e => { console.log(e); });
  }
  SubCategoria(){
    this.sqlite.create({
      name: 'dbBlenApp.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      let sql = 'SELECT SUBCATEGORIA FROM CasosAyuda WHERE CATEGORIA =? ';
      sql += 'OR idSubCategoria = 0 ORDER BY idSubCategoria';
      db.executeSql(sql,[this.selectDepto])
      .then(res => {
        this.tematica = [];
        for(var i=0; i<res.rows.length; i++){
          this.tematica.push({
            SUBCATEGORIA:res.rows.item(i).SUBCATEGORIA
          });
        }
      }).catch(e => {console.log(e); });
    }).catch(e => { console.log(e); });
  }
  Solicitud(){
      let folio = ["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
      this.FolioTicket = folio[Math.floor(Math.random() * folio.length)];
      this.sqlite.create({
        name: 'dbBlenApp.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        let sql = 'SELECT idCategoria, idSubCategoria FROM CasosAyuda WHERE SUBCATEGORIA =?';
        db.executeSql(sql,[this.opcionSeleccionado])
        .then(res => {
          this.enviado(res.rows.item(0).idCategoria,res.rows.item(0).idSubCategoria);
        }).catch(e => {console.log(e);
          let alert = this.alertCtrl.create({
            title: '',
            subTitle: 'Debes llenar todos los datos',
            buttons: ['Aceptar']
          });
          alert.present(); });
      }).catch(e => { console.log(e); });
  }
  enviado(idCategoria,idSubCategoria){
    if(idCategoria!=0 && idSubCategoria!=0 && this.mensaje != "" && this.titulo != ""){
      this.http.Clientes(this.usuario,this.FolioTicket,
        idCategoria,idSubCategoria,this.titulo,this.mensaje).subscribe( res => {
          if (res[0].mensaje != "" || res[0].mensaje != 0 || res != null){
            this.limpiar();
          }

        });
    }
    else{
      let alert = this.alertCtrl.create({
        title: '',
        subTitle: 'Debes llenar todos los datos',
        buttons: ['Aceptar']
      });
      alert.present();
    } 
  }
  limpiar(){
    this.idCategoria = "";
    this.idSubCategoria = "";
    this.mensaje = "";
    this.titulo = "";
    this.Departamento();
  }
  capturar() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64:
     this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
     // Handle error
    });
  }
}
