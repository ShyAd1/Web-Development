import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReviewsService } from '../services/reviews.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-review-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './review-form.component.html',
  styleUrl: './review-form.component.css'
})
export class ReviewFormComponent implements OnChanges {
  @Input() libros: any[] = [];
  @Input() selectedLibroId?: number; // <-- asegúrate de tener este input
  @Output() reviewSubmitted = new EventEmitter<any>();
  @Output() cancelled = new EventEmitter<void>();

  libroId: string = '';
  rating: number = 5;
  comment: string = '';
  isSubmitting: boolean = false;

  constructor(
    private reviewsService: ReviewsService,
    private authService: AuthService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedLibroId'] && this.selectedLibroId) {
      this.libroId = String(this.selectedLibroId);
    }
  }

  onSubmit() {
    if (!this.isFormValid()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor selecciona un libro y completa todos los campos'
      });
      return;
    }

    this.isSubmitting = true;
    const currentUser = this.authService.getCurrentUser();

    // Validar que el usuario esté autenticado y tenga ID
    if (!currentUser || !currentUser.id) {
      this.isSubmitting = false;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo identificar al usuario. Inicia sesión de nuevo.'
      });
      return;
    }

    const resena = {
      calificacion: Number(this.rating),
      comentario: this.comment,
      fechaResena: new Date().toISOString().split('T')[0],
      libros_idlibros: Number(this.libroId),
      usuarios_idusuarios: Number(currentUser.id)
    };

    this.reviewsService.createResena(resena).subscribe({
      next: (response) => {
        this.reviewSubmitted.emit({
          ...response,
          reviewerName: currentUser.username,
          bookTitle: this.libros.find(l => l.idlibros == this.libroId)?.titulo,
          author: '',
          date: response.fechaResena
        });
        this.resetForm();
        this.isSubmitting = false;
        Swal.fire({
          icon: 'success',
          title: 'Reseña publicada',
          text: 'Tu reseña ha sido publicada exitosamente',
          timer: 1500,
          showConfirmButton: false
        });
      },
      error: (err) => {
        this.isSubmitting = false;
        let msg = 'No se pudo publicar la reseña';
        if (err?.error?.detail) {
          msg += ': ' + (typeof err.error.detail === 'string'
            ? err.error.detail
            : JSON.stringify(err.error.detail));
        }
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: msg
        });
      }
    });
  }

  onCancel() {
    this.resetForm();
    this.cancelled.emit();
  }

  private resetForm() {
    this.libroId = '';
    this.rating = 5;
    this.comment = '';
  }

  private isFormValid(): boolean {
    return !!(this.libroId && this.comment.trim() && this.rating >= 1 && this.rating <= 5);
  }
}
