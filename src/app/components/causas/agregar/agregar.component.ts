import { Component, OnInit, Input } from '@angular/core';
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
  causaForm = this._fb.group({
    nombre : [this.causa && this.causa.nombre || null, [Validators.required, Validators.minLength(7)]]
  })
  constructor(
      private _fb : FormBuilder,
      private causaService  : CausaService,
      private router: Router
  ){
    
  }
  //-------Funciones ciclo de vida
  ngOnInit() {
    this.causaEditar = history.state.causaEditar;
    if(typeof this.causaEditar !== 'undefined'){
      this.titulo = 'Editar Causa';
      this.causaForm.patchValue({
        nombre: this.causaEditar.nombre
      });
    }else{
      this.titulo = 'Agregar Causa';
    }
  }
  //-------metodos del componente
  get nombre(){
    return this.causaForm.get('nombre') as FormControl;
  }

  onSubmit(value : FormGroup){
    console.log(value.value);
    if(typeof this.causaEditar !== 'undefined'){
      //Editar
      //Agregamos los campos faltantes al objeto y enviamos
      let c = { ...this.causaEditar, ...value.value  };
      value.status === 'VALID' ?
        this.causaService.editar(c).subscribe(data=>{
          console.log("Editado",data);
          if(data){
            this.router.navigateByUrl('.../listar');
          }
        })
      : null;
    }else{
      //Guardar
      value.status === 'VALID' ?
        this.causaService.agregar(value.value).subscribe(data=>{
          console.log("Guardada",data);
          if(data){
            this.router.navigateByUrl('.../listar');
          }
        })
      : null;
    }
  }
}
