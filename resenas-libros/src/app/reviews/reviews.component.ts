import { Component } from '@angular/core';
import { ReviewFormComponent } from '../review-form/review-form.component';
import { ReviewListComponent } from '../review-list/review-list.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-reviews',
  imports: [RouterLink, ReviewFormComponent, ReviewListComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

}
