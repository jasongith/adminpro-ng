import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(public http: HttpClient, public router: Router, public subirArchivoService: SubirArchivoService) { 
    this.cargarStorage();
  }

  estaLogeado() {
    return (this.token.length > 5);
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  logout() {
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

    this.router.navigate(['/login']);
  }

  loginGoogle(token: string) {
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post(url, { token }).pipe(
      map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario);
        return true;
      })
    );
  }

  login(usuario: Usuario, recuerdame: boolean = false) {
    let url = URL_SERVICIOS + '/login';
    
    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    
    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        this.guardarStorage(res.id, res.token, res.usuario);
        return true;
      })
    );
  }

  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario';

     // con el return devolverá un observador al que poder suscribirse
    return this.http.post(url, usuario).pipe(
      map((res: any) => {
        Swal.fire(
          'Bienvenido',
          'Acabas de crear tu cuenta',
          'success'
        );
        return res.usuario;
      })
    );
  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put(url, usuario).pipe(
      map((res: any) => {
        if (usuario._id === this.usuario._id) {
          let usuario_db: Usuario = res.usuario;
          this.guardarStorage(usuario_db._id, this.token, usuario_db);
        }

        Swal.fire(
          'Actualizado',
          'El usuario ' + usuario.nombre + ' fue actualizado',
          'success'
        );

        return true;
      })
    );
  }

  cambiarImg(archivo: File, id: string) {
    this.subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((res: any) => {
        this.usuario.img = res.usuario.img;
        Swal.fire(
          'Actualizada',
          'Imagen actualizada',
          'success'
        );
        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch(err => {
        console.log(err);
      });
  }

  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + `/usuario?desde=${desde}`;
    return this.http.get(url);
  }

  buscarUsuario(txt: string) {
    let url = URL_SERVICIOS + `/busqueda/coleccion/usuarios/${txt}`;
    return this.http.get(url).pipe(
      map((res: any) => res.usuarios)
    );
  }

  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + `/usuario/${id}?token=${this.token}`;
    return this.http.delete(url).pipe(
      map((res: any) => {
        Swal.fire(
          'Eliminado',
          'El usuario fue eliminado',
          'success'
        );
      })
    );
  }
}
