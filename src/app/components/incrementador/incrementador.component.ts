import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtPorcentaje') txtPorcentaje: ElementRef;

  @Input('porc') porcentaje: number = 50;
  @Input() leyenda: string = 'Leyenda';

  @Output('cambio') cambio_porcentaje: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  onChanges(valor: number) {
    if (valor >= 100) {
      this.porcentaje = 100;
    } else if (valor <= 0 || valor == null) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = valor;
    }

    this.txtPorcentaje.nativeElement.value = Number(this.porcentaje);

    this.cambio_porcentaje.emit(this.porcentaje);
  }

  cambiarPorcentaje(valor: number) {
    if (this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    }

    if (this.porcentaje <= 0 && valor < 0) {
      this.porcentaje = 0;
      return;
    }

    this.porcentaje = this.porcentaje + valor;

    this.cambio_porcentaje.emit(this.porcentaje);

    this.txtPorcentaje.nativeElement.focus();
  }

}
