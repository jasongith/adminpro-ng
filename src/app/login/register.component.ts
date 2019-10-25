import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
// import * as swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(public usuarioService: UsuarioService, public router: Router) { }

  ngOnInit() {
    init_plugins();
    
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, {
        validators: this.sonIguales('password', 'password2')
    });

    this.forma.setValue({
      nombre: 'Jason A.',
      email: 'jason@google.es',
      password: '1234',
      password2: '1234',
      condiciones: true
    });
  }

  sonIguales(valor1: string, valor2: string) {
    return (group: FormGroup) => {
      let v1 = group.controls[valor1].value; 
      let v2 = group.controls[valor2].value; 

      if (v1 === v2) {
        return null;
      }
      return {
        sonIguales: false
      };
    };
  }

  registrarUsuario() {
    if (this.forma.invalid) {
      return;
    }

    if (!this.forma.value.condiciones) {
      alert('Acepte las condiciones');
      // swal("Atención", "Acepte las condiciones", "warning");
    }

    let usuario = new Usuario(
      this.forma.value.nombre, 
      this.forma.value.email, 
      this.forma.value.password
    );

    this.usuarioService.crearUsuario(usuario).subscribe(res => this.router.navigate(['login']));
  }

}
