import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { NgxsModule } from '@ngxs/store';
import { MainState } from 'src/app/state/main.state';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContainerModule } from '../core/container/container.module';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    DashboardComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgxsModule.forFeature([MainState]),
    MaterialModule,
    ReactiveFormsModule,
    ContainerModule,
    ComponentsModule,
    NgxMaskModule.forRoot(maskConfig),
    FormsModule
  ],
  exports: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[
    
  ]
})
export class PagesModule { }
