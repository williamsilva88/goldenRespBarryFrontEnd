import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { GridDefaultComponent } from './grid-default/grid-default.component'
import { MatTableModule } from '@angular/material/table';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    GridDefaultComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxMaskModule.forRoot(maskConfig),
    MatTableModule
  ],
  exports:[
    GridDefaultComponent
  ]
})
export class ComponentsModule { }
