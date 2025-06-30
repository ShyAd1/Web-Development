import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { RegisterRequest } from '../models/user.model';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  showPassword1: boolean = false;
  showPassword2: boolean = false;
  termsAccepted: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePasswordVisibility1() {
    this.showPassword1 = !this.showPassword1;
  }

  togglePasswordVisibility2() {
    this.showPassword2 = !this.showPassword2;
  }

  validateEmail() {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(this.email);
  }

  validatePassword() {
    // Password must be at least 8 characters with at least one number and one letter
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordPattern.test(this.password);
  }

  onSubmit() {
    console.log('Form submission started'); // Debug log
    console.log('Form data:', {
      username: this.username,
      email: this.email,
      password: this.password ? '[HIDDEN]' : 'empty',
      confirmPassword: this.confirmPassword ? '[HIDDEN]' : 'empty',
      termsAccepted: this.termsAccepted
    });

    if (!this.isFormValid()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor completa todos los campos correctamente'
      });
      return;
    }

    if (this.password !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas no coinciden'
      });
      return;
    }

    if (!this.validatePassword()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La contraseña debe tener al menos 8 caracteres, incluyendo letras y números'
      });
      return;
    }

    this.isLoading = true;
    const registerData: RegisterRequest = {
      username: this.username.trim(),
      email: this.email.trim().toLowerCase(),
      password: this.password
    };

    console.log('Sending registration data:', {
      username: registerData.username,
      email: registerData.email,
      password: '[HIDDEN]'
    });

    // Use registerUser method instead of register
    this.authService.registerUser(registerData).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('Registration successful:', response);
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: `Bienvenido, ${response.user.username}!`,
          timer: 1500,
          showConfirmButton: false
        });
        this.router.navigate(['/home']);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Registration error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error en el registro',
          text: error.message
        });
      }
    });
  }

  isFormValid() {
    return this.username &&
      this.validateEmail() &&
      this.password &&
      this.confirmPassword &&
      (this.password === this.confirmPassword) &&
      this.validatePassword() &&
      this.termsAccepted &&
      !this.isLoading;
  }
}
