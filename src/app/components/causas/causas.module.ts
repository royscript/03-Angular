import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './agregar/agregar.component';
import { ListarComponent } from './listar/listar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router'; // enrutamiento
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './popup/popup.component';

@NgModule({
  declarations: [
    AgregarComponent,
    ListarComponent,
    NavbarComponent,
    PopupComponent
  ],
  imports: [
    CommonModule,
    RouterModule, // enrutamiento
    /* Formularios reactivos */
    ReactiveFormsModule
  ]
})
export class CausasModule { }
