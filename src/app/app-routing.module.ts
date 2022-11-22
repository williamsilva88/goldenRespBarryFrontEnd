import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'pages',
        loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'pages/dashboard'
      },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
