import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { RegisterComponent } from './register/register.component';
import { TermsConditionsComponent } from './terms-conditions/terms-conditions.component';
import { LoginComponent } from './login/login.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { BooksComponent } from './books/books.component';
import { AuthorsComponent } from './authors/authors.component';



export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutUsComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'terms', component: TermsConditionsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'reset-password', component: ResetPasswordComponent },
    { path: 'reviews', component: ReviewsComponent },
    { path: 'books', component: BooksComponent },
    { path: 'authors', component: AuthorsComponent},
];
