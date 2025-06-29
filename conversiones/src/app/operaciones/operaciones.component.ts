import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-operaciones',
  imports: [
    FormsModule
  ],
  templateUrl: './operaciones.component.html',
  styleUrl: './operaciones.component.css'
})
export class OperacionesComponent {
  numeroUno : number = 0;
  numeroDos : number = 0;
  resultado : number = 0;

  sumar(): void {
    this.resultado = (this.numeroUno + this.numeroDos);
    Swal.fire({
      title: "Operación Suma",
      text: `El resultado de la suma es: ${this.resultado}`,
      icon: "success",
      confirmButtonText: "Aceptar"
    });
  }

  restar(): void {
    this.resultado = (this.numeroUno - this.numeroDos);
  }

  multiplicar(): void {
    this.resultado = (this.numeroUno * this.numeroDos);
  }

  dividir(): void {
    if (this.numeroDos !== 0) {
      this.resultado = (this.numeroUno / this.numeroDos);
    } else {
      this.resultado = NaN; // Manejo de división por cero
    }
  }
}
