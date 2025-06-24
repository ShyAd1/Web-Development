import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    RouterLink, 
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // <-- aquí el cambio
})
export class HeaderComponent {
}