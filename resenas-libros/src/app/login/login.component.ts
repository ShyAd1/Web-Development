import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {}

  email: string = '';
  password: string = '';
  showPassword: boolean = false;


  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  
  // Este método se llamará al enviar el formulario de login
  login() {
    // Aquí deberías conectar con tu servicio de autenticación/backend
    // Por ejemplo, usando HttpClient para hacer una petición POST
    // Ejemplo comentado:
    // this.authService.login(this.username, this.password).subscribe(
    //   response => {
    //     // Manejar respuesta exitosa (guardar token, redirigir, etc.)
    //   },
    //   error => {
    //     this.errorMessage = 'Usuario o contraseña incorrectos';
    //   }
    // );

    // Por ahora, solo una simulación simple:
    if (this.email === 'admin@admin.com' && this.password === 'admin') {
      // Autenticación exitosa (aquí podrías redirigir al usuario)
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Login exitoso'
      });
      // Aquí podrías redirigir al usuario a otra página, por ejemplo:
      this.router.navigate(['/home']);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos'
      });
    }
  }
}
