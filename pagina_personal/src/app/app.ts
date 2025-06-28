import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { AboutMe } from './about-me/about-me';
import { Skills } from './skills/skills';
import { Projects } from './projects/projects';
import { Contacts } from './contacts/contacts';
import { Footer } from './footer/footer';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, AboutMe, Skills, Projects, Contacts, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'pagina_personal';
}
