import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComunicadosPage } from './comunicados';

@NgModule({
  declarations: [
    ComunicadosPage,
  ],
  imports: [
    IonicPageModule.forChild(ComunicadosPage),
  ],
})
export class ComunicadosPageModule {}
