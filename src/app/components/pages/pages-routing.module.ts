import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainResolver } from '../resolver/main.resolver';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    data:{pageName:'Dashboard'},
    resolve: [MainResolver],
  },
  {
    path: 'list',
    component: ListComponent,
    data:{pageName:'List'},
    resolve: [MainResolver],
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
