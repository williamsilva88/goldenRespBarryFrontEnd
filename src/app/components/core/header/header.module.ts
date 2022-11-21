import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderPageComponent } from './header-page/header-page.component';
import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [
    HeaderPageComponent,
    MenuComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    HeaderPageComponent,
    MenuComponent
  ]
})
export class HeaderModule { }
