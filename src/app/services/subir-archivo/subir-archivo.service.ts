import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {
    return new Promise((res, rej) => {
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      formData.append('img', archivo, archivo.name);
  
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            res(JSON.parse(xhr.response));
          } else {
            rej(JSON.parse(xhr.response));
          }        
        }
      };

      let url = URL_SERVICIOS + `/upload/${tipo}/${id}`;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
