import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MostrarPedidoPage } from './mostrar-pedido';

@NgModule({
  declarations: [
    MostrarPedidoPage,
  ],
  imports: [
    IonicPageModule.forChild(MostrarPedidoPage),
  ],
})
export class MostrarPedidoPageModule {}
