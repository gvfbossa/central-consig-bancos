import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
  ]
})
export class LoginComponent {
  errorMessage: string = '';

  constructor(private router: Router) {}

  onLogin(): void {
    const usuario = (document.getElementById('usuario') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;

    if (usuario !== 'admin' || password !== 'Central@2025') {
      this.errorMessage = 'Usuário ou senha inválidos';
    } else {
      this.errorMessage = '';
      localStorage.setItem('isAuthenticated', 'true');
      this.router.navigate(['/home']);
    }
    this.router.navigate(['/home']);
  }

}