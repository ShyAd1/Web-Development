import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  // Luego, en el navbar.component.ts:
  // constructor(private authService: AuthService) {}
  // isLoggedIn$ = this.authService.isLoggedIn$;

  // En el template del navbar:
  // <ng-container *ngIf="isLoggedIn$ | async as isLoggedIn">
  //   <ng-container *ngIf="isLoggedIn; else loggedOut">
  //     <!-- Navbar para usuario logeado -->
  //   </ng-container>
  // </ng-container>
  // <ng-template #loggedOut>
  //   <!-- Navbar para usuario no logeado -->
  // </ng-template>