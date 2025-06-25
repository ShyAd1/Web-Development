import { Component, OnInit } from '@angular/core';
import { AutorService } from './autor.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-authors',
  imports: [CommonModule],
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css'],
})
export class AuthorsComponent implements OnInit {
  autores: any[] = [];

  constructor(private autorService: AutorService) {}

  ngOnInit() {
    this.autorService.getAutores().subscribe(data => {
      this.autores = data;
    });
  }
}