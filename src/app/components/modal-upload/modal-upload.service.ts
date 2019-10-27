import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ModalUploadService {

  public tipo: string;
  public id: string;
  public oculto: string = 'oculto';
  public notificacion = new EventEmitter<any>(); // con esto se notificará a aquellas pantallas donde esté este servicio (y estén escuchando) que ya se subió la imagen

  constructor() { 
    console.log('service upload');
  }

  ocultaModal() {
    this.oculto = 'oculto';
    this.id = null;
    this.tipo = null;
  }
  
  muestraModal(tipo: string, id: string) {
    this.oculto = '';
    this.id = id;
    this.tipo = tipo;
  }
}
