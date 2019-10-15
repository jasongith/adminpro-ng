import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {
    this.contar()
      .then((msg) => console.log('Finalizó. ', msg))
      .catch(error => console.error('Error en promesa'));
  }

  ngOnInit() {
  }

  contar(): Promise<boolean> {
    return new Promise((res, rej) => {
      let contador = 0;

      let intervalo = setInterval(() => {
        contador += 1;
        console.log(contador);
        if (contador === 3) {
          res(true);
          clearInterval(intervalo);
        }
      }, 1000);
    });
  }

}
