import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LibroService } from './libros.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-books',
  imports: [CommonModule, RouterLink],
  templateUrl: './books.component.html',
  styleUrl: './books.component.css'
})
export class BooksComponent implements OnInit {
  libros: any[] = [];

  constructor(private libroService: LibroService) {}

  ngOnInit() {
    this.libroService.getLibros().subscribe(data => {
      this.libros = data;
    });
  }
}
