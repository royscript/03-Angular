import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './components/causas/listar/listar.component';
import { AgregarComponent } from './components/causas/agregar/agregar.component';

const routes: Routes = [
  { path: 'causas/listar', component: ListarComponent },
  { path: 'causas/agregar', component: AgregarComponent },
  { path: '**', redirectTo: '/causas/listar' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
