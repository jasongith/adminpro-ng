import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  constructor() { 
    this.subscription = this.regresaObs().subscribe(
      numero => console.log('subs', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El observador terminó')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  regresaObs(): Observable<any>  {
    return new Observable(observer => {
      let contador = 0;
      let intervalo = setInterval(() => {
        contador++;

        let salida = {
          valor: contador
        };

        observer.next(salida); // en el subscribe, esto será el primer parámetro

        // comentado para probar el ngOnDestroy
        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete(); // en el subscribe, esto será el tercer parámetro
        // }

        // if (contador === 2) {
        //   clearInterval(intervalo);
        //   observer.error('Auxilioooo'); // en el subscribe, esto será el segundo parámetro
        // }
      }, 1000);
    }).pipe(
      map(resp => resp['valor']),
      filter((valor, index) => {
        return (valor % 2) === 1; // solo impares
      })
    );
  }
}
