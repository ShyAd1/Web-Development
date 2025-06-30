import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { ResetPasswordRequest } from '../models/user.model';

@Component({
  selector: 'app-reset-password',
  imports: [FormsModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  email: string = '';
  isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(this.email);
  }

  resetPassword() {
    if (!this.email || !this.validateEmail()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor ingresa un correo electrónico válido'
      });
      return;
    }

    this.isLoading = true;
    const resetData: ResetPasswordRequest = {
      email: this.email
    };

    this.authService.resetPassword(resetData).subscribe({
      next: (response) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Éxito',
          text: 'Se ha enviado un enlace de restablecimiento a tu correo electrónico.'
        });
        this.email = ''; // Clear form
      },
      error: (error) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message
        });
      }
    });
  }

  isFormValid(): boolean {
    return !!(this.email && this.validateEmail() && !this.isLoading);
  }
}
