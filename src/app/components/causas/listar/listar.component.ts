import { Component, OnInit, Inject } from '@angular/core';
import { CausaService } from 'src/app/services/causa.service';
import { Observable } from 'rxjs';
import { Causa } from 'src/app/models/causa.model';
import { Router } from '@angular/router';



@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  causas?:Observable<Causa[]>;
  constructor(
    private causaService : CausaService,
    private router: Router
  ){

  }
  ngOnInit() {
    this.cargarCausas();
  }
  cargarCausas(){
    this.causas = this.causaService.listar();
  }
  eliminar(causa : Causa){
    var respuesta = confirm('¿Estás seguro de que deseas eliminar esta causa?');
    respuesta&&
    this.causaService.eliminar(causa).subscribe(data => {
      this.cargarCausas();
    });
  }
  editar(causa : Causa){
    this.router.navigate(['/causas/agregar'], { state: { causaEditar : causa } });
  }
}
