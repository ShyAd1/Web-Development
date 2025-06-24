import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

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
  onSubmit() {
    if (this.password !== this.confirmPassword) {
      Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Las contraseñas no coinciden'
      });
      return;
    }
    Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: `Usuario registrado: ${this.username}`
    });
  }
  isFormValid() {
    return this.username &&
      this.validateEmail() &&
      this.password &&
      this.confirmPassword &&
      (this.password === this.confirmPassword) &&
      this.termsAccepted;
  }
}
