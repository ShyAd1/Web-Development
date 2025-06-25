import { Component } from '@angular/core';
import { ReviewListComponent } from '../review-list/review-list.component';

@Component({
  selector: 'app-reviews',
  imports: [ReviewListComponent],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css'
})
export class ReviewsComponent {

}
