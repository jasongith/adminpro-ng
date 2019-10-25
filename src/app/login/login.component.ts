import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public router: Router, public usuarioService: UsuarioService) { }

  email: string;
  recuerdame: boolean = false;
  auth2: any;

  ngOnInit() {
    init_plugins();

    this.email = localStorage.getItem('email') || '';
    this.recuerdame = (this.email.length > 1);

    this.googleInit();
  }

  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '879570611339-ib302db4s6lahi7aqu93qdgva6a8rt66.apps.googleusercontent.com',
        cookiepoloicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignIn(document.getElementById('btn_login_google'));
    });
  }

  attachSignIn(elem) {
    this.auth2.attachClickHandler(elem, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      let token = googleUser.getAuthResponse().id_token;

      this.usuarioService.loginGoogle(token).subscribe(res => window.location.href = '#/dashboard'); 
      // this.router.navigate(['/dashboard']) daba problemas al ir al dashboard
    });
  }

  ingresar(forma: NgForm) {
    if (forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);
    
    this.usuarioService.login(usuario, forma.value.recuerdame).subscribe(res => window.location.href = '#/dashboard');
  }

}
