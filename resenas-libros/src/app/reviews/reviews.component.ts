import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ReviewsService } from '../services/reviews.service';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, RouterLink, ReviewFormComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent implements OnInit, OnDestroy {
  isLoggedIn$!: Observable<boolean>;
  currentUser$!: Observable<any>;
  reviews: any[] = [];
  libros: any[] = [];
  showReviewForm = false;
  selectedLibroId: number | null = null;
  private authSub?: Subscription;

  constructor(
    private authService: AuthService,
    private reviewsService: ReviewsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.currentUser$ = this.authService.currentUser$;
    this.loadReviews();
    this.loadLibros();
    this.authSub = this.authService.isLoggedIn$.subscribe(isLogged => {
      if (!isLogged) {
        this.showReviewForm = false;
      }
    });
    this.route.queryParams.subscribe(params => {
      if (params['libro']) {
        this.selectedLibroId = Number(params['libro']);
        this.showReviewForm = true;
      } else {
        this.selectedLibroId = null;
      }
    });
  }

  ngOnDestroy() {
    this.authSub?.unsubscribe();
  }

  loadReviews() {
    this.reviewsService.getResenas().subscribe({
      next: (res) => {
        // Mapear los datos para que sean fáciles de mostrar en la vista
        this.reviews = res.map((r: any) => ({
          id: r.idresenas,
          bookTitle: r.libro?.titulo || '',
          author: r.libro?.autor || '',
          rating: r.calificacion,
          comment: r.comentario,
          reviewerName: r.usuario?.nombre || '',
          date: r.fechaResena
        }));
      },
      error: () => this.reviews = []
    });
  }

  loadLibros() {
    this.reviewsService.getLibros().subscribe({
      next: (res) => this.libros = res,
      error: () => this.libros = []
    });
  }

  toggleReviewForm() {
    this.showReviewForm = !this.showReviewForm;
  }

  onReviewSubmitted(review: any) {
    this.reviews.unshift(review);
    this.showReviewForm = false;
  }
}
