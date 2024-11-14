import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; //Importante para habilitar navegación
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

}
