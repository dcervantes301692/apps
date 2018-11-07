import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/first';

@Injectable()
export class WsappsProvider {


  bandera;
  urlServidor: String = "http://servicios.blen.com.mx/api/";  
  constructor(private http: HttpClient) {
  }

  getVigenciaCatalogo(){
    let vigencia = this.urlServidor + "vigenciaCatalogo";
    return this.http.get(vigencia)
  }

  getProducto(){
    let urlProducto = this.urlServidor + "producto";
    return this.http.get(urlProducto)
  }

  getLogin(user,pass){
    let urlUser = this.urlServidor + "login/login/" + user + "/" + pass;
    return this.http.get(urlUser)
  }

  getPromocionFlayer(){
    let urlPromocionFlayer = this.urlServidor + "promocionFlayer";
    return this.http.get(urlPromocionFlayer)
  }

  getIngrediente(){
    let urlIngrediente = this.urlServidor + "ingrediente";
    return this.http.get(urlIngrediente)
  }

  getProductoIngrediente(){
    let urlProductoIngrediente= this.urlServidor + "productoIngrediente";
    return this.http.get(urlProductoIngrediente)
  }

  getProductoTop(user){
    let urlproductoTop= this.urlServidor + "productoTop/productoTop/" + user;
    return this.http.get(urlproductoTop)
  }

  getEnfermedad(){
    let urlEnfermedad = this.urlServidor + "enfermedad";
    return this.http.get(urlEnfermedad)
  }

  getProductoEnfermedad(){
    let urlProductoEnfermedad= this.urlServidor + "productoEnfermedad";
    return this.http.get(urlProductoEnfermedad)
  }

  CasosApoyo(){
    let Casos = this.urlServidor + "CasosAyuda";
    return this.http.get(Casos)
  }

  Clientes(usuario,folio,categoria,subcategoria,tema,mensaje){
    let Ticket = this.urlServidor + "TicketServicio/Ticket/";
    Ticket += usuario + "/" + folio + "/" + categoria + "/" + subcategoria + "/";
    Ticket += tema + "/" + mensaje;
    return this.http.get(Ticket)
  }

  EncabezadoPedido(usuario,catalogo,estacion,piezas,total){
    let Encabezado = this.urlServidor + "EnviarPedido/Enviar/";
    Encabezado += usuario + "/" + catalogo + "/" + estacion + "/" + piezas + "/" + total +"/";
    return this.http.get(Encabezado)
  }

  DetallePedido(usuario,producto,precio,cantidad,pedido,tipo){
    let detalle = this.urlServidor + "EnviarProducto/Enviar/";
    detalle += usuario + "/" + producto + "/" + precio + "/" + cantidad + "/" + pedido;
    detalle += "/" + tipo;
    return this.http.get(detalle)
  }
}
