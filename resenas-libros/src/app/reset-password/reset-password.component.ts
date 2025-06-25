import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reset-password',
  imports: [FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  email: string = '';

  resetPassword() {
    // Aquí puedes implementar la lógica para enviar el correo de restablecimiento de contraseña
    console.log(`Enviando correo de restablecimiento a: ${this.email}`);
    Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Se ha enviado un enlace de restablecimiento a tu correo electrónico.'
          });
    // Por ejemplo, llamar a un servicio que maneje el envío del correo
  }
}
