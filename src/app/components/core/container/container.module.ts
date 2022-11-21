import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerPageComponent } from './container-page/container-page.component';
import { HeaderModule } from '../header/header.module';



@NgModule({
  declarations: [
    ContainerPageComponent
  ],
  imports: [
    CommonModule,
    HeaderModule
  ],
  exports:[
    ContainerPageComponent
  ]
})
export class ContainerModule { }
