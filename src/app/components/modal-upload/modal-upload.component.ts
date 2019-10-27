import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/service.index';
import { ModalUploadService } from './modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imgSubir: File;
  imgTemp: string;

  constructor(public subirArchivoService: SubirArchivoService, public modalUploadService: ModalUploadService) { }

  ngOnInit() {
  }

  seleccionImg(archivo: File) {
    if (!archivo) {
      this.imgSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      this.imgSubir = null;
      alert('El archivo no es una imagen');
      return;
    }

    this.imgSubir = archivo;

    // try {
    //   let reader = new FileReader();
    //   let urlImgTemp = reader.readAsDataURL(archivo);
    //   reader.onloadend = () => this.imgTemp = reader.result.toString();
    // } catch (error) {
    //   console.log('No se pudo previsualizar la imagen');
    //   this.imgTemp = null;
    // }
  }

  subirImg() {
    this.subirArchivoService.subirArchivo(this.imgSubir, this.modalUploadService.tipo, this.modalUploadService.id)
      .then((res: any) => {
        this.modalUploadService.notificacion.emit(res);
        this.cerrarModal();
        Swal.fire(
          'Actualizada',
          'Imagen de usuario actualizada',
          'success'
        );
      })
      .catch((err: any) => {
        console.log('Error al subir imagen', err);
      });
  }

  cerrarModal() {
    this.imgSubir = null;
    this.imgTemp = null;
    this.modalUploadService.ocultaModal();
  }
}
