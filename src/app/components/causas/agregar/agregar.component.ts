import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'; /* Formularios Reactivos */
import { Causa } from 'src/app/models/causa.model';
import { CausaService } from 'src/app/services/causa.service';
@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {
  //----------Definicion de variables
  titulo?:string;
  causaEditar?:Causa;
  causa?:Causa;
  //----------Definicion del formulario y validaciones
  causaForm = this._fb.group({
    nombre : [this.causa && this.causa.nombre || null, [Validators.required, Validators.minLength(7)]]
  })
  errors:any;
  constructor(
      private _fb : FormBuilder,
      private causaService  : CausaService,
      private router: Router
  ){
    
  }
  //-------Funciones ciclo de vida
  ngOnInit() {
    this.causaEditar = history.state.causaEditar;/* Recepcionamos los datos del usuario en caso de editar */
    if(typeof this.causaEditar !== 'undefined'){/* Si se encuentra la causa con datos */
      this.titulo = 'Editar Causa';/* Cambiamos el nombre del encabezado */
      this.causaForm.patchValue({/* Asignamos al formulario el nombre de la causa a editar */
        nombre: this.causaEditar.nombre
      });
      // Limpiar los valores en el historial de navegación
      history.replaceState({ ...history.state, causaEditar: null }, '');
    }else{
      this.titulo = 'Agregar Causa';/* En caso contrario es agregar */
    }
  }
  //-------metodos del componente
  get nombre(){
    return this.causaForm.get('nombre') as FormControl;
  }

  onSubmit(value : FormGroup){
    if(typeof this.causaEditar !== 'undefined'){/* Si existe una causa para editar  */
      //Editar
      //Agregamos los campos faltantes al objeto y enviamos
      let c = { ...this.causaEditar, ...value.value  };
      value.status === 'VALID' ?
        this.causaService.editar(c).subscribe(data=>{
          if(data){
            this.router.navigate(['/causas/listar'], { state: { success: `Causa editada correctamente` } });
          }
        },
        error => {
          this.router.navigate(['/causas/listar'], { state: { errors: `Ocurrió un error al editar la causa: ${error}` } });
        })
      : null;
    }else{
      /* Si no existe una causa para editar */
      //Guardar
      value.status === 'VALID' ?
        this.causaService.agregar(value.value).subscribe(data=>{
          if(data){
            this.router.navigate(['/causas/listar'], { state: { success: `Causa agregada correctamente` } });
          }
        },
        error => {
          this.router.navigate(['/causas/listar'], { state: { errors: `Ocurrió un error al agregar la causa: ${error}` } });
        })
      : null;
    }
  }
}
