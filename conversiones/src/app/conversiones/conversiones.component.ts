import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-conversiones',
  imports: [
    FormsModule
  ],
  templateUrl: './conversiones.component.html',
  styleUrl: './conversiones.component.css'
})
export class ConversionesComponent {
  celcius: number = 0;
  fahrenheit: number = 0;
  kelvin: number = 0;

  convertirAFahrenheit(): void {
    this.fahrenheit = (this.celcius * 9/5) + 32;
    Swal.fire({
      title: "Conversión a Fahrenheit",
      text: `La temperatura en Fahrenheit es: ${this.fahrenheit}`,
      icon: "success",
      confirmButtonText: "Aceptar"
    });
  }
  convertirAKelvin(): void {
    this.kelvin = this.celcius + 273.15;
    Swal.fire({
      title: "Conversión a Kelvin",
      text: `La temperatura en Kelvin es: ${this.kelvin}`,
      icon: "success",
      confirmButtonText: "Aceptar"
    });
  }
  convertirACelcius(): void {
    this.celcius = (this.fahrenheit - 32) * 5/9;
    Swal.fire({
      title: "Conversión a Celsius",
      text: `La temperatura en Celsius es: ${this.celcius}`,
      icon: "success",
      confirmButtonText: "Aceptar"
    });
  }
  convertirAKelvinDesdeFahrenheit(): void {
    this.kelvin = (this.fahrenheit - 32) * 5/9 + 273.15;
    Swal.fire({
      title: "Conversión a Kelvin desde Fahrenheit",
      text: `La temperatura en Kelvin es: ${this.kelvin}`,
      icon: "success",
      confirmButtonText: "Aceptar"
    });
  }
  convertirAFahrenheitDesdeKelvin(): void {
    this.fahrenheit = (this.kelvin - 273.15) * 9/5 + 32;
    Swal.fire({
      title: "Conversión a Fahrenheit desde Kelvin",
      text: `La temperatura en Fahrenheit es: ${this.fahrenheit}`,
      icon: "success",
      confirmButtonText: "Aceptar"
    });
  }
  convertirACelciusDesdeKelvin(): void {
    this.celcius = this.kelvin - 273.15;
    Swal.fire({
      title: "Conversión a Celsius desde Kelvin",
      text: `La temperatura en Celsius es: ${this.celcius}`,
      icon: "success",
      confirmButtonText: "Aceptar"
    });
  }

  limpiarCampos(): void {
    this.celcius = 0;
    this.fahrenheit = 0;
    this.kelvin = 0;
    Swal.fire({
      title: "Campos Limpiados",
      text: "Todos los campos han sido limpiados.",
      icon: "info",
      confirmButtonText: "Aceptar"
    });
  }
}
