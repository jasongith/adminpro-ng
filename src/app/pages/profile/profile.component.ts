import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})

export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imgSubir: File;
  imgTemp: string;

  constructor(public usuarioService: UsuarioService) { 
    this.usuario = this.usuarioService.usuario;
  }

  ngOnInit() {

  }

  guardar(f: NgForm) {
    this.usuario.nombre = f.value.nombre;
    if (!this.usuario.google) {
      this.usuario.email = f.value.email;
    }

    this.usuarioService.actualizarUsuario(this.usuario).subscribe();
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

    try {
      let reader = new FileReader();
      let urlImgTemp = reader.readAsDataURL(archivo);
      reader.onloadend = () => this.imgTemp = reader.result.toString();
    } catch (error) {
      console.log('No se pudo previsualizar la imagen');
      this.imgTemp = null;
    }
  }

  cambiarImg() {
    this.usuarioService.cambiarImg(this.imgSubir, this.usuario._id);
  }

}
