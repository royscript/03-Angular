import { Component, OnInit, ViewChild } from '@angular/core';
import { CausaService } from 'src/app/services/causa.service';
import { Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { Causa } from 'src/app/models/causa.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  //Declaracion de variables
  causas?: Observable<Causa[]>;
  errors?: string | null;
  success?: string | null;
  cargando: boolean = false;
  instanciaActual:ListarComponent = this;

  constructor(
    private causaService: CausaService,
    private router: Router
  ) {}

  ngOnInit() {
    //1) Cargamos las causas
    this.cargarCausas();
    //2) Vemos si hay errores provenientes del componente agregar
    this.errors = history.state.errors;/* Recepcionamos los datos del usuario en caso de editar */
    this.errors && this.ocultarErrors();
    //3) Vamos si hay mensajes de exito provenientes del componente agregar
    this.success = history.state.success;/* Recepcionamos los datos del usuario en caso de editar */
    this.success && this.ocultarSuccess();
    //4) Limpiar los valores en el historial de navegación
    history.replaceState({ ...history.state, errors: null, success: null }, '');
  }
  //Metodos
  ocultarErrors(){
    /* Se le agrego instancia ya que adentro de setTimeOut this hace referencia a setTimeOut */
    setTimeout(() => {
      this.instanciaActual.errors = null;
    }, 3000);
  }
  ocultarSuccess(){
    /* Se le agrego instancia ya que adentro de setTimeOut this hace referencia a setTimeOut */
    setTimeout(() => {
      this.instanciaActual.success = null;
    }, 3000);
  }

  cargarCausas() {
    this.cargando = true; // Establecer cargando en true al comenzar la carga de las causas

    this.causas = this.causaService.listar().pipe(
      catchError(error => {
        this.errors = `Ocurrió un error al listar las causas: ${error}`;
        this.ocultarErrors();
        return of([]); // Devuelve un observable que emite un arreglo vacío en caso de error
      }),
      finalize(() => {
        this.cargando = false; // Se ejecuta al finalizar la obtención de las causas, ya sea con éxito o con error
      })
    );
  }
  eliminar(respuesta:Boolean, causa: Causa) {
    if (respuesta) {
      try {
        this.causaService.eliminar(causa).subscribe(
          data => {
            this.cargarCausas();
            this.success = `Causa ${causa.id} eliminada exitosamente`;
            this.ocultarSuccess();
          },
          error => {
            this.errors = `Ocurrió un error al eliminar la causa: ${error}`;
            this.ocultarErrors();
          }
        );
      } catch (error) {
        this.errors = `Ocurrió un error : ${error}`;
        this.ocultarErrors();
      }
    } else {
      // No eliminar la causa
    }
  }

  editar(causa: Causa) {
    this.router.navigate(['/causas/agregar'], { state: { causaEditar: causa } });
  }
}