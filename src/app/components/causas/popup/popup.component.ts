import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent {
  @Input() txtOk?:string;
  @Input() titulo?:string;
  @Input() contenido?:string;
  @Output() respuesta: EventEmitter<boolean> = new EventEmitter<boolean>();/* Esta es la respuesta que se le envia al padre */
  mostrarPopUp?:Boolean;/* true se muestra, false se oculta */
  mostrar(){
    this.mostrarPopUp=true;
  }
  cerrar(){
    this.mostrarPopUp=false;
    this.respuesta.emit(false);
  }
  ok =() => {
    this.mostrarPopUp=false;
    this.respuesta.emit(true);
  }  
}
