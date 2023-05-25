export class Causa {
    id?:number;
    nombre?:string;
    fechaCreacion?:Date;

    constructor(obj?:any){
        this.id= obj && obj.id || null;
        this.nombre = obj && obj.nombre || "";
        this.fechaCreacion = obj && obj.fechaCreacion || null;
    }
}
